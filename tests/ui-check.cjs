const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
process.chdir(require('node:path').join(__dirname, '..'));
(async () => {
  const browser = await chromium.launch({headless:true});
  const errors = [];
  fs.mkdirSync('tmp/qa', {recursive:true});
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: {width, height: 900}, reducedMotion:'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    // Keep external map traffic out of a local layout test.
    await page.route('https://**/*', route => route.abort());
    await page.goto('http://127.0.0.1:8000', {waitUntil:'load'});
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.querySelectorAll('img').forEach(img => img.loading = 'eager'));
    await page.waitForFunction(() => [...document.querySelectorAll('img[src]:not([src=""])')].every(img => img.complete));
    const imageErrors = await page.evaluate(() => [...document.querySelectorAll('img[src]:not([src=""])')].filter(img => !img.naturalWidth).map(img => img.src));
    assert.deepEqual(imageErrors, [], 'Undecodable images');
    assert.equal(await page.locator('.quick-booking a').count(), 2, 'Two fixed booking actions must be available');
    assert.equal(await page.locator('.quick-booking').evaluate(el => getComputedStyle(el).position), 'fixed');
    assert.equal(await page.locator('#menu-cat-2 img, #gallery img').count(), 0);
    if (width === 1440) {
      const menuScroller = page.locator('.full-menu-nav__scroll');
      const navSize = await menuScroller.evaluate(el => ({clientWidth: el.clientWidth, scrollWidth: el.scrollWidth}));
      assert(navSize.scrollWidth > navSize.clientWidth, 'Category navigation must overflow horizontally');
      await menuScroller.evaluate(el => el.scrollLeft = 0);
      await menuScroller.hover();
      await page.mouse.wheel(0, 500);
      await page.waitForFunction(() => document.querySelector('.full-menu-nav__scroll').scrollLeft > 0);
      await page.locator('#menu-cat-9 .menu-category__head').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('.full-menu-nav a[href="#menu-cat-9"]')?.classList.contains('is-active'));
      await page.waitForFunction(() => {
        const link = document.querySelector('.full-menu-nav a[href="#menu-cat-9"]');
        const item = link.getBoundingClientRect();
        const scroller = link.parentElement.getBoundingClientRect();
        return item.left >= scroller.left && item.right <= scroller.right;
      });
      const activeNavPosition = await page.locator('.full-menu-nav a[href="#menu-cat-9"]').evaluate(link => {
        const item = link.getBoundingClientRect();
        const scroller = link.parentElement.getBoundingClientRect();
        return {visible: item.left >= scroller.left && item.right <= scroller.right};
      });
      assert(activeNavPosition.visible, 'Active Sushi Sets & Bento link must scroll into view');
      await page.locator('.full-menu-nav').screenshot({path:'tmp/qa/1440-menu-nav-sushi.png'});

      await page.locator('.row').filter({hasText: 'PHO BO'}).locator('.menu-add').first().click();
      await page.waitForFunction(() => !document.querySelector('#menu-cart').hidden);
      assert.equal(await page.locator('#menu-cart-count').textContent(), '1 Artikel');
      assert.equal(await page.locator('#menu-cart-total').textContent(), '15,90 €');

      await page.locator('#booking').scrollIntoViewIfNeeded();
      await page.evaluate(() => { window.open = url => { window.__whatsappUrl = url; }; });
      await page.locator('#reservation-name').fill('Max Mustermann');
      await page.locator('#reservation-phone').fill('+49 170 1234567');
      await page.locator('#reservation-time').fill('19:00');
      await page.locator('#reservation-form button[type="submit"]').click();
      const reservationUrl = await page.evaluate(() => window.__whatsappUrl);
      assert(reservationUrl.startsWith('https://wa.me/491739268345?text='));
      assert(decodeURIComponent(reservationUrl).includes('Tisch reservieren'));

      await page.locator('#order-tab').click();
      await page.locator('#order-name').fill('Max Mustermann');
      await page.locator('#order-phone').fill('+49 170 1234567');
      await page.locator('#order-time').fill('18:30');
      await page.locator('#order-item-1').fill('40A · PHO BO');
      await page.locator('#add-order-item').click();
      await page.locator('#order-item-2').fill('S43 · LA MAISON ROLL');
      await page.locator('#order-qty-2').fill('2');
      await page.locator('#order-form button[type="submit"]').click();
      const orderUrl = await page.evaluate(() => window.__whatsappUrl);
      const orderMessage = decodeURIComponent(orderUrl);
      assert(orderUrl.startsWith('https://wa.me/491739268345?text='));
      assert(orderMessage.includes('1× 40A · PHO BO'));
      assert(orderMessage.includes('2× S43 · LA MAISON ROLL'));
      assert(orderMessage.includes('Gesamtsumme: 31,70 €'));
      await page.locator('#booking').screenshot({path:'tmp/qa/1440-booking.png', style:'.nav,.full-menu-nav,.totop{visibility:hidden !important}'});
    }
    const bento4 = page.locator('.row').filter({hasText: 'BENTO 4'});
    await bento4.scrollIntoViewIfNeeded();
    const bentoImage = bento4.locator('img');
    assert.equal(await bentoImage.getAttribute('src'), 'assets/bento-4.jpg');
    assert(await bentoImage.evaluate(img => img.complete && img.naturalWidth === 1448 && img.naturalHeight === 1086));
    // Force Chromium to rasterize the off-screen lazy image before the row capture.
    await bentoImage.screenshot({path:`tmp/qa/${width}-bento-4-image.jpg`});
    await bento4.screenshot({path:`tmp/qa/${width}-bento-4.png`, style:'.nav,.full-menu-nav,.totop{visibility:hidden !important}'});
    const allCount = await page.locator('.row').count();
    for (const tag of ['veg', 'spicy', 'all']) {
      await page.locator(`[data-filter="${tag}"]`).click();
      const results = await page.locator('.row:not(.is-hidden)').evaluateAll((rows, tag) => ({
        count: rows.length, valid: rows.every(row => tag === 'all' || row.dataset.tags.split(' ').includes(tag))
      }), tag);
      assert(results.valid && results.count > 0);
      if (tag === 'all') assert.equal(results.count, allCount);
    }
    for (const id of ['menu', 'menu-cat-1', 'menu-cat-2', 'menu-cat-7', 'menu-cat-8', 'menu-cat-9', 'menu-cat-12', 'menu-cat-13', 'gallery', 'booking', 'contact']) {
      await page.locator('#'+id).scrollIntoViewIfNeeded();
      await page.locator('#'+id).screenshot({path:`tmp/qa/${width}-${id}.png`, style:'.nav,.full-menu-nav,.totop{visibility:hidden !important}'});
    }
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      broken: [...document.querySelectorAll('img[src]:not([src=""])')].filter(img => img.complete && !img.naturalWidth).map(img => img.src),
      prices: [...document.querySelectorAll('.row__price,.variants b')].every(el => /^\d+,\d{2} €$/.test(el.textContent)),
      overlap: [...document.querySelectorAll('.row__line')].filter(line => {
        const name = line.querySelector('.row__name').getBoundingClientRect();
        const price = line.querySelector('.row__price')?.getBoundingClientRect();
        return price && name.right > price.left + 1 && name.bottom > price.top + 1 && name.top < price.bottom - 1;
      }).map(line => line.textContent)
    }));
    assert(!layout.overflow, `Page overflow at ${width}`);
    assert.deepEqual(layout.broken, []);
    assert(layout.prices);
    assert.deepEqual(layout.overlap, [], `Price overlap at ${width}`);
    if (width === 390) {
      await page.locator('.nav__burger').click();
      assert.equal(await page.locator('.nav__burger').getAttribute('aria-expanded'), 'true');
      await page.locator('.nav__links a[href="#menu"]').click();
      assert.equal(await page.locator('.nav__burger').getAttribute('aria-expanded'), 'false');
    }
    console.log(`PASS ${width}px: filters, images, navigation, currency, no overflow or overlapping prices`);
    await page.close();
  }
  assert.deepEqual(errors, []);
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });

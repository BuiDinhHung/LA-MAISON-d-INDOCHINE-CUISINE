const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');
const toTop = document.querySelector('.totop');
const links = [...document.querySelectorAll('.nav__links a')];

const updateChrome = () => {
  nav.classList.toggle('is-stuck', scrollY > 24);
  toTop.classList.toggle('is-visible', scrollY > innerHeight * .7);
};
addEventListener('scroll', updateChrome, { passive: true });
updateChrome();

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}));
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('is-in');
  reveal.unobserve(entry.target);
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const activeSection = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const activeHash = entry.target.id === 'full-menu' ? '#menu' : `#${entry.target.id}`;
  links.forEach(link => link.classList.toggle('is-active', link.hash === activeHash));
}), { rootMargin: '-35% 0px -55%' });
sections.forEach(section => activeSection.observe(section));

const menuLinks = [...document.querySelectorAll('.full-menu-nav a')];
const menuScroller = document.querySelector('.full-menu-nav__scroll');
menuScroller?.addEventListener('wheel', event => {
  const delta = event.deltaX || event.deltaY;
  const atStart = menuScroller.scrollLeft <= 0;
  const atEnd = menuScroller.scrollLeft + menuScroller.clientWidth >= menuScroller.scrollWidth - 1;
  if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
  event.preventDefault();
  menuScroller.scrollBy({ left: delta, behavior: 'smooth' });
}, { passive: false });
// Nur die Kategorieleiste waagerecht bewegen. scrollIntoView() würde auch die
// Seite selbst scrollen und damit den laufenden Sprung zur angeklickten
// Kategorie abbrechen – die Karte blieb dann an der ersten Kategorie stehen.
const centerNavLink = link => {
  if (!menuScroller || !link) return;
  const item = link.getBoundingClientRect();
  const track = menuScroller.getBoundingClientRect();
  const delta = (item.left + item.width / 2) - (track.left + track.width / 2);
  if (Math.abs(delta) > 1) menuScroller.scrollBy({ left: delta, behavior: 'smooth' });
};

const activeMenuCategory = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const activeLink = menuLinks.find(link => link.hash === `#${entry.target.id}`);
  menuLinks.forEach(link => link.classList.toggle('is-active', link === activeLink));
  centerNavLink(activeLink);
}), { rootMargin: '-25% 0px -65%' });
document.querySelectorAll('.menu-category').forEach(section => activeMenuCategory.observe(section));

// Die Kategorieleiste ist unterschiedlich hoch (einzeilig am Desktop, zweizeilig
// am Handy). Ihre echte Höhe steuert den Absprungpunkt der Kategorie-Anker.
const menuNav = document.querySelector('.full-menu-nav');
const measureMenuNav = () => document.documentElement.style.setProperty(
  '--menu-nav-h', `${Math.round(menuNav.getBoundingClientRect().height)}px`);
if (menuNav) {
  measureMenuNav();
  new ResizeObserver(measureMenuNav).observe(menuNav);
}

const galleryImages = [...document.querySelectorAll('.gallery img')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
let imageIndex = 0;
const showImage = index => {
  imageIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[imageIndex].src;
  lightboxImage.alt = galleryImages[imageIndex].alt;
};
galleryImages.forEach((img, index) => img.parentElement.addEventListener('click', () => {
  showImage(index);
  lightbox.classList.add('is-open');
}));
lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.classList.remove('is-open'));
lightbox.querySelector('.lightbox__prev').addEventListener('click', () => showImage(imageIndex - 1));
lightbox.querySelector('.lightbox__next').addEventListener('click', () => showImage(imageIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.classList.remove('is-open'); });
addEventListener('keydown', event => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') lightbox.classList.remove('is-open');
  if (event.key === 'ArrowLeft') showImage(imageIndex - 1);
  if (event.key === 'ArrowRight') showImage(imageIndex + 1);
});

/* Reservierung und Abholbestellung per WhatsApp */
const WHATSAPP_NUMBER = '491739268345';
const bookingTabs = [...document.querySelectorAll('.booking__tabs [role="tab"]')];
const bookingForms = [...document.querySelectorAll('.booking-form')];
const bookingMessage = document.querySelector('#booking-message');

const setBookingMode = mode => {
  bookingTabs.forEach(tab => {
    const active = tab.dataset.form === mode;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active);
  });
  bookingForms.forEach(form => {
    const active = form.dataset.kind === mode;
    form.classList.toggle('is-active', active);
    form.hidden = !active;
  });
  bookingMessage.classList.remove('is-visible');
};

bookingTabs.forEach(tab => tab.addEventListener('click', () => setBookingMode(tab.dataset.form)));
document.querySelectorAll('[data-booking-mode]').forEach(link => link.addEventListener('click', () => {
  setBookingMode(link.dataset.bookingMode);
}));

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const firstOpenDay = new Date(today);
if (firstOpenDay.getDay() === 2) firstOpenDay.setDate(firstOpenDay.getDate() + 1);
const defaultDate = new Date(firstOpenDay.getTime() - firstOpenDay.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.querySelectorAll('.booking-form input[type="date"]').forEach(input => {
  input.min = localToday;
  if (!input.value) input.value = defaultDate;
});

const menuOptions = document.querySelector('#menu-dishes');
const orderForm = document.querySelector('#order-form');
const menuCart = document.querySelector('#menu-cart');
const menuCatalog = new Map();
const priceToCents = price => Math.round(Number(price.replace('.', '').replace(',', '.')) * 100);
const formatEuros = cents => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
const addToCatalog = (label, price) => menuCatalog.set(label, { price, cents: priceToCents(price) });

if (typeof MENU !== 'undefined') {
  MENU.flatMap(category => category.groups.flatMap(group => group.items)).forEach(item => {
    const baseLabel = `${item.code ? `${item.code} · ` : ''}${item.name}`;
    if (item.price) addToCatalog(baseLabel, item.price);
    item.variants?.forEach(([variant, price]) => addToCatalog(`${baseLabel} — ${variant}`, price));
  });
}

document.querySelectorAll('.lunch__item').forEach(item => {
  const code = item.querySelector('.lunch__num')?.textContent.trim();
  const heading = item.querySelector('.lunch__copy h4');
  const price = heading?.querySelector('span')?.textContent.replace('€', '').trim();
  if (!code || !heading || !price) return;
  const name = [...heading.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim();
  const label = `${code} · ${name}`;
  addToCatalog(label, price);
  const button = document.createElement('button');
  button.className = 'menu-add';
  button.type = 'button';
  button.dataset.orderLabel = label;
  button.dataset.orderPrice = price;
  button.textContent = '+ Bestellen';
  button.setAttribute('aria-label', `${label} für ${price} Euro hinzufügen`);
  item.querySelector('.lunch__copy').append(button);
});

menuCatalog.forEach(({ price }, label) => {
  const option = document.createElement('option');
  option.value = label;
  option.label = `${price} €`;
  menuOptions?.append(option);
});

let orderRowCount = 1;
const addOrderRow = (label = '', quantity = 1) => {
  orderRowCount += 1;
  const row = document.createElement('div');
  row.className = 'order-row order-row--added';
  row.innerHTML = `<div class="field"><label for="order-item-${orderRowCount}">Gericht / Nummer</label><input id="order-item-${orderRowCount}" name="item" list="menu-dishes" required placeholder="Gericht suchen"></div><div class="field order-row__qty"><label for="order-qty-${orderRowCount}">Anzahl</label><input id="order-qty-${orderRowCount}" name="quantity" type="number" min="1" max="30" inputmode="numeric" value="${quantity}" required></div><button class="order-remove" type="button" aria-label="Gericht entfernen">×</button>`;
  row.querySelector('[name="item"]').value = label;
  row.querySelector('.order-remove').addEventListener('click', () => {
    row.remove();
    updateOrderTotal();
  });
  document.querySelector('#order-rows').append(row);
  return row;
};

const orderSummary = () => [...orderForm.querySelectorAll('.order-row')].reduce((summary, row) => {
  const label = row.querySelector('[name="item"]').value.trim();
  const quantity = Number(row.querySelector('[name="quantity"]').value) || 0;
  if (!label || quantity < 1) return summary;
  summary.count += quantity;
  summary.total += (menuCatalog.get(label)?.cents || 0) * quantity;
  return summary;
}, { count: 0, total: 0 });

function updateOrderTotal() {
  const { count, total } = orderSummary();
  const countLabel = `${count} Artikel`;
  document.querySelector('#order-total-count').textContent = countLabel;
  document.querySelector('#order-total-value').textContent = formatEuros(total);
  document.querySelector('#menu-cart-count').textContent = countLabel;
  document.querySelector('#menu-cart-total').textContent = formatEuros(total);
  menuCart.hidden = count === 0;
  document.body.classList.toggle('has-menu-cart', count > 0);
}

const addMenuItem = (label, price) => {
  if (!menuCatalog.has(label)) addToCatalog(label, price);
  const rows = [...orderForm.querySelectorAll('.order-row')];
  const existing = rows.find(row => row.querySelector('[name="item"]').value.trim() === label);
  if (existing) {
    const quantity = existing.querySelector('[name="quantity"]');
    quantity.value = Math.min(30, Number(quantity.value) + 1);
  } else {
    const empty = rows.find(row => !row.querySelector('[name="item"]').value.trim());
    if (empty) empty.querySelector('[name="item"]').value = label;
    else addOrderRow(label);
  }
  updateOrderTotal();
};

document.querySelector('#add-order-item')?.addEventListener('click', () => {
  const row = addOrderRow();
  row.querySelector('[name="item"]').focus();
});

orderForm?.addEventListener('input', updateOrderTotal);
document.addEventListener('click', event => {
  const button = event.target.closest('.menu-add');
  if (!button) return;
  addMenuItem(button.dataset.orderLabel, button.dataset.orderPrice);
  button.classList.add('is-added');
  button.textContent = '✓ Hinzugefügt';
  setTimeout(() => {
    button.classList.remove('is-added');
    button.textContent = '+ Bestellen';
  }, 1100);
});

const value = (form, name) => form.elements[name].value.trim();
const dateLabel = date => new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(new Date(`${date}T12:00:00`));

bookingForms.forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (new Date(`${value(form, 'date')}T12:00:00`).getDay() === 2) {
    bookingMessage.textContent = 'Dienstag ist Ruhetag. Bitte wählen Sie einen anderen Tag.';
    bookingMessage.classList.add('is-visible');
    return;
  }

  const common = [`Name: ${value(form, 'name')}`, `Telefon: ${value(form, 'phone')}`];
  let lines;
  if (form.dataset.kind === 'reservation') {
    lines = [
      'Guten Tag, ich möchte einen Tisch reservieren:', '',
      ...common,
      `Datum: ${dateLabel(value(form, 'date'))}`,
      `Uhrzeit: ${value(form, 'time')} Uhr`,
      `Personen: ${value(form, 'guests')}`,
      value(form, 'note') ? `Wünsche: ${value(form, 'note')}` : null
    ];
  } else {
    let total = 0;
    const items = [...form.querySelectorAll('.order-row')].map(row => {
      const dish = row.querySelector('[name="item"]').value.trim();
      const quantity = row.querySelector('[name="quantity"]').value;
      const entry = menuCatalog.get(dish);
      if (entry) total += entry.cents * Number(quantity);
      return `• ${quantity}× ${dish}${entry ? ` — ${formatEuros(entry.cents * Number(quantity))}` : ''}`;
    });
    lines = [
      'Guten Tag, ich möchte zur Abholung bestellen:', '',
      ...common,
      `Abholung: ${dateLabel(value(form, 'date'))}, ${value(form, 'time')} Uhr`, '',
      'Bestellung:', ...items,
      total ? `Gesamtsumme: ${formatEuros(total)}` : null,
      value(form, 'note') ? `Hinweise: ${value(form, 'note')}` : null
    ];
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.filter(line => line !== null).join('\n'))}`;
  window.open(url, '_blank', 'noopener');
  bookingMessage.textContent = 'WhatsApp wurde geöffnet. Bitte senden Sie dort die vorbereitete Nachricht ab.';
  bookingMessage.classList.add('is-visible');
}));

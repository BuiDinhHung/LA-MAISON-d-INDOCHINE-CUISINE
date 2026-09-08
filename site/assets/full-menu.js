/* ==========================================================================
   Speisekarte rendern
   Liest MENU aus menu-data.js und baut daraus die vollständige Karte:
   Kategorie-Navigation und eine kompakte, eindeutige Gerichtsliste.
   ========================================================================== */

(() => {
  const root = document.querySelector('#full-menu-content');
  if (!root || typeof MENU === 'undefined') return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
  ));

  const FLAGS = { veg: { icon: '🌿', label: 'vegetarisch / vegan' }, spicy: { icon: '🌶', label: 'scharf' } };

  const twoDigits = index => String(index + 1).padStart(2, '0');
  const countItems = category => category.groups.reduce((sum, group) => sum + group.items.length, 0);
  const positions = count => `${count} Position${count === 1 ? '' : 'en'}`;

  /* ---------- Bausteine ---------- */

  const flags = item => (item.tags || [])
    .map(tag => FLAGS[tag] ? `<span class="flag flag--${tag}" title="${FLAGS[tag].label}">${FLAGS[tag].icon}</span>` : '')
    .join('');

  const allergens = value => value
    ? `<small class="allergens" aria-label="Allergene: ${esc(value)}">${esc(value)}</small>`
    : '';

  // withSub = false, wenn der Zusatz an anderer Stelle ausgegeben wird (Platten)
  const title = (item, withSub = true) => [
    item.code ? `<span class="code">${esc(item.code)}</span>` : '',
    esc(item.name),
    withSub && item.sub ? ` <small>${esc(item.sub)}</small>` : '',
    item.star ? '<span class="star" title="Empfehlung des Hauses">★</span>' : '',
    flags(item),
    allergens(item.allergens)
  ].join('');

  const variants = item => item.variants?.length
    ? `<ul class="variants">${item.variants.map(([label, price, codes]) =>
        `<li><span>${esc(label)} ${allergens(codes)}</span><b>${esc(price)} €</b></li>`).join('')}</ul>`
    : '';

  const contents = item => item.contents?.length
    ? `<div class="contents">${item.contents.map(block => `<div>
        ${block.title ? `<h5>${esc(block.title)}</h5>` : ''}
        <ul>${block.items.map(line => `<li>${esc(line)}</li>`).join('')}</ul>
      </div>`).join('')}</div>`
    : '';

  const price = item => item.price
    ? `<span class="price">${esc(item.price)} €${item.priceNote ? `<small>${esc(item.priceNote)}</small>` : ''}</span>`
    : '';

  const dataTags = item => ` data-tags="${(item.tags || []).join(' ')}"`;

  /* ---------- Zeile in der kompakten Liste ---------- */

  const listRow = item => `<article class="row${item.img ? ' row--with-image' : ''}"${dataTags(item)}>
    ${item.img ? `<figure class="row__media${item.cover ? ' row__media--cover' : ''}">
      <img src="assets/${esc(item.img)}" alt="${esc(item.name)}" loading="lazy" decoding="async">
    </figure>` : ''}
    <div class="row__copy">
      <div class="row__line">
        <h4 class="row__name">${title(item)}</h4>
        <span class="row__lead" aria-hidden="true"></span>
        ${item.price ? `<b class="row__price">${esc(item.price)} €${item.priceNote ? `<small>${esc(item.priceNote)}</small>` : ''}</b>` : ''}
      </div>
      ${item.desc ? `<p class="row__desc">${esc(item.desc)}</p>` : ''}
      ${contents(item)}
      ${variants(item)}
    </div>
  </article>`;

  /* ---------- Gruppen & Kategorien ---------- */

  const groupHead = group => (group.title || group.note)
    ? `<header class="mgroup__head">
        ${group.title ? `<h4>${esc(group.title)}</h4>` : ''}
        ${group.note ? `<p>${esc(group.note)}</p>` : ''}
      </header>`
    : '';

  // Ảnh chung của nhóm (sashimi, nigiri, maki…) đứng ngay đầu nhóm đó.
  const groupStrip = group => group.strip?.length
    ? `<div class="mgroup__strip">${group.strip.map(src =>
        `<img src="assets/${esc(src)}" alt="" loading="lazy" decoding="async">`).join('')}</div>`
    : '';

  // Một bố cục thống nhất giúp thực đơn gọn hơn; ảnh chỉ nằm cạnh đúng món có ảnh.
  const groupBody = group => `<div class="row-list">${group.items.map(listRow).join('')}</div>`;

  const groupBlock = group => `<section class="mgroup reveal">
    ${groupHead(group)}
    ${groupStrip(group)}
    ${groupBody(group)}
  </section>`;

  const category = (item, index) => `<section class="menu-category" id="${esc(item.id)}">
    <header class="menu-category__head reveal">
      <div class="menu-category__intro">
        <span class="menu-category__num">${twoDigits(index)}</span>
        ${item.kicker ? `<small>${esc(item.kicker)}</small>` : ''}
        <h3>${esc(item.title)}</h3>
        ${item.lede ? `<p>${esc(item.lede)}</p>` : ''}
        <p class="menu-category__count">${positions(countItems(item))}</p>
      </div>
    </header>
    ${item.groups.map(groupBlock).join('')}
  </section>`;

  const nav = `<nav class="full-menu-nav" aria-label="Menükategorien">
    <div class="full-menu-nav__inner">
      <div class="full-menu-nav__scroll">
        ${MENU.map(item => `<a href="#${esc(item.id)}">${esc(item.title)}</a>`).join('')}
      </div>
      <div class="full-menu-nav__filters" role="group" aria-label="Karte filtern">
        <button type="button" class="is-active" data-filter="all">Alle</button>
        <button type="button" data-filter="veg">🌿 Vegetarisch</button>
        <button type="button" data-filter="spicy">🌶 Scharf</button>
      </div>
    </div>
  </nav>`;

  const footnote = typeof MENU_FOOTNOTE !== 'undefined'
    ? `<p class="menu-footnote">${MENU_FOOTNOTE.map(esc).join(' · ')}</p>`
    : '';

  root.innerHTML = nav + `<div class="menu-body">${MENU.map(category).join('')}${footnote}</div>`;

  /* ---------- Filter ---------- */

  const buttons = [...root.querySelectorAll('.full-menu-nav__filters button')];
  const entries = [...root.querySelectorAll('[data-tags]')];
  const groups = [...root.querySelectorAll('.mgroup')];
  const categories = [...root.querySelectorAll('.menu-category')];
  const navLinks = [...root.querySelectorAll('.full-menu-nav a')];

  const applyFilter = filter => {
    entries.forEach(entry => {
      const match = filter === 'all' || entry.dataset.tags.split(' ').includes(filter);
      entry.classList.toggle('is-hidden', !match);
    });
    groups.forEach(group => group.classList.toggle('is-hidden',
      !group.querySelector('[data-tags]:not(.is-hidden)')));
    categories.forEach(section => {
      const visible = section.querySelectorAll('[data-tags]:not(.is-hidden)').length;
      section.classList.toggle('is-hidden', !visible);
      const count = section.querySelector('.menu-category__count');
      if (count) count.textContent = positions(visible);
      const link = navLinks.find(item => item.hash === `#${section.id}`);
      if (link) link.classList.toggle('is-hidden', !visible);
    });
  };

  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(other => other.classList.toggle('is-active', other === button));
    applyFilter(button.dataset.filter);
  }));
})();

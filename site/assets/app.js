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
const WHATSAPP_NUMBER = '494055617657';
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
if (menuOptions && typeof MENU !== 'undefined') {
  const items = MENU.flatMap(category => category.groups.flatMap(group => group.items));
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = `${item.code ? `${item.code} · ` : ''}${item.name}`;
    option.label = item.price ? `${item.price} €` : '';
    menuOptions.append(option);
  });
}

let orderRowCount = 1;
document.querySelector('#add-order-item')?.addEventListener('click', () => {
  orderRowCount += 1;
  const row = document.createElement('div');
  row.className = 'order-row order-row--added';
  row.innerHTML = `<div class="field"><label for="order-item-${orderRowCount}">Gericht / Nummer</label><input id="order-item-${orderRowCount}" name="item" list="menu-dishes" required placeholder="Gericht suchen"></div><div class="field order-row__qty"><label for="order-qty-${orderRowCount}">Anzahl</label><input id="order-qty-${orderRowCount}" name="quantity" type="number" min="1" max="30" inputmode="numeric" value="1" required></div><button class="order-remove" type="button" aria-label="Gericht entfernen">×</button>`;
  row.querySelector('.order-remove').addEventListener('click', () => row.remove());
  document.querySelector('#order-rows').append(row);
  row.querySelector('[name="item"]').focus();
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
    const items = [...form.querySelectorAll('.order-row')].map(row => {
      const dish = row.querySelector('[name="item"]').value.trim();
      const quantity = row.querySelector('[name="quantity"]').value;
      return `• ${quantity}× ${dish}`;
    });
    lines = [
      'Guten Tag, ich möchte zur Abholung bestellen:', '',
      ...common,
      `Abholung: ${dateLabel(value(form, 'date'))}, ${value(form, 'time')} Uhr`, '',
      'Bestellung:', ...items,
      value(form, 'note') ? `Hinweise: ${value(form, 'note')}` : null
    ];
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.filter(line => line !== null).join('\n'))}`;
  window.open(url, '_blank', 'noopener');
  bookingMessage.textContent = 'WhatsApp wurde geöffnet. Bitte senden Sie dort die vorbereitete Nachricht ab.';
  bookingMessage.classList.add('is-visible');
}));

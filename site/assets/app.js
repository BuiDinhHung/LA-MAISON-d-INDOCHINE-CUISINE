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
const activeMenuCategory = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const activeLink = menuLinks.find(link => link.hash === `#${entry.target.id}`);
  menuLinks.forEach(link => link.classList.toggle('is-active', link === activeLink));
  activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}), { rootMargin: '-25% 0px -65%' });
document.querySelectorAll('.menu-category').forEach(section => activeMenuCategory.observe(section));

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

(() => {
  const section = document.querySelector('#w-w2xhoks1 .section-container');
  if (!section) return;

  const dishes = [
    ['M1', 'GA CHIEN', 'Knusprig paniertes Hähnchen mit Gemüse. Soße nach Wahl: rote Thai-Curry-Kokos-Soße, Erdnuss-Soße, Tamarinden-Soße oder Teriyaki-Soße.'],
    ['M2', 'THAI CURRY 🌶️', 'Cremiges rotes Thai-Curry mit Kokosmilch, Gemüse und Thai-Basilikum. Wahlweise mit Hähnchen oder Rindfleisch.'],
    ['M3', 'KNUSPRIGE HÄHNCHENKEULE', 'Knusprige Hähnchenkeule (ohne Knochen) mit Gemüse. Soße nach Wahl: rote Thai-Curry-Kokos-Soße, Erdnuss-Soße, Tamarinden-Soße oder Teriyaki-Soße.'],
    ['M4', 'WOK GEMÜSE TERIYAKI', 'Frisches Gemüse aus dem Wok in Teriyaki-Soße. Wahlweise mit Hähnchen, Rindfleisch oder Tofu. 🌱'],
    ['M5', 'MI XAO GA', 'Vietnamesische gebratene Weizennudeln mit Hähnchenfleisch und frischem Gemüse.'],
    ['M6', 'COM RANG GA', 'Gebratener Jasminreis mit Hähnchen, Gemüse und Röstzwiebeln.'],
    ['M7', 'PHO HA NOI', 'Traditionelle vietnamesische Reisnudelsuppe mit aromatischer Brühe, Reisnudeln und frischen Kräutern. Wahlweise mit Rindfleisch, Hähnchen oder Tofu & Pak Choi. 🌱'],
    ['M8', 'BUN BO NAM BO', 'Reisnudeln mit gebratenem Rindfleisch, Kräutern, Erdnüssen und Limetten-Dressing.'],
    ['M9', 'SUSHI MIX', '2 Stk. Sake Nigiri, 6 Stk. Sake Maki und 5 Stk. California Rolls.'],
    ['M10', 'POKÉ BOWL', 'Sushi-Reis mit Avocado, Edamame, Mango, Gurke, Daikon und Sesam, verfeinert mit Teriyaki-Soße. Wahlweise mit knusprigem Hähnchen oder knusprigem Bio-Tofu. 🌱']
  ];

  section.innerHTML = `
    <section class="lunch-menu" aria-labelledby="lunch-menu-title">
      <header class="lunch-menu__header">
        <div class="lunch-menu__cloud" aria-hidden="true">
          <img src="assets/a154.webp" alt="">
        </div>
        <p class="lunch-menu__eyebrow">La Maison d’Indochine · Restaurant</p>
        <h2 id="lunch-menu-title">Mittagskarte / Lunch Menu</h2>
        <p class="lunch-menu__intro"><strong>Hauptgericht inkl. Tagessuppe oder Mini-Frühlingsrollen (4 Stk.) – 11,90 €</strong><br>Mo–Fr: 11:30–14:30 Uhr · ausgenommen samstags, sonntags und an Feiertagen</p>
      </header>
      <div class="lunch-menu__grid">
        ${dishes.map(([number, name, description]) => `
          <article class="lunch-menu__item">
            <span class="lunch-menu__number">${number}</span>
            <h3>${name}<span class="lunch-menu__price">11,90 €</span></h3>
            <p>${description}</p>
          </article>
        `).join('')}
      </div>
      <div class="lunch-menu__photos">
        <figure class="lunch-menu__photo">
          <img src="assets/lunch-ga-chien.png" alt="Knuspriges Ga Chien mit Gemüse und roter Thai-Curry-Kokos-Soße" loading="lazy">
          <figcaption>M1 · Ga Chien</figcaption>
        </figure>
        <figure class="lunch-menu__photo">
          <img src="assets/lunch-poke-bowl.png" alt="Poké Bowl mit knusprigem Hähnchen, Avocado, Mango und Edamame" loading="lazy">
          <figcaption>M10 · Poké Bowl</figcaption>
        </figure>
      </div>
      <p class="lunch-menu__note"><strong>Hinweis</strong><br>Serviert mit Jasminreis oder gebratenen Nudeln · Knusprige Ente statt Hähnchen: +2,00 € Aufpreis</p>
    </section>`;

  const cloud = section.querySelector('.lunch-menu__cloud');
  if (!('IntersectionObserver' in window)) {
    cloud.classList.add('is-visible');
    return;
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    cloud.classList.add('is-visible');
    observer.disconnect();
  }, { threshold: 0.2 });
  observer.observe(cloud);
})();

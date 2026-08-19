/* ==========================================================================
   LA MAISON d'INDOCHINE — Speisekarte als strukturierte Daten
   --------------------------------------------------------------------------
   Jede Kategorie hat Gruppen, jede Gruppe hat Gerichte.

   Gericht:
     code      Nummer auf der Karte            "30"
     name      Name des Gerichts               "THAI CURRY"
     sub       Zusatz in der Kopfzeile         "(scharf)"
     desc      Beschreibung
     price     Einzelpreis                     "13,90"
     variants  [[Bezeichnung, Preis], ...]
     contents  [{title, items:[...]}, ...]     für Platten und Bento-Sets
     img       Bild aus assets/                "dish-01.webp"
     cover     true = Foto formatfüllend (Bild ohne Freisteller-Hintergrund)
     tags      ["veg"] und/oder ["spicy"]
     star      true = Empfehlung des Hauses

   Gruppe:
     layout    "cards" (Foto-Karten) | "list" (kompakte Preisliste)
               | "feature" (große Karten für Platten)
     strip     Fotos, die bei "list" oben in der Gruppe gezeigt werden
   ========================================================================== */

const MENU = [
  {
    id: 'menu-cat-1',
    title: 'Empfehlungen & Platten',
    kicker: 'Der beste Einstieg',
    lede: 'Was unsere Gäste am häufigsten bestellen – und die Platten, mit denen sich ein ganzer Tisch satt isst.',
    hero: 'dish-25.webp',
    groups: [
      {
        title: 'Unsere Bestseller',
        note: 'Empfehlung des Hauses',
        layout: 'cards',
        items: [
          { name: 'PHO BO', sub: '(mit Rindfleisch)', price: '15,90', img: 'dish-pho-bo.webp', star: true,
            desc: 'Traditionelle vietnamesische Reisnudelsuppe mit aromatischer Brühe, Reisbandnudeln, zartem Rindfleisch und frischen Kräutern' },
          { name: 'BUN BO NAM BO', price: '15,90', img: 'dish-bun-bo-nam-bo.webp', star: true,
            desc: 'Vietnamesische Reisnudeln mit gebratener Rinderhüfte, frischen Kräutern, Röstzwiebeln und Limetten-Dressing' },
          { name: 'Bo Xao Bo Toi', price: '18,90', star: true,
            desc: 'Zart gebratenes Rindfleisch mit aromatischer Knoblauchbutter, Paprika und Brokkoli, serviert auf heißer Pfanne' },
          { name: 'THAI CURRY', sub: '(knuspriges Hähnchen)', price: '14,90', img: 'dish-17.webp', tags: ['spicy'], star: true,
            desc: 'Cremiges rotes Thai-Curry mit Kokosmilch, frischem Gemüse und Thai-Basilikum' },
          { name: 'LA MAISON TERIYAKI', sub: '(knusprige Ente)', price: '16,90', img: 'dish-09.webp', star: true,
            desc: 'Marktfrisches Gemüse in Teriyaki-Soße mit knuspriger Ente' },
          { code: 'S40', name: 'LA MAISON ROLL', price: '8,50', img: 'dish-26.webp', cover: true, star: true,
            desc: 'Tempura-Garnele mit Avocado, Gurke und Tobiko, getoppt mit flambiertem Lachs und La Maison Soße' },
          { code: 'S61', name: 'CRUNCHY CHICKEN', price: '6,90', img: 'dish-23.webp', star: true,
            desc: 'Knusprig panierte Rolle mit Hähnchen, Avocado und Gurke.' }
        ]
      },
      {
        title: 'Gemeinsam genießen',
        note: 'Platten für Familie & Freunde',
        layout: 'list',
        items: [
          { name: 'VORSPEISENPLATTE', sub: '(ab 2 Personen)', price: '13,90', priceNote: 'pro Person',
            desc: 'Unsere beliebtesten Vorspeisen – ideal zum Teilen',
            contents: [{ title: 'Auf der Platte', items: ['Goi Cuon mit Garnelen (Sommerrollen)', 'Nem Hanoi (2 Stk.)', 'Ebi Tempura (3 Stk.)', 'Yakitori-Spieße (3 Stk.)', 'Nom Xu Hao (Hähnchen)'] }] },
          { name: 'INDOCHINE BALANCE PLATTE', sub: 'für 2 Personen', price: '48,90',
            desc: 'Warm & frisch kombiniert',
            contents: [
              { title: 'Sushi', items: ['2 Sake Nigiri', '2 Maguro Nigiri', '6 Sake Maki', '6 Crunchy Chicken'] },
              { title: 'Warme Gerichte', items: ['1 Bun Bo Nam Bo', '1 Thai Curry (Hähnchen oder knuspriges Hähnchen)'] }
            ] },
          { name: 'INDOCHINE FAMILY PLATTE', sub: 'für 4 Personen', price: '89,90',
            desc: 'Eine ausgewogene Kombination aus warmen Indochine-Gerichten und frischen Sushi-Highlights – perfekt zum Teilen.',
            contents: [
              { title: 'Sushi', items: ['4 Sake Nigiri', '4 Ebi Nigiri', '6 Sake Maki', '6 Tekka Maki', '6 Crunchy Sake'] },
              { title: 'Warme Gerichte', items: ['1 Thai Curry (Hähnchen oder knuspriges Hähnchen)', '1 Erdnuss knuspriger Ente', '1 Bo Xao Bo Toi', '1 Bun Bo Nam Bo'] }
            ] }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-2',
    title: 'Suppen',
    kicker: 'Warm & aromatisch',
    lede: 'Langsam gekochte Brühen, frische Kräuter, feine Schärfe.',
    hero: 'dish-18.webp',
    groups: [
      {
        title: 'Suppen',
        layout: 'cards',
        items: [
          { code: '01', name: 'TOM KHA', img: 'dish-18.webp',
            desc: 'Cremige Kokosmilchsuppe mit Galgant, Zitronengras, Champignons, Tomaten und Kaffir-Limettenblättern.',
            variants: [['a. TOM KHA GAI · mit Hähnchen', '5,90'], ['b. TOM KHA GUNG · mit Garnelen', '6,50'], ['c. TOM KHA TOFU 🌿 · mit Bio-Tofu', '5,50']] },
          { code: '02', name: 'TOM YAM', sub: '(leicht scharf)', tags: ['spicy'],
            desc: 'Würzig-säuerliche Suppe mit Zitronengras, Champignons, Tomaten und frischem Koriander.',
            variants: [['a. TOM YAM GAI · mit Hähnchen', '5,90'], ['b. TOM YAM GUNG · mit Garnelen', '6,50'], ['c. TOM YAM TOFU 🌿 · mit Bio-Tofu', '5,50']] },
          { code: '03', name: 'SUP HOANH THANH', price: '5,90',
            desc: 'Wantansuppe mit hausgemachten Teigtaschen, gefüllt mit Hähnchen und Garnelen, dazu Pak Choi und frischem Koriander.' },
          { code: '04', name: 'PHO HANOI', sub: '(kleine Portion)', img: 'dish-07.webp',
            desc: 'Vietnams berühmte Reisnudelsuppe aus Nordvietnam. Klare, aromatische Brühe, langsam gekocht mit Sternanis, Zimt und frischem Ingwer, serviert mit Reisbandnudeln und frischen Kräutern.',
            variants: [['a. PHO BO (klein) · mit Rindfleisch', '6,50'], ['b. PHO GA (klein) · mit Hähnchen', '5,90'], ['c. PHO CHAY (klein) · mit Tofu und Pak Choi Gemüse', '5,50']] }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-3',
    title: 'Vorspeisen',
    kicker: 'Zum Start',
    lede: 'Knusprig, frisch oder rein pflanzlich – zum Teilen gedacht.',
    hero: 'dish-32.webp',
    groups: [
      {
        title: 'Klassische Vorspeisen',
        layout: 'list',
        items: [
          { code: '11', name: 'GOI CUON', sub: '(Sommerrollen – 2 Stk.)', img: 'dish-goi-cuon.webp', star: true,
            desc: 'Frische Sommerrollen mit Reisnudeln, Salat und Koriander, dazu hausgemachte Hoisin-Sauce, wahlweise mit:',
            variants: [['a) Hähnchen', '5,90'], ['b) Garnelen', '6,50']] },
          { code: '12', name: 'NEM HANOI', sub: '(2 Stk.)', price: '5,90', img: 'dish-nem-ran.webp',
            desc: 'Traditionelle vietnamesische Frühlingsrollen im knusprigen Reispapier mit Hähnchen, Garnelen, Glasnudeln und Gemüse, dazu hausgemachtes Nuoc-Cham-Dip' },
          { code: '13', name: 'THAI CHICKEN SATAY', sub: '(2 Spieße)', price: '6,90', img: 'dish-06.webp',
            desc: 'Satay Hähnchenspieße in Erdnuss Soße' },
          { code: '14', name: 'EBI TEMPURA', sub: '(3 Stk.)', price: '6,50',
            desc: 'Knusprig ausgebackene Garnelen im Tempura-Teig' },
          { code: '15', name: 'BO LA LOT', price: '6,50',
            desc: 'Eingelegtes Rinderhackfleisch mit Zitronengras, in Wildbetelblättern gewickelt und gegrillt' },
          { code: '16', name: 'YAKITORI', sub: '(3 Spieße)', price: '5,90',
            desc: 'Hähnchenspieße mit Teriyaki-Soße' },
          { code: '17', name: 'CRISPY WANTAN', sub: '(4 Stk.)', price: '5,90',
            desc: 'Hausgemachte Wantans gefüllt mit Hähnchen und Garnelen, dazu hausgemachter Dip' },
          { code: '18', name: 'BANH PHONG TOM', price: '3,50', desc: 'Krabbenchips' }
        ]
      },
      {
        title: 'Frische Vorspeisen',
        layout: 'cards',
        items: [
          { code: '19', name: 'NOM XU HAO', sub: '(leicht scharf)', tags: ['spicy'],
            desc: 'Frischer vietnamesischer Salat aus fein geschnittenem Kohlrabi und Karotten mit Koriander und gerösteten Erdnüssen, verfeinert mit einem Fisch-Limetten-Dressing, wahlweise mit:',
            variants: [['a) Hähnchen', '6,90'], ['b) Garnelen', '8,50']] }
        ]
      },
      {
        title: 'Vegetarische Vorspeisen',
        layout: 'list',
        items: [
          { code: '20', name: 'EDAMAME', price: '5,50', img: 'dish-edamame.webp', tags: ['veg'], desc: 'Gekochte grüne Sojabohnen mit Meersalz' },
          { code: '21', name: 'MINI FRÜHLINGSROLLEN', sub: '(8 Stk.)', price: '4,90', tags: ['veg'], desc: 'Knusprig frittierte Mini-Frühlingsrollen mit Gemüsefüllung' },
          { code: '22', name: 'GYOZA', sub: '(4 Stk.)', price: '5,90', img: 'dish-gyoza.webp', tags: ['veg'], desc: 'Knusprig gebratene Teigtaschen mit Gemüsefüllung' },
          { code: '23', name: 'GOI CUON CHAY', sub: '(2 Stk.)', price: '5,50', tags: ['veg'],
            desc: 'Frische Sommerrollen mit Bio-Tofu, Reisnudeln, Salat und Kräutern, dazu Hoisin-Soße' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-4',
    title: 'Hauptgerichte',
    kicker: 'Reisgerichte',
    lede: 'Alle Hauptgerichte werden mit Jasminreis serviert.',
    hero: 'dish-01.webp',
    groups: [
      {
        title: 'Reisgerichte',
        note: 'Alle Gerichte werden mit Jasminreis serviert',
        layout: 'cards',
        items: [
          { code: '30', name: 'THAI CURRY', sub: '(scharf)', img: 'dish-01.webp', tags: ['spicy'],
            desc: 'Rotes Thai-Curry mit Kokosmilch, frischem Gemüse und Thai-Basilikum, wahlweise mit:',
            variants: [['a) Hähnchen', '13,90'], ['b) knuspriges Hähnchen', '14,90'], ['c) Rinderhüfte', '15,90'], ['d) Garnelen', '16,90'], ['e) knusprige Ente', '16,90'], ['f) Bio-Tofu 🌿', '13,90']] },
          { code: '31', name: 'LA MAISON ERDNUSS', img: 'dish-12.webp',
            desc: 'Cremige Erdnuss-Soße mit frischem Gemüse (mild), wahlweise mit:',
            variants: [['a) Hähnchen', '13,90'], ['b) knuspriges Hähnchen', '14,90'], ['c) Rinderhüfte', '15,90'], ['d) Garnelen', '16,90'], ['e) knusprige Ente', '16,90'], ['f) Bio-Tofu 🌿', '13,90']] },
          { code: '32', name: 'SOT ME', sub: '(mild, leicht süß-sauer)', img: 'dish-14.webp',
            desc: 'Marktfrisches Gemüse in hausgemachter Tamarinden-Sauce, wahlweise mit:',
            variants: [['a) knusprigem Hähnchen', '14,90'], ['b) knuspriger Ente', '16,90'], ['c) Garnelen', '16,90']] },
          { code: '33', name: 'LA MAISON TERIYAKI', img: 'dish-02.webp',
            desc: 'Im Wok zart gebraten mit Pak Choi, Paprika, Karotten und Zucchini, verfeinert mit hausgemachter Teriyaki-Soße, wahlweise mit:',
            variants: [['a) gebratenem Hähnchen', '13,90'], ['b) gebratener Rinderhüfte', '15,90'], ['c) knuspriger Ente', '16,90'], ['d) gegrilltem Lachs', '19,90']] },
          { code: '34', name: 'COM RANG', img: 'dish-03.webp',
            desc: 'Gebratener Eierreis mit frischem Gemüse und Röstzwiebeln nach vietnamesischer Art.',
            variants: [['a. COM RANG GA · mit gebratenem Hähnchen', '14,90'], ['b. COM RANG BO · mit gebratener Rinderhüfte', '15,90'], ['c. COM RANG TOM · mit Garnelen', '16,90'], ['d. COM RANG VIT · mit knuspriger Ente', '16,90']] }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-5',
    title: 'Indochine Wok',
    kicker: 'Spezialitäten aus dem Wok',
    lede: 'Alle Wok-Spezialitäten werden mit Jasminreis serviert.',
    hero: 'dish-11.webp',
    groups: [
      {
        title: 'Wok Spezialitäten',
        note: 'Alle Gerichte werden mit Jasminreis serviert',
        layout: 'list',
        strip: ['dish-wok-special.webp'],
        items: [
          { code: '35', name: 'GA XAO HAT DIEU', price: '15,90',
            desc: 'Zart gebratenes Hähnchen mit Pak Choi, Paprika, Karotten, Zucchini und Cashewnüssen' },
          { code: '36a', name: 'BO XAO SA OT', price: '18,90', tags: ['spicy'],
            desc: 'Zart gebratenes Rindfleisch mit Zitronengras, Chili, Paprika und Brokkoli, serviert auf heißer Pfanne' },
          { code: '36b', name: 'BO XAO BO TOI', price: '18,90',
            desc: 'Zart gebratenes Rindfleisch mit Knoblauchbutter, Paprika und Brokkoli, serviert auf heißer Pfanne' },
          { code: '37', name: 'CA HOI CARI', price: '19,90', tags: ['spicy'],
            desc: 'Gegrillter Lachs mit frischem Gemüse in cremiger Curry-Kokos-Soße' },
          { code: '38', name: 'TOM XAO TIEU DEN', price: '16,90',
            desc: 'Gebratene Garnelen mit schwarzem Pfeffer, Knoblauch und frischem Gemüse' },
          { code: '39', name: 'DAU HU XAO LA QUE', price: '14,90', tags: ['veg'],
            desc: 'Gebratener Bio-Tofu mit Zitronengras, frischem Gemüse, Thai-Basilikum im Wok geschwenkt' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-6',
    title: 'Nudeln & Phở',
    kicker: 'Nudelgerichte',
    lede: 'Reisbandnudeln, Weizennudeln, Udon – aus der Suppe oder aus dem Wok.',
    hero: 'dish-16.webp',
    groups: [
      {
        title: 'Nudelgerichte',
        layout: 'cards',
        items: [
          { code: '40', name: 'PHO HANOI', sub: '(Vietnams berühmte Reisnudelsuppe aus Nordvietnam)', img: 'dish-19.webp',
            desc: 'Phở ist eine traditionelle vietnamesische Reisnudelsuppe aus Hanoi. Klare, aromatische Brühe, über viele Stunden mit Sternanis, Zimt und frischem Ingwer gekocht, serviert mit Reisbandnudeln und frischen Kräutern.',
            variants: [['a. PHO BO · mit Rindfleisch', '15,90'], ['b. PHO GA · mit Hähnchen', '14,90'], ['c. PHO CHAY 🌿 · mit Tofu und Gemüse', '13,90']] },
          { code: '41', name: 'BUN SAIGON', sub: '(Vietnamesische Reisnudel-Bowl aus Südvietnam)', img: 'dish-05.webp',
            desc: 'Bún ist ein klassisches vietnamesisches Reisnudelgericht. Serviert mit frischem Salat, Kräutern, Sojasprossen, Röstzwiebeln, gerösteten Erdnüssen und hausgemachtem Limetten-Dressing.',
            variants: [['a. BUN BO NAM BO · mit zart gebratener Rinderhüfte', '15,90'], ['b. BUN NEM · mit knusprigen vietnamesischen Frühlingsrollen mit Hähnchen, Garnelen, Glasnudeln und Gemüse', '14,90'], ['c. BUN CHA LA LOT · gegrillte Rindfleischröllchen in Betelblättern', '15,90'], ['d. BUN VIT · mit knuspriger Ente', '16,90']] },
          { code: '42', name: 'PAD THAI', sub: '(Thailands berühmtes Nudelgericht)', img: 'dish-pad-thai.webp',
            desc: 'Gebratene Reisbandnudeln in aromatischer Tamarinden-Soße mit Ei, Lauchzwiebeln, Sojasprossen, Thai-Basilikum, frischen Kräutern, gerösteten Erdnüssen und einer Scheibe Limette',
            variants: [['a. PAD THAI GAI · mit gebratenem Hähnchen', '15,90'], ['b. PAD THAI PED · mit knuspriger Ente', '17,90'], ['c. PAD THAI GUNG · mit Garnelen', '17,90']] },
          { code: '43', name: 'MI XAO', sub: '(Vietnamesische gebratene Nudeln)', img: 'dish-mi-xao-ga.webp',
            desc: 'Im Wok gebratene Weizennudeln mit frischem Gemüse und Koriander nach vietnamesischer Art',
            variants: [['a. MI XAO GA · mit gebratenem Hähnchen', '14,90'], ['b. MI XAO GA CHIEN · mit knusprigem Hähnchen', '15,90'], ['c. MI XAO BO · mit Rinderhüfte', '16,90'], ['d. MI XAO VIT · mit knuspriger Ente', '17,90']] },
          { code: '44', name: 'UDON TERIYAKI', img: 'dish-udon.webp',
            desc: 'Gebratene Udon-Nudeln mit Pak Choi, Champignons und Karotten in hausgemachter Teriyaki-Soße.',
            variants: [['a. UDON GA · mit gebratenem Hähnchen', '14,90'], ['b. UDON GA CHIEN · mit knusprigem Hähnchen', '15,90'], ['c. UDON BO · mit Rinderhüfte', '16,90'], ['d. UDON TOM · mit Garnelen', '17,90'], ['e. UDON VIT · mit knuspriger Ente', '17,90'], ['f. UDON TOFU 🌿 · mit Bio-Tofu', '14,90']] }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-7',
    title: 'Sushi Klassiker',
    kicker: 'Sashimi · Nigiri · Maki',
    lede: 'Täglich frisch gerollt – die Klassiker der La Maison Sushi-Karte.',
    hero: 'dish-27.webp',
    groups: [
      {
        title: 'Sashimi',
        layout: 'list',
        strip: ['dish-13.webp'],
        items: [
          { code: 'S1', name: 'Sake Sashimi', sub: '– Lachs',
            variants: [['a) 5 Scheiben', '13,00'], ['b) 10 Scheiben', '23,00']] }
        ]
      },
      {
        title: 'Nigiri',
        note: '2 Stück',
        layout: 'list',
        strip: ['dish-nigiri-sake.webp', 'dish-nigiri-maguro.webp'],
        items: [
          { code: 'S11', name: 'Sake Nigiri', desc: 'Lachs', price: '5,50' },
          { code: 'S12', name: 'Maguro Nigiri', desc: 'Thunfisch', price: '5,90' },
          { code: 'S13', name: 'Ebi Nigiri', desc: 'gekochte Garnele', price: '5,50' },
          { code: 'S14', name: 'Avocado Nigiri', desc: 'Avocado', price: '4,50', tags: ['veg'] },
          { code: 'S15', name: 'Sake Aburi Nigiri', desc: 'Flambierter Lachs mit La Maison Soße und Sesam', price: '6,50' },
          { code: 'S16', name: 'Maguro Aburi Nigiri', desc: 'Flambierter Thunfisch mit La Maison Soße und Sesam', price: '6,90' }
        ]
      },
      {
        title: 'Maki',
        note: '6 Stück',
        layout: 'list',
        strip: ['dish-maki.webp'],
        items: [
          { code: 'S21', name: 'Sake Maki', desc: 'Lachs', price: '5,50' },
          { code: 'S22', name: 'Tekka Maki', desc: 'Thunfisch', price: '5,90' },
          { code: 'S23', name: 'Sake Avocado Maki', desc: 'Lachs · Avocado', price: '5,90' },
          { code: 'S24', name: 'Sake Mango Maki', desc: 'Lachs · Mango', price: '5,90' },
          { code: 'S25', name: 'Ebi Tempura Maki', desc: 'Ebi-Tempura · La Maison Soße', price: '5,90' },
          { code: 'S26', name: 'California Maki', desc: 'Surimi', price: '5,50' },
          { code: 'S27', name: 'Avocado Maki', desc: 'Avocado', price: '4,90', tags: ['veg'] },
          { code: 'S28', name: 'Kappa Maki', desc: 'Gurke', price: '4,90', tags: ['veg'] }
        ]
      },
      {
        title: 'Inside Out Rolls',
        note: '5 Stück',
        layout: 'list',
        strip: ['dish-inside-out.webp'],
        items: [
          { code: 'S31', name: 'Sake Avocado Roll', desc: 'Lachs · Avocado · Sesam', price: '5,90' },
          { code: 'S32', name: 'Ebi Tempura Roll', desc: 'Ebi-Tempura · Avocado · Sesam · La Maison Soße', price: '6,50' },
          { code: 'S33', name: 'Maguro Avocado Roll', desc: 'Thunfisch · Avocado · Tobiko', price: '6,50' },
          { code: 'S34', name: 'California Roll', desc: 'Surimi · Avocado · Tobiko', price: '5,50' },
          { code: 'S36', name: 'Yakitori Roll', desc: 'Gegrilltes Hähnchen · Avocado · Gurke · Teriyaki-Soße', price: '5,90' },
          { code: 'S37', name: 'Mango Avocado Roll', desc: 'Mango · Avocado · Gurke · Sesam', price: '5,50', tags: ['veg'] }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-8',
    title: 'Special & Crunchy Rolls',
    kicker: 'Die Hausrollen',
    lede: 'Perfekt zum Kombinieren – probieren Sie mehrere Rolls.',
    hero: 'dish-34.webp',
    groups: [
      {
        title: 'Spezial Rolls',
        note: '5 Stück · perfekt zum Kombinieren',
        layout: 'list',
        strip: ['dish-special-roll.webp'],
        items: [
          { code: 'S40', name: 'LA MAISON ROLL', price: '8,50', star: true,
            desc: 'Empfehlung des Hauses · Tempura-Garnele · Avocado · Gurke · Tobiko, getoppt mit flambiertem Lachs und hausgemachter La Maison Soße' },
          { code: 'S41', name: 'SAMURAI ROLL', price: '7,50',
            desc: 'Knusprig gebackener Lachs · Mango · Gurke · Sesam, garniert mit Avocadoscheiben' },
          { code: 'S42', name: 'TOKYO ROLL', price: '7,90',
            desc: 'Lachs · Avocado · Frischkäse · Sesam, getoppt mit Thunfisch' },
          { code: 'S43', name: 'KYOTO ROLL', price: '6,90',
            desc: 'Lachs · Avocado · Frischkäse · Sesam · Spicy Mayo · knusprige Nori-Chips' },
          { code: 'S44', name: 'OSAKA ROLL', price: '6,90',
            desc: 'Lachs · Avocado · Sesam · Spicy Mayo, verfeinert mit knusprigen Nudelstreifen' },
          { code: 'S45', name: 'TOKYO CHICKEN ROLL', price: '6,90',
            desc: 'Gebackenes Hähnchen · Gurke · Sesam · Spicy Mayo, verfeinert mit knusprigen Nudelstreifen' },
          { code: 'S46', name: 'SAKURA ROLL', price: '7,50',
            desc: 'Surimi · Avocado, getoppt mit Lachs, verfeinert mit Spicy Mayo und Tobiko' }
        ]
      },
      {
        title: 'Big Crunchy Rolls',
        note: '6 große Stück · unsere beliebten Klassiker, serviert mit hausgemachter La Maison Soße',
        layout: 'list',
        strip: ['dish-22.webp'],
        items: [
          { code: 'S61', name: 'CRUNCHY CHICKEN', price: '6,90',
            desc: 'Knusprig panierte Rolle mit Hähnchen, Avocado und Gurke' },
          { code: 'S62', name: 'CRUNCHY SAKE', price: '7,50',
            desc: 'Knusprig panierte Rolle mit Lachs, Avocado und Gurke' },
          { code: 'S63', name: 'CRUNCHY TUNA', price: '7,90',
            desc: 'Knusprig panierte Rolle mit Thunfisch, Avocado und Gurke' },
          { code: 'S64', name: 'CRUNCHY EBI', price: '7,90',
            desc: 'Knusprig panierte Rolle mit Garnelen, Avocado und Gurke' },
          { code: 'S65', name: 'CRUNCHY VEGGIE', price: '6,90', tags: ['veg'],
            desc: 'Knusprig panierte Rolle mit Avocado, Mango, Gurke und Frischkäse' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-9',
    title: 'Sushi Sets & Bento',
    kicker: 'Für eine oder mehrere Personen',
    lede: 'Fertig zusammengestellte Kombinationen – von der kleinen Auswahl bis zur Bento-Platte für zwei.',
    hero: 'dish-24.webp',
    groups: [
      {
        title: 'Small Sets',
        layout: 'list',
        strip: ['dish-25.webp', 'dish-35.webp'],
        items: [
          { name: 'Sake Set', price: '13,90', img: 'dish-sake-set.webp',
            contents: [{ items: ['4 Sake Nigiri', '6 Sake Maki'] }] },
          { name: 'Tuna Set', price: '15,90',
            contents: [{ items: ['4 Maguro Nigiri', '6 Tekka Maki'] }] },
          { name: 'California Mix', price: '14,90', img: 'dish-california-mix.webp',
            contents: [{ items: ['2 Sake Nigiri', '2 Maguro Nigiri', '5 California Roll'] }] },
          { name: 'Maki Mix', price: '13,90',
            contents: [{ items: ['6 Ebi Tempura Maki', '6 Avocado Maki', '6 California Maki'] }] },
          { name: 'Veggie Mix', price: '12,90', tags: ['veg'],
            contents: [{ items: ['6 Kappa Maki', '6 Avocado Maki', '5 Mango Avocado Roll'] }] }
        ]
      },
      {
        title: 'Bento Sets',
        layout: 'list',
        strip: ['dish-24.webp', 'dish-36.webp'],
        items: [
          { name: 'Bento 1', price: '17,50', img: 'dish-bento-1.webp',
            contents: [{ items: ['5 California Roll', '5 Ebi Tempura Roll', '6 Crunchy Sake'] }] },
          { name: 'Bento 2', price: '16,50', img: 'dish-bento-2.webp',
            contents: [{ items: ['5 Yakitori Roll', '5 Karaage Roll', '6 Crunchy Chicken'] }] },
          { name: 'Bento 3', price: '21,50', img: 'dish-bento-3.webp',
            contents: [{ items: ['2 Sake Nigiri', '6 Sake Maki', '5 Sake Avocado Roll', '6 Crunchy Sake'] }] },
          { name: 'Bento 4', price: '23,50',
            contents: [{ items: ['5 Tokyo Chicken Roll', '5 Yakitori Roll', '5 Ebi Tempura Roll', '6 Crunchy Chicken'] }] },
          { name: 'Bento 5', price: '21,50', img: 'dish-bento-5.webp',
            contents: [{ items: ['6 Sake Maki', '5 California Roll', '5 Sake Avocado Roll', '6 Crunchy Sake'] }] },
          { name: 'Bento 6', price: '14,50', img: 'dish-bento-6.webp', tags: ['veg'],
            contents: [{ items: ['5 Mango Avocado Roll', '6 Avocado Maki', '6 Crunchy Veggie'] }] }
        ]
      },
      {
        title: 'Bento für zwei',
        note: 'Bento 7 und Bento 8 lassen sich ideal kombinieren – perfekt für 4 Personen oder eine Familie',
        layout: 'list',
        items: [
          { name: 'BENTO 7', sub: 'für 2 Personen', price: '52,00', img: 'dish-bento-7.webp',
            contents: [{ title: 'Enthalten', items: ['2 Sake Nigiri', '2 Ebi Nigiri', '5 Osaka Roll', '5 Yakitori Roll', '5 Ebi Tempura Roll', '5 Samurai Roll', '5 Sakura Roll', '5 Kyoto Roll', '6 Crunchy Chicken'] }] },
          { name: 'BENTO 8', sub: 'für 2 Personen', price: '48,00',
            contents: [{ title: 'Enthalten', items: ['2 Sake Nigiri', '2 Maguro Nigiri', '6 Sake Maki', '6 Tekka Maki', '5 Sake Avocado Roll', '5 California Roll', '5 La Maison Roll ⭐', '5 Ebi Tempura Roll', '6 Crunchy Sake'] }] }
        ]
      },
      {
        title: 'Poké Bowl',
        layout: 'cards',
        items: [
          { name: 'POKÉ BOWL', img: 'dish-31.webp',
            desc: 'Sushi-Reis mit Avocado, Edamame, Mango, Daikon, Blattsalat, Sesam und hausgemachter Teriyaki-Soße, wahlweise mit:',
            variants: [['80 · gegrilltem Lachs', '17,90'], ['81 · rohem Lachs', '16,90'], ['82 · knusprigem Bio-Tofu 🌿', '13,90']] }
        ]
      },
      {
        title: 'Extra Beilagen',
        layout: 'list',
        items: [
          { name: 'Jasminreis', code: 'a', price: '3,00' },
          { name: 'Reisnudeln', code: 'b', price: '3,00' },
          { name: 'Gebratene Nudeln', code: 'c', price: '3,90' },
          { name: 'Gebratener Eierreis', code: 'd', price: '3,90' },
          { name: 'Extra Soße', code: 'e', price: '2,00' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-10',
    title: 'Kinderkarte',
    kicker: 'Für die Kleinen',
    lede: 'Alle Gerichte mild gewürzt – ohne Schärfe.',
    hero: 'dish-32.webp',
    groups: [
      {
        title: '👧👦 Kinderkarte',
        note: 'Alle Gerichte mild gewürzt – ohne Schärfe',
        layout: 'cards',
        items: [
          { code: '45', name: 'Knuspriges Hähnchen mit Pommes', price: '8,50',
            desc: 'Gebackenes Hähnchen mit Pommes Frites' },
          { code: '46', name: 'Gebratene Nudeln mit Hähnchen', price: '8,90',
            desc: 'Milde Weizennudeln mit Hähnchenfleisch und Gemüse' },
          { code: '47', name: 'Mini Frühlingsrollen mit Pommes', price: '7,90', img: 'dish-32.webp',
            desc: 'Knusprige Mini-Frühlingsrollen mit Pommes Frites' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-11',
    title: 'Dessert',
    kicker: 'Zum Abschluss',
    lede: 'Süßes aus Vietnam – warm, kalt oder beides.',
    hero: 'quan-06.jpg',
    heroCover: true,
    groups: [
      {
        title: 'Dessert',
        layout: 'list',
        items: [
          { code: '90', name: 'La Maison Eis', price: '5,90', desc: 'Drei Kugeln Eis: Vanille · Erdbeere · Schokolade' },
          { code: '91', name: 'CHUOI CHIEN', price: '6,50', img: 'dish-chuoi-chien.webp', desc: 'Knusprig gebackene Banane mit Honig, Sesam und Vanilleeis' },
          { code: '92', name: 'XOI XOAI', sub: '(Mango Sticky Rice)', price: '6,90', desc: 'Warmer Klebreis mit aromatischer Kokosmilch, geröstetem Sesam und Mango' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-12',
    title: 'Alkoholfreie Getränke',
    kicker: 'Tee, Kaffee & Limonaden',
    lede: 'Hausgemachte Tees, vietnamesischer Phin-Kaffee und frische Limonaden.',
    hero: 'quan-03.jpg',
    heroCover: true,
    groups: [
      {
        title: 'Tea & Coffee',
        note: 'Heißgetränke',
        layout: 'list',
        items: [
          { code: '101', name: 'TRA GUNG', sub: '(Hausgemachter Tee)', price: '4,50', desc: 'Frischer Ingwer · Orange · Minze · Honig' },
          { code: '102', name: 'TRA BAC HA', sub: '(Hausgemachter Tee)', price: '4,50', desc: 'Frische Minze · Limette · Honig' },
          { code: '103', name: 'TRA NHAI', price: '4,50', desc: 'Jasmintee aus Vietnam' },
          { code: '104', name: 'Kaffee', sub: '(Tasse)', price: '3,00' },
          { code: '105', name: 'Espresso', price: '2,50' },
          { code: '106', name: 'Double Espresso', price: '3,50' },
          { code: '107', name: 'Ca Phe Phin',
            desc: 'Der vietnamesische Kaffee ist ein fester Bestandteil der Alltagskultur Vietnams. Langsam durch den traditionellen „Phin“-Filter getropft, entfaltet er sein intensives, vollmundiges Aroma – kraftvoll und charakterstark. Ein Moment der Ruhe und Tiefe – authentisch und zeitlos. Vietnamesischer Kaffee, frisch durch den klassischen Phin-Filter zubereitet, serviert mit gesüßter Kondensmilch.',
            variants: [['Heiß', '4,50'], ['Auf Eis', '4,50']] }
        ]
      },
      {
        title: 'Homemade Drinks',
        note: 'Hausgemachte Getränke (0,4L)',
        layout: 'list',
        items: [
          { code: '121', name: 'Chanh Da', price: '5,50', desc: 'Limettensaft · Rohrzucker · Minze · Soda' },
          { code: '122', name: 'Maracuja Indochine', price: '5,50', desc: 'Maracuja · Limettensaft · Rohrzucker · Minze · Soda' },
          { code: '123', name: 'Thai Tamarind Fizz', price: '5,50', desc: 'Tamarinde · Ingwer · Limettensaft · Rohrzucker · Soda' },
          { code: '124', name: 'Lychee Limonade', price: '5,50', desc: 'Lychee · Limette · Rohrzucker · Soda' },
          { code: '125', name: 'Saigon Pink Tea', price: '5,50', desc: 'Jasmintee · Himbeeren · Limette · Minze · Rohrzucker' }
        ]
      },
      {
        title: 'Mineralwasser',
        note: '0,25L / 0,75L',
        layout: 'list',
        items: [
          { code: '108', name: 'Still', price: '2,90 / 6,50' },
          { code: '109', name: 'Sprudel', price: '2,90 / 6,50' }
        ]
      },
      {
        title: 'Soft Drinks',
        note: '0,2L / 0,4L',
        layout: 'list',
        items: [
          { code: '110', name: 'Coca Cola', price: '3,00 / 4,50' },
          { code: '111', name: 'Coca Cola Zero', price: '3,00 / 4,50' },
          { code: '112', name: 'Sprite', price: '3,00 / 4,50' },
          { code: '113', name: 'Apfelsaft', price: '3,50' },
          { code: '114', name: 'Maracuja-Nektar', price: '3,50' },
          { code: '115', name: 'Mango-Nektar', price: '3,50' },
          { code: '116', name: 'Saftschorle', sub: '(Apfel, Maracuja, Mango)', price: '3,20 / 4,90' },
          { code: '117', name: 'Schweppes Tonic Water', sub: '(Fl. 0,2L)', price: '3,50' },
          { code: '118', name: 'Red Bull Energy Drink', sub: '(0,25L)', price: '3,50' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-13',
    title: 'Bier, Aperitifs & Wein',
    kicker: 'Bar',
    lede: 'Vom Fass, aus Asien und aus deutschen sowie italienischen Weinlagen.',
    hero: 'quan-06.jpg',
    heroCover: true,
    groups: [
      {
        title: 'Biere',
        layout: 'list',
        items: [
          { code: '201', name: 'Krombacher Pils vom Fass', price: 'a. 0,3L 3,90 | b. 0,4L 4,90' },
          { code: '202', name: 'Alsterwasser', price: 'a. 0,3L 3,90 | b. 0,4L 4,90' },
          { code: '203', name: 'Krombacher Alkoholfrei', price: 'Fl. 0,33L 3,90' },
          { code: '204', name: 'Erdinger Hefe Hell', price: 'Fl. 0,5L 5,50' },
          { code: '205', name: 'Erdinger Alkoholfrei', price: 'Fl. 0,5L 5,50' },
          { code: '206', name: 'Saigon Beer', sub: '(Vietnam)', price: 'Fl. 0,33L 4,50' },
          { code: '207', name: 'Singha Beer', sub: '(Thailand)', price: 'Fl. 0,33L 4,50' },
          { code: '208', name: 'Asahi Super Dry', sub: '(Japan)', price: 'Fl. 0,33L 4,50' }
        ]
      },
      {
        title: 'Sake',
        note: 'Japan',
        layout: 'list',
        items: [
          { code: '209', name: 'Ozeki Sake', sub: '(warm / kalt) 200ml', desc: 'Ideal zu Sushi & Bento' }
        ]
      },
      {
        title: 'Aperitifs',
        layout: 'list',
        items: [
          { code: '211', name: 'Lillet Wild Berry', price: '7,90', desc: 'Lillet Blanc · Wild Berry Schweppes · Himbeeren' },
          { code: '212', name: 'Hugo', price: '7,90', desc: 'Holunderblüte · Prosecco · Limette · Minze · Soda' },
          { code: '213', name: 'Aperol Spritz', price: '8,50', desc: 'Aperol · Prosecco · Soda · Orangenscheibe' },
          { code: '214', name: 'YUZU SPRITZ', price: '8,50', desc: 'Kiyoko Yuzu · Prosecco · Soda' },
          { code: '215', name: 'MIONETTO SPUMANTE VIVO', price: '8,50', desc: 'Glas 0,1L 3,50 | Fl. 0,75L 22,00' }
        ]
      },
      {
        title: 'Long Drinks',
        layout: 'list',
        items: [
          { code: '221', name: 'Gin Tonic', price: '7,50', desc: 'Gin · Tonic Water · Limette' },
          { code: '222', name: 'Cuba Libre', price: '7,50', desc: 'Holunderblüte · Prosecco · Limette · Minze · Soda' },
          { code: '223', name: 'Whiskey Cola', price: '7,50', desc: 'Jack Daniel’s Old No. 7 · Cola · Limette' },
          { code: '224', name: 'Lychee Indochine', price: '9,50', desc: 'Gin · Lychee · Himbeere · Tonic Water' }
        ]
      },
      {
        title: 'Cocktails',
        layout: 'list',
        items: [
          { code: '241', name: 'Mojito', price: '8,00', desc: 'Weißer Rum · frische Minze · Limette · Rohrzucker · Soda' },
          { code: '242', name: 'Paloma', price: '9,90', desc: 'Tequila · Campari · Limette · Grapefruit · Tonic Water' },
          { code: '243', name: 'Margarita', price: '10,90', desc: 'Tequila Blanco · Cointreau · frischer Limettensaft · Salzrand' },
          { code: '244', name: 'Espresso Martini', price: '10,90', desc: 'Vodka · Kahlúa · frischer Espresso' }
        ]
      },
      {
        title: 'Spirituosen',
        note: '2 cl',
        layout: 'list',
        items: [
          { code: '231', name: 'Jägermeister', price: '3,50' },
          { code: '232', name: 'Ramazzotti Amaro', price: '3,50' },
          { code: '233', name: 'Tequila Blanco', price: '3,50' },
          { code: '234', name: 'Havana Club 3 Años', price: '3,50' },
          { code: '235', name: 'Absolut Vodka', price: '3,50' },
          { code: '236', name: 'Jack Daniel’s Old No.7', price: '3,50' },
          { code: '237', name: 'Nep Moi', price: '3,50', desc: 'Vietnamesischer Reisschnaps' },
          { code: '238', name: 'Bambusschnaps', price: '3,90', desc: 'Mit feinen Bambusnoten' }
        ]
      },
      {
        title: 'Weißwein',
        layout: 'list',
        items: [
          { code: '261', name: 'Weinschorle', price: '5,90', desc: 'Glas 0,2L' },
          { code: '262', name: 'Grauburgunder trocken', price: 'a. Glas 0,2L 6,90 | b. Fl. 0,75L 23,90', desc: 'Markus Pfaffmann · Pfalz · Deutschland' },
          { code: '263', name: 'Sauvignon Blanc trocken', price: 'a. Glas 0,2L 7,50 | b. Fl. 0,75L 25,00', desc: 'Markus Pfaffmann · Pfalz · Deutschland · Tropische Früchte – frisch, ausgewogen, mit feinwürziger Frucht' },
          { code: '264', name: 'Dr. Loosen Riesling trocken', price: 'a. Glas 0,2L 7,90 | b. Fl. 0,75L 26,00', desc: 'Mosel · Deutschland · Feine Rieslingsäure, kristallklar, elegant, lebendig – fruchtig-mineralisch' }
        ]
      },
      {
        title: 'Roséwein',
        layout: 'list',
        items: [
          { code: '265', name: 'Roséschorle', price: '5,90', desc: 'Glas 0,2L' },
          { code: '266', name: 'Pink Vineyard Cuvée trocken', price: 'a. Glas 0,2L 7,50 | b. Fl. 0,75L 25,00', desc: 'Markus Pfaffmann · Pfalz · Deutschland · Granatapfel, Kirsche, Hagebutte – saftig, elegant, leicht spritzig' }
        ]
      },
      {
        title: 'Rotwein',
        layout: 'list',
        items: [
          { code: '267', name: 'Cecchi Chianti DOCG trocken', price: 'a. Glas 0,2L 7,50 | b. Fl. 0,75L 25,00', desc: 'Toskana · Italien · Markant, fruchtig, nachhaltig – harmonisch am Gaumen' },
          { code: '268', name: 'Primitivo di Manduria Zolla trocken', price: 'a. Glas 0,2L 7,90 | b. Fl. 0,75L 26,00', desc: 'Apulien · Italien · Dunkle Beeren, Pflaumen, mediterrane Würze – samtig, langes Finale' }
        ]
      }
    ]
  }
];

const MENU_FOOTNOTE = ['🌱 vegetarisch / 🌿 vegan', 'Alle Preise in Euro.'];

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
     allergens Allergenkennzeichnung         "A,B,D"
     variants  [[Bezeichnung, Preis, Allergene (optional)], ...]
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

const LA_MAISON_ROLL = { code: 'S43', name: 'LA MAISON ROLL', price: '7,90', allergens: 'A,B,D', star: true,
  desc: 'Tempura-Garnele · Avocado · Gurke · Sesam · Getoppt mit flambiertem Lachs und hausgemachter La Maison Soße' };

const CRUNCHY_CHICKEN = { code: 'S61', name: 'CRUNCHY CHICKEN', price: '7,90', allergens: 'A,G',
  desc: 'Knusprig panierte Rolle mit Hähnchen, Avocado, Gurke und Frischkäse' };

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
          { code: '40A', name: 'PHO BO', sub: '(MIT RINDFLEISCH)', allergens: 'D', price: '15,90', img: 'dish-pho-bo.webp', star: true,
            desc: 'Traditionelle vietnamesische Reisnudelsuppe mit aromatischer Brühe, Reisbandnudeln, zartem Rindfleisch und frischen Kräutern' },
          { code: '41A', name: 'BUN BO NAM BO', allergens: 'A,D,E', price: '15,90', img: 'dish-bun-bo-nam-bo.webp', star: true,
            desc: 'Vietnamesische Reisnudeln mit gebratener Rinderhüfte, frischen Kräutern, Röstzwiebeln und Fisch-Limetten-Dressing' },
          { code: '36B', name: 'BO XAO BO TOI', allergens: 'G,I', price: '18,90', star: true,
            desc: 'Zart gebratenes Rindfleisch mit Knoblauchbutter, Paprika und Brokkoli, Sellerie. Serviert auf heißer Pfanne' },
          { code: '30B', name: 'THAI CURRY', sub: '(MIT KNUSPRIGES HÄHNCHEN)', allergens: 'A,D', price: '14,90', img: 'dish-17.webp', tags: ['spicy'], star: true,
            desc: 'Cremiges rotes Thai-Curry mit Kokosmilch, frischem Gemüse und Thai-Basilikum' },
          { code: '33C', name: 'LA MAISON TERIYAKI', sub: '(MIT KNUSPRIGE ENTE)', allergens: 'A,F', price: '16,90', img: 'dish-09.webp', star: true,
            desc: 'Marktfrisches Gemüse in Teriyaki-Soße mit knuspriger Ente' },
          { ...LA_MAISON_ROLL, img: 'dish-26.webp', cover: true },
          { ...CRUNCHY_CHICKEN, img: 'dish-23.webp', star: true }
        ]
      },
      {
        title: 'Gemeinsam genießen',
        note: 'Platten für Familie & Freunde',
        layout: 'list',
        items: [
          { code: 'GG1', name: 'LA MAISON MIX PLATTE', price: '21,90',
            desc: 'Sehr beliebt zum Teilen',
            contents: [{ items: ['Sake Avocado Maki (6 Stk.)', 'Crunchy Chicken (6 Stk.)', 'Gyoza (4 Stk.)', 'Edamame'] }] },
          { code: 'GG2', name: 'LA MAISON STARTER PLATTE', price: '21,90',
            desc: 'Perfekt als Starter zum Teilen',
            contents: [{ items: ['Goi Cuon mit Garnelen (Sommerrollen) (2 Stk.)', 'Ebi Tempura (3 Stk.)', 'Nem Hanoi (2 Stk.)', 'Yakitori-Spieße (3 Stk.)'] }] },
          { code: 'GG3', name: 'INDOCHINE FAMILY PLATTE', sub: 'Für 2 Personen', price: '45,00',
            desc: 'Warm & frisch kombiniert',
            contents: [
              { title: 'Sushi', items: ['2 Sake Nigiri', '6 Avocado Maki'] },
              { title: 'Warme Gerichte', items: ['1 Bun Bo Nam Bo', '1 Thai Curry (Hähnchen oder knuspriges Hähnchen)', '6 Crunchy Chicken', '6 Tekka Maki', '6 Crunchy Sake'] }
            ] },
          { code: 'GG4', name: 'INDOCHINE FAMILY PLATTE', sub: 'Für 4 Personen', price: '85,00',
            contents: [
              { title: 'Sushi', items: ['4 Sake Nigiri', '6 Kappa Maki'] },
              { title: 'Warme Gerichte', items: ['1 Thai Curry (Hähnchen oder knuspriges Hähnchen)', '1 La Maison Erdnuss mit knuspriger Ente', '1 Bo Xao Bo Toi', '1 Bun Bo Nam Bo'] }
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
    groups: [
      {
        title: 'Suppen',
        layout: 'cards',
        items: [
          { code: '01', name: 'MISO SUPPE', price: '4,90',
            desc: 'Mit Tofu, Seetang und Lauchzwiebeln' },
          { code: '02', name: 'TOM KHA SUPPE', allergens: 'D,G',
            desc: 'Cremige Kokosmilchsuppe mit Galgant, Zitronengras, Champignons, Tomaten und Kaffir-Limettenblättern.',
            variants: [['a) TOM KHA GAI · mit Hähnchen', '5,90', 'D'], ['b) TOM KHA GUNG · mit Garnelen', '6,50', 'B,D'], ['c) TOM KHA TOFU · mit Bio-Tofu', '5,50', 'D,F']] },
          { code: '03', name: 'TOM YAM SUPPE', tags: ['spicy'],
            desc: 'Würzig-säuerliche Suppe mit Zitronengras, Champignons, Tomaten und frischem Koriander.',
            variants: [['a) TOM YAM GAI · mit Hähnchen', '5,90', 'D'], ['b) TOM YAM GUNG · mit Garnelen', '6,50', 'B,D'], ['c) TOM YAM TOFU · mit Bio-Tofu', '5,50', 'D,F']] },
          { code: '04', name: 'SUP HOANH THANH', price: '5,90', allergens: 'A,B,C',
            desc: 'Wantansuppe mit hausgemachten Teigtaschen, gefüllt mit Hähnchen und Garnelen, dazu Pak Choi und frischem Koriander' },
          { code: '05', name: 'PHO HANOI', sub: '(KLEINE PORTION)',
            desc: 'Vietnams berühmte Reisnudelsuppe aus Nordvietnam. Klare, aromatische Brühe, langsam gekocht mit Sternanis, Zimt und frischem Ingwer. Serviert mit Reisbandnudeln und frischen Kräutern.',
            variants: [['a) PHO BO (klein) · mit Rindfleisch', '6,50', 'D'], ['b) PHO GA (klein) · mit Hähnchen', '5,90', 'D'], ['c) PHO CHAY (klein) · mit Tofu und Pak Choi Gemüse', '5,50', 'D,F']] }
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
          { code: '10', name: 'GOI CUON', sub: '(Sommerrollen – 2 Stk.)', img: 'dish-goi-cuon.webp', star: true,
            desc: 'Frische Sommerrollen mit Reisnudeln, Salat und Koriander, dazu hausgemachte Hoisin-Sauce, wahlweise mit:',
            variants: [['a) Hähnchen', '5,90'], ['b) Garnelen', '6,50']] },
          { code: '11', name: 'NEM HANOI', sub: '(2 Stk.)', price: '5,90', img: 'dish-nem-ran.webp',
            desc: 'Traditionelle vietnamesische Frühlingsrollen im knusprigen Reispapier mit Hähnchen, Garnelen, Glasnudeln und Gemüse, dazu hausgemachtes Nuoc-Cham-Dip' },
          { code: '12', name: 'THAI CHICKEN SATAY', sub: '(2 Spieße)', price: '6,90', img: 'dish-06.webp',
            desc: 'Satay Hähnchenspieße in Erdnuss Soße' },
          { code: '13', name: 'EBI TEMPURA', sub: '(3 Stk.)', price: '6,50',
            desc: 'Knusprig ausgebackene Garnelen im Tempura-Teig' },
          { code: '14', name: 'BO LA LOT', price: '6,50',
            desc: 'Eingelegtes Rinderhackfleisch mit Zitronengras, in Wildbetelblättern gewickelt und gegrillt' },
          { code: '15', name: 'YAKITORI', sub: '(3 Spieße)', price: '5,90',
            desc: 'Hähnchenspieße mit Teriyaki-Soße' },
          { code: '16', name: 'CRISPY WANTAN', sub: '(4 Stk.)', price: '5,90',
            desc: 'Hausgemachte Wantans gefüllt mit Hähnchen und Garnelen, dazu hausgemachter Dip' },
          { code: '17', name: 'BANH PHONG TOM', price: '3,50', desc: 'Krabbenchips' }
        ]
      },
      {
        title: 'Frische Vorspeisen',
        layout: 'cards',
        items: [
          { code: '18', name: 'NOM XU HAO', sub: '(leicht scharf)', tags: ['spicy'],
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
          { code: '23', name: 'GOI CUON CHAY', sub: '(2 STK.)', allergens: 'E,F', price: '5,90', tags: ['veg'],
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
          { code: '36B', name: 'BO XAO BO TOI', allergens: 'G,I', price: '18,90',
            desc: 'Zart gebratenes Rindfleisch mit Knoblauchbutter, Paprika und Brokkoli, Sellerie. Serviert auf heißer Pfanne' },
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
          { code: 'S31', name: 'SAKE AVOCADO ROLL', allergens: 'D,K', desc: 'Lachs · Avocado · Sesam · Tobiko', price: '5,90' },
          { code: 'S32', name: 'MAGURO AVOCADO ROLL', allergens: 'D,K', desc: 'Thunfisch · Avocado · Sesam · Tobiko', price: '6,50' },
          { code: 'S33', name: 'EBI TEMPURA ROLL', allergens: 'A,B,C,F,K', desc: 'Ebi-Tempura · Avocado · Sesam · Tobiko · La Maison Soße', price: '5,90' },
          { code: 'S34', name: 'CALIFORNIA ROLL', allergens: 'K,O', desc: 'Surimi · Avocado · Sesam · Tobiko', price: '5,50' },
          { code: 'S35', name: 'KARAAGE ROLL', allergens: 'A,C,K', desc: 'Knusprig paniertes Hähnchen · Avocado · Gurke · Sesam · Spicy Mayo', price: '5,90' },
          { code: 'S36', name: 'YAKITORI ROLL', allergens: 'F,K', desc: 'Gegrilltes Hähnchen · Avocado · Gurke · Sesam · Teriyaki-Soße', price: '5,90' },
          { code: 'S37', name: 'AVOCADO PHILADELPHIA', allergens: 'G,K', desc: 'Avocado · Gurke · Frischkäse · Sesam', price: '5,50', tags: ['veg'] },
          { code: 'S38', name: 'MANGO AVOCADO ROLL', allergens: 'K', desc: 'Mango · Avocado · Gurke · Sesam', price: '5,50', tags: ['veg'] }
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
          { code: 'S41', name: 'OSAKA ROLL', price: '6,90', allergens: 'C,D,K',
            desc: 'Lachs · Avocado · Sesam · Spicy Mayo · Verfeinert mit knusprigen Nudelstreifen' },
          { code: 'S42', name: 'TOKYO TUNA ROLL', price: '7,90', allergens: 'D,G,K',
            desc: 'Thunfisch · Avocado · Frischkäse · Sesam · Getoppt mit Lachs' },
          LA_MAISON_ROLL,
          { code: 'S44', name: 'KYOTO ROLL', price: '6,90', allergens: 'C,D,G,K',
            desc: 'Lachs · Avocado · Frischkäse · Sesam · Spicy Mayo · knusprige Nori-Chips' },
          { code: 'S45', name: 'SAKURA ROLL', price: '6,90', allergens: 'B,C,D',
            desc: 'Surimi · Avocado · Sesam · Tobiko · Getoppt mit Lachs' },
          { code: 'S46', name: 'TOKYO CHICKEN ROLL', price: '6,90', allergens: 'A,C,K',
            desc: 'Paniertes Hähnchen · Avocado · Gurke · Sesam · Spicy Mayo · Verfeinert mit knusprigen Nudelstreifen' },
          { code: 'S47', name: 'SAMURAI ROLL', price: '7,50', allergens: 'A,D,K',
            desc: 'Knusprig gebackener Lachs · Mango · Gurke · Sesam · Garniert mit Avocadoscheiben' }
        ]
      },
      {
        title: 'Big Crunchy Rolls',
        note: '(6 große Stück) · Unsere beliebten Klassiker für jeden Geschmack · Serviert mit hausgemachter La Maison Soße',
        layout: 'list',
        strip: ['dish-22.webp'],
        items: [
          CRUNCHY_CHICKEN,
          { code: 'S62', name: 'CRUNCHY SAKE', price: '8,50', allergens: 'A,D,G',
            desc: 'Knusprig panierte Rolle mit Lachs, Avocado, Gurke und Frischkäse' },
          { code: 'S63', name: 'CRUNCHY TUNA', price: '8,50', allergens: 'A,D,G',
            desc: 'Knusprig panierte Rolle mit Thunfisch, Avocado, Gurke und Frischkäse' },
          { code: 'S64', name: 'CRUNCHY EBI', price: '8,50', allergens: 'A,B,G',
            desc: 'Knusprig panierte Rolle mit Garnelen, Avocado, Gurke und Frischkäse' },
          { code: 'S65', name: 'CRUNCHY VEGGIE', price: '7,50', allergens: 'A,G', tags: ['veg'],
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
          { name: 'BENTO 4', price: '23,50', allergens: 'A,B', img: 'bento-4.jpg', cover: true,
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
    lede: 'Süßes aus Vietnam – warm serviert, zum Abschluss.',
    hero: 'quan-06.jpg',
    heroCover: true,
    groups: [
      {
        title: 'Dessert',
        layout: 'list',
        items: [
          { code: '91', name: 'CHUOI CHIEN', allergens: 'A,G,K', price: '5,50', img: 'dish-chuoi-chien.webp', desc: 'Knusprig gebackene Banane mit Honig' },
          { code: '92', name: 'XOI XOAI', allergens: 'K', price: '6,90', desc: 'Warmer Klebreis mit aromatischer Kokosmilch, geröstetem Sesam und Mango' }
        ]
      }
    ]
  },

  {
    id: 'menu-cat-12',
    title: 'Alkoholfreie Getränke',
    kicker: 'Soft Drinks',
    lede: 'Coca Cola, Sprite und Cola Zero in der 1-Liter-Flasche.',
    groups: [{
      title: 'Soft Drinks', layout: 'list',
      items: [
        { code: '190', name: 'COCA COLA', desc: 'Fl. 1 Liter', price: '4,90' },
        { code: '191', name: 'SPRITE', desc: 'Fl. 1 Liter', price: '4,90' },
        { code: '192', name: 'COLA ZERO', desc: 'Fl. 1 Liter', price: '4,90' }
      ]
    }]
  },
  {
    id: 'menu-cat-13',
    title: 'Biere',
    kicker: 'Flaschenbiere',
    lede: 'Biere aus Deutschland, Vietnam, Thailand und Japan.',
    groups: [{
      title: 'Biere', layout: 'list',
      items: [
        { code: '203', name: 'KROMBACHER ALKOHOLFREI', desc: 'Fl. 0,33L', price: '3,90' },
        { code: '204', name: 'ERDINGER HEFE HELL', desc: 'Fl. 0,5L', price: '5,50' },
        { code: '205', name: 'ERDINGER ALKOHOLFREI', desc: 'Fl. 0,5L', price: '5,50' },
        { code: '206', name: 'SAIGON BEER', sub: '(Vietnam)', desc: 'Fl. 0,33L', price: '4,50' },
        { code: '207', name: 'SINGHA BEER', sub: '(Thailand)', desc: 'Fl. 0,33L', price: '4,50' },
        { code: '208', name: 'ASAHI SUPER DRY', sub: '(Japan)', desc: 'Fl. 0,33L', price: '4,50' }
      ]
    }]
  }
];

const MENU_FOOTNOTE = [
  '🌿 vegetarisch / vegan', 'Alle Preise in Euro.',
  'Allergene: A. Glutenhaltiges Getreide · B. Krebstiere · C. Eier · D. Fisch · E. Erdnüsse · F. Soja · G. Milch / Laktose · H. Schalenfrüchte · I. Sellerie · J. Senf · K. Sesam · L. Schwefeldioxid / Sulfite · M. Lupinen · N. Weichtiere · O. Surimi (Krebsfleischimitat aus Fisch)',
  'Einige unserer Soßen können Spuren von Weizen, Soja und Sesam enthalten. Bitte sprechen Sie unser Servicepersonal an, wenn Sie Allergien oder besondere Wünsche haben.'
];

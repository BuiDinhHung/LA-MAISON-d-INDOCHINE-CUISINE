from pathlib import Path
import re

path = Path('site/assets/menu-data.js')
s = path.read_text(encoding='utf-8')
def replace(old, new):
    global s
    assert old in s, old[:100]
    s = s.replace(old, new)

replace("{ name: 'PHO BO', sub: '(mit Rindfleisch)'", "{ code: '40A', name: 'PHO BO', sub: '(MIT RINDFLEISCH)', allergens: 'D'")
replace("{ name: 'BUN BO NAM BO', price", "{ code: '41A', name: 'BUN BO NAM BO', allergens: 'A,D,E', price")
replace('Röstzwiebeln und Limetten-Dressing', 'Röstzwiebeln und Fisch-Limetten-Dressing')
replace("{ name: 'Bo Xao Bo Toi', price", "{ code: '36B', name: 'BO XAO BO TOI', allergens: 'G,I', price")
replace('Zart gebratenes Rindfleisch mit aromatischer Knoblauchbutter, Paprika und Brokkoli, serviert auf heißer Pfanne', 'Zart gebratenes Rindfleisch mit Knoblauchbutter, Paprika und Brokkoli, Sellerie. Serviert auf heißer Pfanne')
replace("{ name: 'THAI CURRY', sub: '(knuspriges Hähnchen)'", "{ code: '30B', name: 'THAI CURRY', sub: '(MIT KNUSPRIGES HÄHNCHEN)', allergens: 'A,D'")
replace("{ name: 'LA MAISON TERIYAKI', sub: '(knusprige Ente)'", "{ code: '33C', name: 'LA MAISON TERIYAKI', sub: '(MIT KNUSPRIGE ENTE)', allergens: 'A,F'")
replace("{ code: '36b', name: 'BO XAO BO TOI'", "{ code: '36B', name: 'BO XAO BO TOI', allergens: 'G,I'")
replace('Zart gebratenes Rindfleisch mit Knoblauchbutter, Paprika und Brokkoli, serviert auf heißer Pfanne', 'Zart gebratenes Rindfleisch mit Knoblauchbutter, Paprika und Brokkoli, Sellerie. Serviert auf heißer Pfanne')
replace("{ code: '23', name: 'GOI CUON CHAY', sub: '(2 Stk.)', price: '5,50'", "{ code: '23', name: 'GOI CUON CHAY', sub: '(2 STK.)', allergens: 'E,F', price: '5,90'")

start = s.index("          { name: 'VORSPEISENPLATTE'")
end = s.index('\n        ]', start)
s = s[:start] + """          { code: 'GG1', name: 'LA MAISON MIX PLATTE', price: '21,90',
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
            ] }""" + s[end:]

replace("    hero: 'dish-18.webp',\n", '')
start = s.index("          { code: '01', name: 'TOM KHA'")
end = s.index('\n        ]', start)
s = s[:start] + """          { code: '01', name: 'MISO SUPPE', price: '4,90',
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
            variants: [['a) PHO BO (klein) · mit Rindfleisch', '6,50', 'D'], ['b) PHO GA (klein) · mit Hähnchen', '5,90', 'D'], ['c) PHO CHAY (klein) · mit Tofu und Pak Choi Gemüse', '5,50', 'D,F']] }""" + s[end:]

start = s.index("          { code: 'S31'")
end = s.index('\n        ]', start)
s = s[:start] + """          { code: 'S31', name: 'SAKE AVOCADO ROLL', allergens: 'D,K', desc: 'Lachs · Avocado · Sesam · Tobiko', price: '5,90' },
          { code: 'S32', name: 'MAGURO AVOCADO ROLL', allergens: 'D,K', desc: 'Thunfisch · Avocado · Sesam · Tobiko', price: '6,50' },
          { code: 'S33', name: 'EBI TEMPURA ROLL', allergens: 'A,B,C,F,K', desc: 'Ebi-Tempura · Avocado · Sesam · Tobiko · La Maison Soße', price: '5,90' },
          { code: 'S34', name: 'CALIFORNIA ROLL', allergens: 'K,O', desc: 'Surimi · Avocado · Sesam · Tobiko', price: '5,50' },
          { code: 'S35', name: 'KARAAGE ROLL', allergens: 'A,C,K', desc: 'Knusprig paniertes Hähnchen · Avocado · Gurke · Sesam · Spicy Mayo', price: '5,90' },
          { code: 'S36', name: 'YAKITORI ROLL', allergens: 'F,K', desc: 'Gegrilltes Hähnchen · Avocado · Gurke · Sesam · Teriyaki-Soße', price: '5,90' },
          { code: 'S37', name: 'AVOCADO PHILADELPHIA', allergens: 'G,K', desc: 'Avocado · Gurke · Frischkäse · Sesam', price: '5,50', tags: ['veg'] },
          { code: 'S38', name: 'MANGO AVOCADO ROLL', allergens: 'K', desc: 'Mango · Avocado · Gurke · Sesam', price: '5,50', tags: ['veg'] }""" + s[end:]

house = """{ code: 'S43', name: 'LA MAISON ROLL', price: '7,90', allergens: 'A,B,D', star: true,
  desc: 'Tempura-Garnele · Avocado · Gurke · Sesam · Getoppt mit flambiertem Lachs und hausgemachter La Maison Soße' }"""
chicken = """{ code: 'S61', name: 'CRUNCHY CHICKEN', price: '7,90', allergens: 'A,G',
  desc: 'Knusprig panierte Rolle mit Hähnchen, Avocado, Gurke und Frischkäse' }"""
s = re.sub(r"\{ code: 'S40'.*?\n\s+desc: '[^']*' \}", "{ ...LA_MAISON_ROLL, img: 'dish-26.webp', cover: true }", s, count=1, flags=re.S)
s = re.sub(r"\{ code: 'S61'.*?\n\s+desc: '[^']*' \}", "{ ...CRUNCHY_CHICKEN, img: 'dish-23.webp', star: true }", s, count=1, flags=re.S)
start = s.index("          { code: 'S40'")
end = s.index('\n        ]', start)
s = s[:start] + """          { code: 'S41', name: 'OSAKA ROLL', price: '6,90', allergens: 'C,D,K',
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
            desc: 'Knusprig gebackener Lachs · Mango · Gurke · Sesam · Garniert mit Avocadoscheiben' }""" + s[end:]
replace('6 große Stück · unsere beliebten Klassiker, serviert mit hausgemachter La Maison Soße', '(6 große Stück) · Unsere beliebten Klassiker für jeden Geschmack · Serviert mit hausgemachter La Maison Soße')
start = s.index("          { code: 'S61'")
end = s.index('\n        ]', start)
s = s[:start] + """          CRUNCHY_CHICKEN,
          { code: 'S62', name: 'CRUNCHY SAKE', price: '8,50', allergens: 'A,D,G',
            desc: 'Knusprig panierte Rolle mit Lachs, Avocado, Gurke und Frischkäse' },
          { code: 'S63', name: 'CRUNCHY TUNA', price: '8,50', allergens: 'A,D,G',
            desc: 'Knusprig panierte Rolle mit Thunfisch, Avocado, Gurke und Frischkäse' },
          { code: 'S64', name: 'CRUNCHY EBI', price: '8,50', allergens: 'A,B,G',
            desc: 'Knusprig panierte Rolle mit Garnelen, Avocado, Gurke und Frischkäse' },
          { code: 'S65', name: 'CRUNCHY VEGGIE', price: '7,50', allergens: 'A,G', tags: ['veg'],
            desc: 'Knusprig panierte Rolle mit Avocado, Mango, Gurke und Frischkäse' }""" + s[end:]
replace('const MENU = [', 'const LA_MAISON_ROLL = '+house+';\n\nconst CRUNCHY_CHICKEN = '+chicken+';\n\nconst MENU = [')
replace("{ name: 'Bento 4', price: '23,50'", "{ name: 'BENTO 4', price: '23,50', allergens: 'A,B'")
replace("name: 'La Maison Eis'", "name: 'KEM (EIS)', allergens: 'G'")
replace("name: 'CHUOI CHIEN', price", "name: 'CHUOI CHIEN', allergens: 'A,G,K', price")
replace("name: 'XOI XOAI', sub: '(Mango Sticky Rice)'", "name: 'XOI XOAI', allergens: 'K'")
start = s.index("    kicker: 'Tee, Kaffee & Limonaden'")
end = s.index('\n];', start)
s = s[:start] + """    kicker: 'Soft Drinks',
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
  }""" + s[end:]
path.write_text(s, encoding='utf-8')

path = Path('site/index.html')
s = path.read_text(encoding='utf-8')
s = s.replace('22159', '22147').replace('11:30–22:00', '12:00–22:00')
s = s.replace('Mo–Sa 11:30–15:00 Uhr (außer Sonn- und Feiertagen)', 'Mo–Fr 11:30–14:30 Uhr (Dienstag Ruhetag; außer Feiertagen)')
s = re.sub(r'^\s*<article class="lunch__item reveal">[^\n]*<span class="lunch__num">M7</span>[^\n]*\n', '', s, flags=re.M)
s = re.sub(r'^\s*<p class="note"><b>Hinweis</b>[^\n]*\n', '', s, flags=re.M)
s = re.sub(r'        <div class="gallery">.*?        </div>\n', '', s, flags=re.S)
s = s.replace('Sa 12:00–22:00 · So &amp; Feiertage 12:00–22:00</span>', 'Sa 12:00–22:00 · So &amp; Feiertage 12:00–22:00<br>Dienstag Ruhetag</span>')
s = s.replace('mit rohem Lachs oder knusprigem Bio-Tofu.', 'mit knusprigem Hähnchen oder knusprigem Bio-Tofu.')
path.write_text(s, encoding='utf-8')

# This alternate renderer is referenced by the original archive; remove the retired note there too.
path = Path('site/assets/lunch-menu.js')
s = path.read_text(encoding='utf-8')
s = re.sub(r'      <p class="lunch-menu__note">.*?</p>\n', '', s)
path.write_text(s, encoding='utf-8')

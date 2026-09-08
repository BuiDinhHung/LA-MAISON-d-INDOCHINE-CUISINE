const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const menu = vm.runInNewContext(read('site/assets/menu-data.js') + '; JSON.stringify(MENU)');
const categories = JSON.parse(menu);
const items = categories.flatMap(category => category.groups.flatMap(group => group.items));
const check = (code, name, price, allergens) => {
  const matches = items.filter(item => item.code === code);
  assert(matches.length, `Missing ${code}`);
  for (const item of matches) {
    assert.equal(item.name, name, code);
    assert.equal(item.price, price, code);
    assert.equal(item.allergens, allergens, code);
  }
};
[
  ['40A', 'PHO BO', '15,90', 'D'],
  ['41A', 'BUN BO NAM BO', '15,90', 'A,D,E'],
  ['36B', 'BO XAO BO TOI', '18,90', 'G,I'],
  ['30B', 'THAI CURRY', '14,90', 'A,D'],
  ['33C', 'LA MAISON TERIYAKI', '16,90', 'A,F'],
  ['23', 'GOI CUON CHAY', '5,90', 'E,F'],
  ['S31', 'SAKE AVOCADO ROLL', '5,90', 'D,K'],
  ['S32', 'MAGURO AVOCADO ROLL', '6,50', 'D,K'],
  ['S33', 'EBI TEMPURA ROLL', '5,90', 'A,B,C,F,K'],
  ['S34', 'CALIFORNIA ROLL', '5,50', 'K,O'],
  ['S35', 'KARAAGE ROLL', '5,90', 'A,C,K'],
  ['S36', 'YAKITORI ROLL', '5,90', 'F,K'],
  ['S37', 'AVOCADO PHILADELPHIA', '5,50', 'G,K'],
  ['S38', 'MANGO AVOCADO ROLL', '5,50', 'K'],
  ['S41', 'OSAKA ROLL', '6,90', 'C,D,K'],
  ['S42', 'TOKYO TUNA ROLL', '7,90', 'D,G,K'],
  ['S43', 'LA MAISON ROLL', '7,90', 'A,B,D'],
  ['S44', 'KYOTO ROLL', '6,90', 'C,D,G,K'],
  ['S45', 'SAKURA ROLL', '6,90', 'B,C,D'],
  ['S46', 'TOKYO CHICKEN ROLL', '6,90', 'A,C,K'],
  ['S47', 'SAMURAI ROLL', '7,50', 'A,D,K'],
  ['S61', 'CRUNCHY CHICKEN', '7,90', 'A,G'],
  ['S62', 'CRUNCHY SAKE', '8,50', 'A,D,G'],
  ['S63', 'CRUNCHY TUNA', '8,50', 'A,D,G'],
  ['S64', 'CRUNCHY EBI', '8,50', 'A,B,G'],
  ['S65', 'CRUNCHY VEGGIE', '7,50', 'A,G']
].forEach(values => check(...values));
for (const item of items.filter(item => /^S6\d$/.test(item.code))) assert(item.desc.includes('Frischkäse'));
assert(!items.some(item => item.code === 'S40' || /VORSPEISENPLATTE|BALANCE PLATTE|La Maison Eis/.test(item.name)));
const soups = categories.find(category => category.id === 'menu-cat-2').groups[0].items;
assert.deepEqual(soups.map(item => [item.code, item.name]), [
  ['01', 'MISO SUPPE'], ['02', 'TOM KHA SUPPE'], ['03', 'TOM YAM SUPPE'],
  ['04', 'SUP HOANH THANH'], ['05', 'PHO HANOI']
]);
assert(soups.every(item => !item.img));
assert.equal(soups[0].price, '4,90');
for (const index of [1, 2]) assert.deepEqual(soups[index].variants.map(v => v.slice(1)), [['5,90', 'D'], ['6,50', 'B,D'], ['5,50', 'D,F']]);
const drinks = categories.slice(-2).flatMap(category => category.groups.flatMap(group => group.items));
assert.deepEqual(drinks.map(item => [item.code, item.price]), [
  ['190', '4,90'], ['191', '4,90'], ['192', '4,90'], ['203', '3,90'],
  ['204', '5,50'], ['205', '5,50'], ['206', '4,50'], ['207', '4,50'], ['208', '4,50']
]);
assert.deepEqual(items.filter(item => /^GG/.test(item.code)).map(item => item.price), ['21,90', '21,90', '45,00', '85,00']);
const bento = items.find(item => item.name === 'BENTO 4');
assert.equal(bento.price, '23,50');
assert.equal(bento.img, 'bento-4.jpg');
assert.equal(bento.cover, true);
assert(fs.readFileSync(path.join(root, 'image', 'bento 4.jpg')).equals(fs.readFileSync(path.join(root, 'site', 'assets', 'bento-4.jpg'))), 'Bento 4 asset must be an exact copy of the supplied JPG');
assert.deepEqual(bento.contents[0].items, ['5 Tokyo Chicken Roll', '5 Yakitori Roll', '5 Ebi Tempura Roll', '6 Crunchy Chicken']);
for (const category of categories) {
  const codes = category.groups.flatMap(group => group.items.map(item => item.code).filter(Boolean));
  assert.equal(new Set(codes).size, codes.length, `Duplicate code in ${category.title}`);
  for (const group of category.groups) {
    for (const img of [...(group.strip || []), ...group.items.map(item => item.img).filter(Boolean)]) {
      assert(fs.existsSync(path.join(root, 'site/assets', img)), `Missing image: ${img}`);
    }
  }
}
const html = read('site/index.html');
const lunchCodes = [...html.matchAll(/class="lunch__num">(M\d+)</g)].map(match => match[1]);
assert.equal(new Set(lunchCodes).size, lunchCodes.length, 'Duplicate lunch code');
assert(!/Mì Xào Rau|22159|11:30–15:00|11:30–22:00|<b>Hinweis<\/b>/.test(html));
assert(!html.match(/id="gallery"[\s\S]*?<\/section>/)[0].includes('<img'));
assert(html.includes('Mo–Fr 11:30–14:30'));
assert(html.includes('Samstag</b><span>12:00–22:00'));
assert(html.includes('Bekassinenau 67 · 22147 Hamburg'));
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)) {
  assert(fs.existsSync(path.join(root, 'site', match[1])), `Missing asset: ${match[1]}`);
}
console.log(`PASS: ${items.length} menu entries; codes, prices, allergens, soup variants, drinks, platters, Bento 4 text, images, lunch, hours and address.`);

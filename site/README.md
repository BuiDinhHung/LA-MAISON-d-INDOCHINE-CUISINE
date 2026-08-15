# LA MAISON d'INDOCHINE — trang offline

Trang giới thiệu nhà hàng, chạy trực tiếp từ ổ đĩa: nhấp đúp vào `index.html`,
không cần server, không cần mạng.

## Cấu trúc

```
site/
  index.html            khung trang: hero, giới thiệu, signatures, Mittagskarte,
                        speisekarte đầy đủ, galerie, kontakt
  index-original.html   bản clone gốc từ webcake (chỉ để tra cứu nội dung)
  assets/
    site.css            toàn bộ style
    app.js              menu mobile, hiệu ứng reveal, scroll-spy, lightbox
    menu-data.js        DỮ LIỆU speisekarte đầy đủ (13 nhóm, 162 mục)
    full-menu.js        dựng HTML cho speisekarte từ menu-data.js
    dish-01…37.webp     ảnh món (1200×1200, nền trong suốt)
    logo-mark.webp      logo quán tách nền, dùng cho nhận diện thương hiệu
    quan-01…11.jpg      ảnh quán
    a0xx.*              font, logo, hoa văn nền
```

Tổng ~53 MB. Không còn tham chiếu ra ngoài internet: font, ảnh, script đều nằm
trong `assets/`, không có Google Fonts, không có iframe bản đồ, không có form
gửi dữ liệu.

## Speisekarte đầy đủ

Toàn bộ menu nằm trong `assets/menu-data.js` dưới dạng dữ liệu có cấu trúc,
`assets/full-menu.js` đọc dữ liệu đó rồi dựng HTML. **Sửa menu = sửa
`menu-data.js`**, không cần đụng vào HTML hay CSS.

Một món trông như sau:

```js
{
  code: '30',                       // số trên menu
  name: 'THAI CURRY',
  sub: '(scharf)',                  // chú thích nhỏ cạnh tên
  desc: 'Rotes Thai-Curry mit …',
  price: '13,90',                   // giá đơn; bỏ trống nếu dùng variants
  variants: [['a) Hähnchen', '13,90'], ['b) Rinderhüfte', '15,90']],
  contents: [{ title: 'Sushi', items: ['2 Sake Nigiri', '6 Sake Maki'] }],
  img: 'dish-01.webp',              // bỏ trống → ô ảnh thành hoạ tiết logo mờ
  cover: true,                      // ảnh chụp có nền → phủ kín khung
  tags: ['veg'],                    // hoặc ['spicy'] → hiện chip lọc + nhãn
  star: true                        // gắn nhãn "★ Empfehlung"
}
```

Toàn bộ nhóm hiện dùng chung một danh sách gọn: 2 cột trên màn hình lớn, 1 cột trên
điện thoại. Trường `layout`, `strip` và ảnh `hero` cũ vẫn được giữ trong dữ liệu để
tham chiếu, nhưng không còn được render cạnh món ăn nên không gây hiểu nhầm ảnh–tên món.

Thanh điều hướng dính (sticky) và bộ lọc **Alle / 🌿 Vegetarisch / 🌶 Scharf**
được sinh tự động từ dữ liệu — thêm nhóm mới là nó tự xuất hiện.

## Quy tắc dùng ảnh món

**Chỉ gắn ảnh khi ảnh đúng là món đó.** Món nào không có ảnh khớp thì bỏ trống
`img:` — món sẽ hiển thị dạng chữ gọn, không dùng logo hay ảnh món khác để thay thế.

Hiện có 17 món được gắn ảnh đã đối chiếu tận nơi:

| Món | Ảnh | Vì sao khớp |
|---|---|---|
| PHO BO / 40 PHO HANOI / 04 (nhỏ) | `dish-20`, `dish-19` | phở bò tái và phở bò chín |
| 01 TOM KHA | `dish-18` | canh nước cốt dừa, riềng, sả, nấm, lá chanh |
| 30 THAI CURRY | `dish-01` | cà ri đỏ + gà + rau + cơm |
| THAI CURRY (gà giòn) | `dish-17` | gà tẩm bột chiên + sốt cà ri |
| 31 LA MAISON ERDNUSS | `dish-12` | sốt đậu phộng màu nâu be |
| 32 SOT ME | `dish-14` | thịt chiên giòn + dứa/hành trong sốt me |
| 33 LA MAISON TERIYAKI | `dish-02` | gà xào pak choi/cà rốt/bí + sốt teriyaki + vừng |
| LA MAISON TERIYAKI (vịt) | `dish-09` | vịt quay + sốt đậm + cơm |
| 34 COM RANG | `dish-03` | cơm rang + vịt quay |
| 41 BUN SAIGON | `dish-05` | bún + vịt quay + rau sống + nước chấm |
| 42 PAD THAI | `dish-16` | pad thai + tôm + chanh |
| 43 MI XAO | `dish-08` | mì xào + vịt quay |
| POKÉ BOWL | `dish-31` | cơm + xoài, dưa chuột, vừng, cá hồi |
| 47 Mini Frühlingsrollen mit Pommes | `dish-32` | nem rán + khoai tây chiên |
| 91 CHUOI CHIEN | `dish-33` | chuối chiên vừng đen |

Ảnh `strip` và `hero` cũ chỉ còn là metadata, không được hiển thị trên menu.

Ba ảnh `dish-10`, `dish-26`, `dish-29` là ảnh chụp có nền chữ nhật — nếu dùng phải
kèm `cover: true`, và đừng dùng cho ô ảnh tròn ở Mittagskarte. Hiện cả ba đang
không dùng vì không khớp món nào.

`logo-mark.webp` là logo quán đã tách nền, tô màu vàng của trang — tạo từ
`a033.webp`.

## Mittagskarte (M1–M11)

Phần này viết tay trực tiếp trong `index.html` (mục `#menu`), lấy đúng nội dung
và số thứ tự từ tờ menu gốc: M1–M11, mỗi món 11,90 €, riêng M7 (Mì Xào Rau) 9,50 €.

Lưu ý: menu gốc ghi giờ ăn trưa là **Mo–Sa 11:30–15:00**, trong khi mục
Öffnungszeiten ở phần "Über uns" lại ghi Mo–Fr 11:30–14:30 & 16:30–22:00.
Bản gốc vốn đã mâu thuẫn như vậy; trang này giữ nguyên cả hai. Nếu biết giờ đúng
thì sửa lại cho khớp.

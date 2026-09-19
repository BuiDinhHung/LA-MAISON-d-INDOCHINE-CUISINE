# Cập nhật menu La Maison — 08/09/2026

Đã cập nhật bản website tại `site/index.html`, giữ nguyên branding, màu sắc, ảnh và các section ngoài phạm vi yêu cầu. Chưa triển khai lên hosting.

## File đã sửa / thêm

| File | Thay đổi |
| --- | --- |
| `site/assets/menu-data.js` | Bestseller, GG1–GG4, soup 01–05, món 23, sushi S31–S38 / S41–S47 / S61–S65, Bento 4, dessert, drinks, allergen |
| `site/assets/bento-4.jpg` | Bản sao nguyên vẹn của ảnh Bento 4 gốc `image/bento 4.jpg` |
| `site/assets/full-menu.js` | Hiển thị allergen cho món và biến thể, thêm ký hiệu € cho giá |
| `site/index.html` | Xóa M7 và Hinweis, sửa giờ Mittag/Samstag, địa chỉ và metadata/link bản đồ, xóa ảnh Atmosphäre; Poké Bowl Mittag theo PDF dùng gà giòn hoặc Bio-Tofu |
| `site/assets/site.css` | Căn cột giá, giữ giá liền dòng, định dạng allergen |
| `site/assets/app.js` | Cho dải danh mục cuộn bằng con lăn và tự đưa danh mục đang xem vào vùng hiển thị |
| `site/assets/lunch-menu.js` | Bỏ Hinweis cũ trong renderer lưu trữ không được trang chính tải |
| `site/README.md` | Cập nhật nguồn dữ liệu, cách chạy và kiểm tra |
| `tests/menu-check.cjs` | Kiểm tra dữ liệu, mã món, giá, allergen, ảnh, giờ và địa chỉ |
| `tests/ui-check.cjs` | Kiểm tra Chromium ở 1440, 768, 390, 320 px, bộ lọc, menu mobile, ảnh và cột giá |
| `MENU-UPDATE.md` | Báo cáo này |

## Nội dung đã thay / xóa

- Bestseller: bổ sung đúng 40A PHO BO, 41A BUN BO NAM BO, 36B BO XAO BO TOI, 30B THAI CURRY, 33C LA MAISON TERIYAKI, giữ giá theo yêu cầu; đồng bộ S43 và S61 với danh mục sushi. BO XAO BO TOI bổ sung Sellerie ở cả hai nơi xuất hiện.
- Xóa M7 MI XAO RAU và Hinweis phụ thu cũ.
- Thay Vorspeisenplatte 13,90 €/người, Balance Platte 48,90 €, Family Platte 89,90 € bằng GG1/GG2/GG3/GG4: 21,90 / 21,90 / 45,00 / 85,00 €, đúng thành phần được yêu cầu.
- Thay soup cũ bằng 01 MISO SUPPE, 02 TOM KHA SUPPE, 03 TOM YAM SUPPE, 04 SUP HOANH THANH, 05 PHO HANOI; đúng các lựa chọn và allergen trong PDF.
- Thay toàn bộ Inside Out, Spezial và Big Crunchy theo yêu cầu; thêm Karaage S35 và Avocado Philadelphia S37 còn thiếu.
- Dessert: 90 đổi LA MAISON EIS thành KEM (EIS), 91 CHUOI CHIEN, 92 XOI XOAI; giá 5,90 / 6,50 / 6,90 €, mô tả và allergen theo menu.
- Drinks: chỉ còn 203–208 và ba món mới 190 COCA COLA, 191 SPRITE, 192 COLA ZERO — mỗi chai 1 Liter, 4,90 €.
- Xóa các đồ uống cũ mã 101–118, 121–125, 201–202, 209, 211–215, 221–224, 231–238, 241–244, 261–268: trà/cà phê, homemade drinks, nước khoáng, soft drinks cũ, bia vòi/Alsterwasser, sake, aperitifs, long drinks, cocktails, rượu mạnh và vang.

## Mã món đã đổi

| Món | Mã cũ → mới |
| --- | --- |
| TOM KHA | 01 → 02 |
| TOM YAM | 02 → 03 |
| SUP HOANH THANH | 03 → 04 |
| PHO HANOI nhỏ | 04 → 05 |
| MAGURO AVOCADO ROLL | S33 → S32 |
| EBI TEMPURA ROLL | S32 → S33 |
| MANGO AVOCADO ROLL | S37 → S38 |
| LA MAISON ROLL | S40 → S43 |
| OSAKA ROLL | S44 → S41 |
| KYOTO ROLL | S43 → S44 |
| SAKURA ROLL | S46 → S45 |
| TOKYO CHICKEN ROLL | S45 → S46 |
| SAMURAI ROLL | S41 → S47 |

S42 thay TOKYO ROLL cũ bằng TOKYO TUNA ROLL đúng tên và thành phần mới. 36b chuẩn hóa thành 36B. Các mã S31, S34, S36 giữ nguyên.

## Giá đã đổi

| Món | Giá cũ → mới |
| --- | --- |
| 23 GOI CUON CHAY | 5,50 → 5,90 € |
| EBI TEMPURA ROLL (nay S33) | 6,50 → 5,90 € |
| LA MAISON ROLL (nay S43) | 8,50 → 7,90 € |
| SAKURA ROLL (nay S45) | 7,50 → 6,90 € |
| S61 CRUNCHY CHICKEN | 6,90 → 7,90 € |
| S62 CRUNCHY SAKE | 7,50 → 8,50 € |
| S63 CRUNCHY TUNA | 7,90 → 8,50 € |
| S64 CRUNCHY EBI | 7,90 → 8,50 € |
| S65 CRUNCHY VEGGIE | 6,90 → 7,50 € |

S61–S65 đều có Frischkäse. Giá platter được thay bằng nhóm GG mới, không giữ thành phần của platter cũ.

## Ảnh

- Bỏ ảnh soup `assets/dish-18.webp` và `assets/dish-07.webp` khỏi section Suppen, đồng thời bỏ metadata ảnh hero soup.
- Bỏ sáu ảnh khỏi Atmosphäre: `quan-01.jpg`, `quan-06.jpg`, `quan-03.jpg`, `quan-04.jpg`, `quan-10.jpg`, `quan-11.jpg`. Giữ text; section tự co lại. Các file ảnh vẫn còn để những section khác đang sử dụng không bị ảnh hưởng.
- Bento 4: đã có đúng 5 Tokyo Chicken Roll, 5 Yakitori Roll, 5 Ebi Tempura Roll, 6 Crunchy Chicken, giá 23,50 €, allergen A,B. Đã sao chép nguyên vẹn ảnh gốc `image/bento 4.jpg` sang `site/assets/bento-4.jpg` và gắn cho món; không dùng AI, stock hoặc ảnh thay thế.

## Giờ và địa chỉ cuối cùng

- Mittag: Mo–Fr 11:30–14:30; Dienstag Ruhetag, trừ ngày lễ.
- Montag–Freitag: 11:30–14:30 và 16:30–22:00, trừ thứ Ba.
- Samstag: 12:00–22:00.
- Sonntag & Feiertage: 12:00–22:00.
- Địa chỉ: Bekassinenau 67, 22147 Hamburg — đã cập nhật nội dung trang, footer, metadata và link/iframe bản đồ.

## Kiểm tra và điểm chưa xác định

- `node tests/menu-check.cjs`: đạt cho 114 mục menu, gồm kiểm tra ảnh Bento 4 trong website giống từng byte với file JPG người dùng cung cấp.
- Thanh danh mục dài đã được kiểm tra cuộn ngang bằng con lăn chuột; khi đến Sushi, mục đang active tự cuộn vào vùng nhìn thấy. Scrollbar mảnh vẫn hiển thị để kéo trực tiếp và thao tác cảm ứng dùng cuộn ngang tự nhiên.
- `node --check`: đạt cho các file JS của trang.
- Kiểm tra Chromium: bộ lọc Alle/Vegetarisch/Scharf, menu mobile, định dạng giá, ảnh tải được, không tràn trang hoặc giá chồng tên món tại 1440, 768, 390, 320 px. Ảnh chụp QA nằm trong `tmp/qa/`. Bản đồ Google bên ngoài bị chặn riêng trong bài kiểm tra local.
- `git diff --check`: đạt. Không có cấu hình build/lint hoặc package.json trong dự án tĩnh.
- **Mã Mittag đã chốt:** giữ M10 Sushi Mix và M11 Poké Bowl theo PDF và website gốc. Không áp dụng M11→M10 vì sẽ trùng mã; không có M12–M19 trong source. M7 MI XAO RAU đã được xóa theo yêu cầu.
- Ảnh Bento 4 đã được nhận và gắn đúng như mô tả ở trên. Các ảnh đánh dấu ở cuộc trò chuyện trước không được đính kèm trong phiên này, nên chỉ xử lý các mục được liệt kê rõ trong yêu cầu văn bản.
- `site/index-original.html` là file lưu trữ có sẵn, chưa được Git theo dõi và không được sửa. Nó còn nội dung lịch sử, không phải nguồn trang chính. Các danh mục không nằm trong yêu cầu thay đổi được giữ nguyên; đây không phải lần đồng bộ toàn bộ mọi món trong PDF.

---

# Cập nhật menu La Maison — 19/09/2026

Bốn yêu cầu: thêm số điện thoại bấm gọi được, đánh lại số món Vorspeisen, bỏ món 90, sửa món 91.

## File đã sửa

| File | Thay đổi |
| --- | --- |
| `site/index.html` | Thêm số điện thoại `+49 40 55617657` dưới dạng link `tel:` ở bốn chỗ: mục Öffnungszeiten, danh sách Kontakt, nút "Anrufen" và footer |
| `site/assets/site.css` | Thêm class `.tel` cho link điện thoại (màu vàng, gạch chân mảnh, không xuống dòng giữa số) |
| `site/assets/menu-data.js` | Đánh lại mã Vorspeisen 11–19 → 10–18; xóa món 90 KEM (EIS); món 91 CHUOI CHIEN đổi giá và mô tả; sửa lede danh mục Dessert |
| `site/assets/app.js` | Sửa lỗi bấm vào danh mục không cuộn tới đúng mục; đo chiều cao thật của thanh danh mục vào biến `--menu-nav-h` |
| `MENU-UPDATE.md` | Báo cáo này |

## Nội dung đã thay / xóa

- Số điện thoại `00494055617657` được hiển thị dạng quốc tế `+49 40 55617657`, link `tel:+494055617657` để bấm gọi trên điện thoại. Nút "Anrufen" là nút vàng chính trong section Kontakt; "Route öffnen" chuyển thành nút viền vì gọi điện mới là hành động đặt bàn.
- Vorspeisen đánh lại số: 11 GOI CUON → 10, 12 NEM HANOI → 11, 13 THAI CHICKEN SATAY → 12, 14 EBI TEMPURA → 13, 15 BO LA LOT → 14, 16 YAKITORI → 15, 17 CRISPY WANTAN → 16, 18 BANH PHONG TOM → 17, 19 NOM XU HAO → 18.
- Xóa món 90 KEM (EIS) khỏi danh mục Dessert.
- Món 91 CHUOI CHIEN: giá 6,50 € → 5,50 €; mô tả bỏ "Sesam und Vanilleeis", còn "Knusprig gebackene Banane mit Honig".
- Lede danh mục Dessert đổi từ "warm, kalt oder beides" thành "warm serviert, zum Abschluss" vì sau khi bỏ món 90 không còn món lạnh nào.

## Sửa lỗi cuộn tới danh mục

Bấm vào một mục trên thanh danh mục (Wok, Sushi Klassiker, Dessert...) thì trang gần như đứng yên thay vì cuộn tới đúng mục.

- **Nguyên nhân:** `IntersectionObserver` theo dõi danh mục đang xem gọi `activeLink.scrollIntoView()` để kéo mục đang active vào giữa thanh danh mục. `scrollIntoView()` cuộn mọi khung cha, kể cả chính trang. Khi trang bắt đầu cuộn mượt tới danh mục được bấm, nó đi qua danh mục đầu tiên, observer bắn, `scrollIntoView()` chạy và **hủy** cú cuộn đang chạy. Trang dừng ngay tại danh mục đầu tiên. Đo ở 1440 px: bấm Dessert thì mục còn cách viewport 14.048 px.
- **Cách sửa:** thay bằng hàm `centerNavLink()` chỉ gọi `menuScroller.scrollBy()` — cuộn ngang đúng thanh danh mục, không đụng tới cuộn dọc của trang.
- **Lỗi thứ hai đi kèm:** điểm dừng lệch. `html` có `scroll-padding-top` (nav + 12px) và `.menu-category` có `scroll-margin-top: calc(var(--nav-h) + 62px)` — hai giá trị cộng dồn nên mục dừng thấp hơn ~91 px, chừa một khoảng trống lớn; số 62px lại là ước lượng cứng, sai khi thanh danh mục xuống hai dòng ở màn hình dưới 700 px. Nay `app.js` đo chiều cao thật của thanh bằng `ResizeObserver` và ghi vào `--menu-nav-h`, CSS chỉ dùng biến đó.

Sau khi sửa, cả 13 danh mục dừng cách thanh danh mục 12–13 px, tiêu đề luôn hiện đủ, đúng ở 1920 / 1440 / 900 / 768 / 390 / 320 px, cả khi kéo đổi kích thước cửa sổ lẫn khi mở thẳng bằng link `#menu-cat-11`.

## Điểm cần chủ quán xác nhận

- **Số 19 hiện đang trống.** Sau khi đánh lại, Vorspeisen kết thúc ở 18 và món kế tiếp là 20 EDAMAME. Yêu cầu chỉ nói 11–19 → 10–18 nên các mã từ 20 trở đi giữ nguyên.
- **Allergen món 91 giữ nguyên `A,G,K`.** Mô tả không còn nhắc Sesam (K) và Vanilleeis (G), nhưng công thức thực tế có thể vẫn chứa hai chất này. Khai báo thừa thì an toàn, khai báo thiếu thì không, nên chưa tự ý bỏ. Cần chủ quán xác nhận trước khi sửa.
- **Ảnh món 91 `dish-chuoi-chien.webp` vẫn có viên kem trong hình.** Nếu món không còn kèm kem thì cần thay ảnh.

## Kiểm tra

- `node tests/menu-check.cjs`: đạt, 113 mục menu.
- `node tests/ui-check.cjs`: đạt ở 1440, 768, 390, 320 px. Nhãn nút gọi rút ngắn còn "Anrufen" vì nhãn kèm số làm tràn trang ở 320 px (`.btn` có `white-space:nowrap`).
- Bấm lần lượt cả 13 mục trên thanh danh mục ở 6 khổ màn hình, có bật cuộn mượt: mục nào cũng dừng đúng, không mục nào bị thanh danh mục che tiêu đề.

# LA MAISON d’INDOCHINE — website tĩnh

Mở `site/index.html` trực tiếp, hoặc chạy từ thư mục gốc:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory site
```

Sau đó truy cập http://127.0.0.1:8000.

## Nguồn đang sử dụng

- `index.html`: khung trang, Mittagskarte, giờ mở cửa, địa chỉ và nội dung Atmosphäre.
- `assets/menu-data.js`: dữ liệu thực đơn đầy đủ, 13 nhóm và 114 mục hiển thị.
- `assets/full-menu.js`: dựng thực đơn và bộ lọc Alle / Vegetarisch / Scharf dùng chung cho desktop và mobile.
- `assets/site.css`: giao diện và responsive.
- `assets/app.js`: điều hướng, hiệu ứng và các hành vi trang.

Thanh danh mục của thực đơn hỗ trợ cuộn ngang bằng thanh cuộn, con lăn chuột và thao tác cảm ứng;
danh mục đang xem được tự động đưa vào vùng hiển thị.

S43 và S61 dùng cùng một dữ liệu giữa Bestseller và danh mục Sushi để tránh lệch giá/mô tả.
Giá lưu dạng `7,90`; renderer thêm ` €`. Trường `allergens` chứa ký hiệu theo menu chuẩn.
Mỗi biến thể có dạng `[tên, giá, allergen tùy chọn]`.

Ảnh chỉ hiển thị khi có `img` ở món hoặc `strip` ở nhóm. Không có ảnh thì hiển thị chữ,
không dùng ảnh thay thế. `hero` trong dữ liệu là metadata cũ, không được render.
Bento 4 dùng ảnh gốc người dùng gửi tại `assets/bento-4.jpg` và có đúng nội dung, giá 23,50 €.

## Mittag và thông tin nhà hàng

- Mittag: Mo–Fr 11:30–14:30, trừ thứ Ba và ngày lễ.
- Mo–Fr: 11:30–14:30 và 16:30–22:00; Dienstag Ruhetag.
- Samstag, Sonntag & Feiertage: 12:00–22:00.
- Bekassinenau 67, 22147 Hamburg.
- Đã xóa món Mittag M7. Giữ M10 Sushi Mix / M11 Poké Bowl theo PDF và website gốc;
  source không có M12–M19.

`index-original.html` là bản lưu tham khảo có sẵn, không phải trang chính và không được sửa.
`assets/lunch-menu.js` và `lunch-menu.css` thuộc renderer cũ, không được `index.html` tải.

## Kiểm tra

Từ thư mục gốc: `node tests/menu-check.cjs`.
Kiểm tra giao diện (cần Playwright và Chromium, server cổng 8000 đang chạy):
`node tests/ui-check.cjs`. Ảnh kiểm tra lưu trong `tmp/qa/`.
Dự án tĩnh không có cấu hình build/lint hoặc package.json.

Chi tiết thay đổi và kết quả kiểm tra: `../MENU-UPDATE.md`.

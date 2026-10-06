# Kế hoạch: Gallery mẫu thiệp cưới online (Zalo Mini App)

Trạng thái: **bước 1 (tái cấu trúc) và bước 2 (gallery) đã xong**, giao diện mẫu 1 giữ nguyên (so ảnh 10/10 giống hệt, xem `tools/visual-check/`). Chưa deploy bản có gallery. Bước 3 trở đi chưa làm.
App hiện tại: `my-wed/` (React + TypeScript + zmp-ui + Vite), là 1 thiệp cưới đơn.

## Mục tiêu

Biến `my-wed` thành mini app dạng **gallery**: người dùng Zalo xem preview các mẫu thiệp, chọn mẫu, nhắn Zalo cho chủ shop. Chủ shop chốt và thu tiền ngoài app, sau đó tạo một mini app riêng cho từng khách với đúng mẫu đã chọn và thông tin của khách, deploy rồi gửi Zalo duyệt.

## Đã chốt

- Gallery là **Zalo mini app** (khách hàng là người dùng Zalo).
- **10 mẫu**. Chủ shop đưa thiết kế dạng ảnh, Claude dựng từng mẫu.
- **Không hiển thị giá trong app** (đổi ngày 06/10/2026): chủ shop thỏa thuận giá với từng khách qua Zalo. Trước đó có giá cứng 199.000đ/99.000đ, đã bỏ.
- **Không có thanh toán trong app** ở MVP. Chủ shop chốt và thu tiền qua chat Zalo.
- Nút "Chọn mẫu" mở chat Zalo với **chủ shop** kèm tin nhắn soạn sẵn (tên mẫu). Nếu `zmp-sdk` không gửi sẵn nội dung được thì có nút sao chép tin nhắn. Số Zalo của chủ shop: **chưa cung cấp**.
- Không có màn hình cấu hình/CMS. Dữ liệu mẫu hard-code trong code.
- Nộp mini app cho Zalo duyệt và tạo app ID: **làm thủ công**.
- 10 mẫu **chung tính năng cơ bản, chỉ khác UI**.

## Kiến trúc đề xuất

```
my-wed/src/
  core/                  logic chung: hooks, utils, kiểu dữ liệu (WeddingData)
  templates/
    index.ts             danh sách mẫu (id, tên, ảnh xem trước, dữ liệu demo)
    t01/                 mẫu hiện tại
      index.tsx
      styles.scss
      demo-data.ts
    t02/ ...
  pages/
    gallery.tsx          danh sách mẫu (ảnh chụp màn hình đầu của từng mẫu)
    template-detail.tsx  xem thử mẫu + nút "Chọn mẫu"
```

- Tính năng chung nằm trong `core/` (đếm ngược, hiệu ứng cuộn, mở bản đồ, lưu vào lịch, tài khoản mừng cưới, RSVP, album, timeline). Mỗi mẫu tự viết JSX và SCSS, dùng chung hook.
- Mọi mẫu nhận cùng kiểu `WeddingData`, để mẫu nào cũng có cùng tính năng.
- Mỗi mẫu **load lười** để gallery không nặng.

### Hai chế độ build

- **Gallery**: app của chủ shop, có đủ mẫu.
- **Thiệp**: app của từng khách, chỉ build **một mẫu** với dữ liệu của khách, không chứa gallery.

## Luồng làm việc với khách

1. Khách xem gallery, bấm "Chọn mẫu" → nhắn Zalo cho chủ shop.
2. Chủ shop gửi khách tin nhắn mẫu liệt kê đủ các trường cần thu thập (tên, ngày giờ, địa điểm, tên bố mẹ, tài khoản mừng cưới, ảnh nào cho vị trí nào) và chốt tiền.
3. Chủ shop tạo `customers/<slug>/` trong **repo private riêng** (`data.ts` + `photos/`); Claude có thể điền `data.ts` từ câu trả lời của khách.
4. Chủ shop tạo mini app + app ID; điền `APP_ID` vào `.env` của bản build.
5. Build đúng mẫu + đúng dữ liệu → deploy (chỉ khi chủ shop nói) → gửi Zalo duyệt.

### Kiểm tra bắt buộc trước khi deploy (tránh nhầm khách/mẫu)

- Mỗi `data.ts` của khách ghi rõ `template` và `customer`.
- Lệnh build **từ chối chạy** nếu id mẫu trong dữ liệu khác mẫu được chọn.
- Trước deploy, in ra tên khách, mẫu và `APP_ID`, chờ chủ shop xác nhận.

## Quy trình dựng mẫu từ ảnh thiết kế

Xem skill `.claude/skills/new-template/SKILL.md`. Tóm tắt: trích bảng màu/font → liệt kê section → dựng từng section → chụp ảnh Playwright ở 390px và so với ảnh gốc → sửa tối đa 2 vòng.

## Thứ tự làm

1. ✅ **Tái cấu trúc**: mẫu hiện tại thành `t01`, tách `core/` (`types.ts` với `WeddingData`, `wedding-context.tsx`, `hooks/`, `utils/`), registry `templates/index.ts`. Giao diện giữ nguyên.
2. ✅ Gallery (`/`), trang chi tiết mẫu (`/template/:id`, thanh cố định: nút quay lại + tên mẫu + nút "Chọn mẫu"). Nút "Chọn mẫu" sao chép tin nhắn soạn sẵn và mở `zalo.me/<số>` nếu `ownerZaloPhone` trong `core/shop-config.ts` có giá trị (hiện đang **trống**, cần điền số Zalo của chủ shop). Danh sách mẫu nhớ vị trí cuộn: xem mẫu xong quay lại vẫn ở đúng chỗ. Ảnh đại diện mỗi mẫu là ảnh chụp màn hình đầu của mẫu đó (`src/static/thumbs/tNN.jpg`); khi sửa giao diện mẫu nên chụp lại.
3. Chế độ build một mẫu cho từng khách + script kiểm tra khách/mẫu.
4. Mẫu `t02`–`t10`. **`t02` (Tối giản) xong**, mẫu gốc tự thiết kế theo xu hướng 2026 (tối giản; cổ điển+hiện đại; bohemian; pastel; vintage; đỏ truyền thống). **`t03` Sen trắng, `t04` Đỏ rượu vang (phong bì dấu sáp), `t05` Biển xanh đã xong**, dựng theo ảnh tham chiếu của chủ shop (lấy phong cách và bố cục, không dùng ảnh/hình minh họa gốc; mọi trang trí là SVG/CSS tự vẽ), có animation (hiện dần khi cuộn, cánh hoa/bong bóng rơi, sóng, timeline vẽ dần...). Bộ thành phần chung nằm ở `src/templates/_kit/`. Còn `t06`–`t10`: ảnh tham chiếu còn lại gồm xanh rêu/Our Memories, xanh lá kiểu satin tối giản, dark green vintage có chữ Hỷ, hoàng hôn vàng, tím xanh hoa giấy, rừng tối có phong bì dấu sáp. Không lấy được video TikTok nên không dựa vào đó.

## Việc còn mở

- Số Zalo của chủ shop (gắn vào nút chat).
- Repo private cho dữ liệu khách: chưa tạo được từ phiên Claude (GitHub App không có quyền tạo repo, phiên chỉ thấy repo `my-study`). Cần chủ shop tự tạo repo và cấp quyền, hoặc chọn repo ngay lúc mở phiên mới.
- RSVP hiện **không lưu dữ liệu** ở đâu (chỉ hiện "Cảm ơn", câu "ngày 30.10" viết cứng). Cần quyết định thu phản hồi bằng cách nào hoặc bỏ tính năng.
- Kiểm tra `zmp-sdk` có mở chat Zalo cá nhân kèm nội dung soạn sẵn được không.
- Nút "Chỉ đường" đã chạy được trên bản dev (cơ chế dự phòng `openOutApp` → `openWebview` → `window.open`); vẫn chưa rõ nguyên nhân gốc của lỗi ban đầu.
- Cần xem khi deploy app thứ hai: token `ZMP_TOKEN` có dùng chung được không (trong token có trường `appId`).

## Quy ước

- **Chỉ deploy khi chủ shop nói.**
- Không commit `.env` (chứa `APP_ID`, `ZMP_TOKEN`); file đã nằm trong `.gitignore`.
- Không đưa ảnh/thông tin khách vào repo `my-study` (repo public).
- Deploy: `zmp deploy -p -m "<mô tả>"` chạy không tương tác, bản Development (không có `-t`). CLI cần cài toàn cục (`npm i -g zmp-cli`). `zmp login` cần quét QR bằng Zalo.
- Link mở bản dev: `https://zalo.me/s/<APP_ID>/?env=DEVELOPMENT&version=<version>`.

## Cập nhật: thêm mẫu t11–t13 (tham khảo Pinterest)

Giữ nguyên t01–t10, thêm 3 mẫu mới theo xu hướng các ghim Pinterest (bảng màu hẹp, khối nền xen kẽ, chữ serif lớn): `t11` Đỏ rượu & kem (phong bì dấu sáp, khung tem răng cưa), `t12` Xanh rêu & kem (bố cục tạp chí, timeline icon, dải sọc cuối trang), `t13` Xanh cổ điển (monogram, dải ảnh viền rách). Gallery hiện có 13 mẫu.

## Cập nhật: mẫu t14 · Lối vào lễ đường

Cả mẫu dựng trên **một ảnh thật duy nhất**, đứng yên, không zoom (lối đi có bình hoa hồng hai bên, cuối đường là cổng voan trắng; rawpixel CC0). Khung hình: bình hoa rõ nét bên trái, lối đi chạy về cổng voan bên phải. Màn đầu là rèm vải thật (ảnh rawpixel CC0) nhuộm **đỏ** (không dùng trắng vì kiêng kỵ), treo trên thanh vàng, giữa là khung vòm kem viền vàng ghi tên cô dâu chú rể; bấm "Mở cửa lễ đường" thì rèm dồn nếp sang hai bên như rèm thật. Phía trên mỗi chặng là tiêu đề lớn (tên cặp đôi, tên chặng, số thứ tự 01/07…). Chuyển chặng: một đàn tim bay lượn theo gió từ trái sang phải, cuốn thẻ cũ nghiêng bay theo; cuối làn gió thẻ mới lướt vào từ phía kia (khoảng 1,7 giây, nút bị khóa trong lúc đó). Quay lại thì gió đổi chiều. Vuốt theo chiều gió (trái sang phải) để sang chặng sau, vuốt ngược để quay lại; vuốt lên/xuống vẫn dùng được (trừ khi đang cuộn nội dung trong thẻ). Tim nhỏ bay nhẹ suốt cảnh. Chỉ dùng transform/opacity nên mượt trên điện thoại. Thẻ của các chặng: lời mời, thời gian + đếm ngược, địa điểm, chương trình, ảnh, xác nhận tham dự, mừng cưới. Chặng cuối: ảnh cưới thật của cặp đôi (`photos.cover`) trong khung vòm, kèm tên và lời cảm ơn. Gallery có 14 mẫu.

## Cập nhật: thêm mẫu t15–t24 (tự thiết kế)

Mỗi mẫu xoay quanh một ảnh thật chủ đạo (hoa, cảnh vật, tranh cổ; nguồn CC0/phạm vi công cộng, xem `docs/CREDITS.md`) và giữ một phong cách thống nhất, không dùng hình vẽ hoạt hình. Tất cả đủ tính năng chung (đếm ngược, lịch, chỉ đường, lưu lịch, chương trình, album, xác nhận tham dự, mừng cưới).

- `t15` Hỷ đỏ: mở phong bì gấm đỏ có dấu 囍, đèn lồng đỏ, giấy kem chữ đỏ viền vàng.
- `t16` Oải hương: cánh đồng oải hương, khung vòm, dải ảnh nhành oải hương làm đường ngăn.
- `t17` Lá phong mùa thu: rừng thu sương mù, lá phong thật "đặt" trên giấy, dải nâu trầm với số ngày rất lớn.
- `t18` Hoa đào cổ họa: tranh lụa cổ, tên viết dọc, dấu son, album treo như tranh cuộn.
- `t19` Đêm đầy sao: ảnh Ngân Hà, sao lấp lánh, sao băng, khung kính mờ.
- `t20` Hướng dương: đồng hướng dương hoàng hôn, "mặt trời" ngày cưới có tia nắng xoay, album vuốt ngang.
- `t21` Tạp chí mẫu đơn: bìa tạp chí "Love Story", các trang đánh số, chữ cái đầu dòng lớn.
- `t22` Champagne: đen và vàng champagne, khung art-deco cắt góc, nền bokeh, bọt nổi.
- `t23` Cúc họa mi: khung oval, viền vỏ sò, nền caro picnic, xanh lá và vàng bơ.
- `t24` Thư tay thảo mộc: giấy cũ, tranh thực vật in lên giấy như mẫu ép hoa, thư viết tay, dấu bưu điện.

Thêm font Lora (có bộ chữ tiếng Việt). Gallery có 24 mẫu.

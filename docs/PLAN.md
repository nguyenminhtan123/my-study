# Kế hoạch: Gallery mẫu thiệp cưới online (Zalo Mini App)

Trạng thái: **mới chốt hướng đi, chưa bắt đầu tái cấu trúc code.**
App hiện tại: `my-wed/` (React + TypeScript + zmp-ui + Vite), là 1 thiệp cưới đơn.

## Mục tiêu

Biến `my-wed` thành mini app dạng **gallery**: người dùng Zalo xem preview các mẫu thiệp, chọn mẫu, nhắn Zalo cho chủ shop. Chủ shop chốt và thu tiền ngoài app, sau đó tạo một mini app riêng cho từng khách với đúng mẫu đã chọn và thông tin của khách, deploy rồi gửi Zalo duyệt.

## Đã chốt

- Gallery là **Zalo mini app** (khách hàng là người dùng Zalo).
- **10 mẫu**. Chủ shop đưa thiết kế dạng ảnh, Claude dựng từng mẫu.
- **Giá cứng**: giá gốc 199.000đ (gạch), giá bán 99.000đ.
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
    gallery.tsx          danh sách mẫu + giá
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

1. **Tái cấu trúc**: mẫu hiện tại thành `t01`, tách `core/`. Giao diện giữ nguyên.
2. Gallery, trang chi tiết mẫu, giá, nút "Chọn mẫu".
3. Chế độ build một mẫu cho từng khách + script kiểm tra khách/mẫu.
4. Mẫu `t02`–`t10` khi có thiết kế (dùng skill `new-template`).

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

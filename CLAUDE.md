# my-study

Ứng dụng chính nằm ở `my-wed/` (Zalo Mini App thiệp cưới). Đọc `docs/PLAN.md` trước khi làm việc: đó là kế hoạch và các quyết định đã chốt (gallery mẫu thiệp, 24 mẫu, không hiển thị giá, không thanh toán trong app).

Quy ước bắt buộc:
- Giao tiếp với chủ repo bằng tiếng Việt.
- **Chỉ deploy khi chủ repo nói.**
- Không commit `.env` hay bất kỳ token nào; không đưa ảnh/thông tin khách vào repo này (public).
- Dựng mẫu mới từ ảnh thiết kế: dùng skill `new-template`.

Về `ZMP_TOKEN` trong `my-wed/.env` (chủ repo đã nói rõ):
- Đây là token **developer, cố định và vĩnh viễn** của chủ repo. Nó **không liên quan đến `zmp login`** và không hết hạn theo phiên.
- **CẤM thay đổi `my-wed/.env` dưới mọi hình thức** (xóa, ghi đè, sửa, thêm dòng, chạy `zmp login`), kể cả khi chủ repo gửi token trong chat, trừ khi chủ repo nói rõ "sửa .env" trong chính lượt đó. Cần đọc thì chỉ đọc, và không in token ra màn hình.
- Nếu `.env` thiếu `ZMP_TOKEN`, hỏi chủ repo, đừng tự tạo token mới bằng login.

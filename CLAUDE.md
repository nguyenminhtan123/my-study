# my-study

Ứng dụng chính nằm ở `my-wed/` (Zalo Mini App thiệp cưới). Đọc `docs/PLAN.md` trước khi làm việc: đó là kế hoạch và các quyết định đã chốt (gallery mẫu thiệp, 24 mẫu, không hiển thị giá, không thanh toán trong app).

Quy ước bắt buộc:
- Giao tiếp với chủ repo bằng tiếng Việt.
- **Chỉ deploy khi chủ repo nói.**
- Không commit `.env` hay bất kỳ token nào; không đưa ảnh/thông tin khách vào repo này (public).
- Dựng mẫu mới từ ảnh thiết kế: dùng skill `new-template`.
- Làm việc trên `main`. Sau mỗi lần push `main`, luôn đồng bộ sang nhánh `claude/commit-folder-to-repo-lnvcke` (merge `main` vào rồi push).

Về `ZMP_TOKEN` trong `my-wed/.env` (chủ repo đã nói rõ):
- Đây là token **developer, cố định và vĩnh viễn** của chủ repo. Nó **không liên quan đến `zmp login`** và không hết hạn theo phiên.

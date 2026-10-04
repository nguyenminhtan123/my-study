# visual-check

Chụp ảnh giao diện mini app ở 390px rồi so từng điểm ảnh, để chắc chắn một thay đổi không làm hỏng mẫu hiện có.

```
cd my-wed && zmp start -nF -P 3100          # chạy dev server (terminal khác)
NODE_PATH=<nơi có playwright> node tools/visual-check/shot.js http://127.0.0.1:3100/ /tmp/before   # chụp bản trước khi sửa
# ...sửa code...
NODE_PATH=<nơi có playwright> node tools/visual-check/shot.js http://127.0.0.1:3100/ /tmp/after
NODE_PATH=<nơi có playwright> node tools/visual-check/cmp.js /tmp/before /tmp/after
```

- Dev server `zmp start -nF` mới render được ngoài Zalo; bản `zmp build` mở thẳng thì trang trắng.
- Chụp lại bản "before" từ commit trước khi sửa (ví dụ `git stash` hoặc checkout commit cũ).
- Đồng hồ trang được cố định, tim rơi bị ẩn và animation lặp được dừng ở khung đầu để ảnh ổn định. Chênh lệch dưới khoảng 100 điểm ảnh ở một vùng nhỏ là nhiễu; lớn hơn là thay đổi thật.
- Ảnh tham chiếu mẫu 1 hiện tại = commit `5cb9fdb` (trước khi tái cấu trúc). Sau tái cấu trúc: 10/10 ảnh giống hệt.

# Sổ tay thiết kế mẫu thiệp

Rút ra từ việc phân tích 15 mẫu thiệp online bán chạy (10/2026): bố cục từng màn hình, cách sắp xếp
từng phần, tỉ lệ màu đo bằng `scripts/design/palette.py`. Dùng cho skill `new-template` (bước 1 và 4).

## 1. Điều quan trọng nhất

Mẫu bán chạy **giống nhau khoảng 70%** (thứ tự và cách xếp phần thông tin ở giữa thiệp) và
**khác nhau khoảng 30%**, nhưng 30% đó nằm đúng chỗ đập vào mắt. Mỗi mẫu là **một câu chuyện**
(lâu đài châu Âu, dải lụa, vườn kính, men sứ...) được kể qua **5 lớp áo**:

| Lớp | Nội dung | Ví dụ |
|---|---|---|
| 1. Màn hình đầu | Thứ người xem thấy đầu tiên, chiếm trọn màn hình | Tranh phong cảnh chiếm nửa màn hình và tên in hoa đè lên; ảnh trong khung vàng chạm trổ kèm hoa; tên viết tay vàng trên nền đỏ thẫm; 2 ảnh polaroid nghiêng có dải lụa cắt ngang |
| 2. Khung trang trí | Vỏ bọc các phần thông tin (thông tin bên trong giống nhau) | Thanh tiêu đề màu kéo hết chiều ngang; hoa văn vàng kẹp hai bên dòng ngày tháng; viền vàng chạy dọc trang; khung hoa văn ôm lịch; mảng màu đỉnh vòm; tấm kính mờ trên nền hoa |
| 3. Nền | Lớp dưới cùng | Giấy kem có vân; họa tiết kín hai bên mép; nền tối có vân; tranh in mờ sau chữ (~20%) |
| 4. Tranh ở 3 vị trí cố định | **Đường chia giữa các phần, hộp quà, chân trang**, cùng chủ đề | Hộp quà đỏ in 囍; phong bì in phong cảnh; hàng rào vườn làm đường chia; hồ nước ở chân trang |
| 5. Kiểu album | Cách bày ảnh | Thẻ xếp chồng vuốt ngang; lưới 2×2 có ô "+N"; polaroid; vòm + lưới |

Phần mở đầu (cửa mở, phong bì, rèm...) là **điểm riêng của mình**, mẫu bán chạy chỉ có một thẻ
"Mở thiệp" giống nhau. Giữ và phát triển phần này.

## 2. Năm nhóm thiết kế

Mỗi mẫu mới chọn 1 nhóm, rồi 1 câu chuyện trong nhóm.

| Nhóm | Đặc trưng | Phối màu | Gợi ý câu chuyện của mình |
|---|---|---|---|
| **A. Truyền thống nền sáng** | Giấy kem, chữ đỏ, thanh tiêu đề màu, 囍/mây/hoa văn Á Đông, ảnh hoặc tranh nhân vật | Kem 70–80%, đỏ trầm 15–20%, vàng 5% | Song Hỷ đỏ son, Trầu cau, Sen hồng, Đèn lồng Hội An, Gốm men lam Bát Tràng |
| **B. Tranh phong cảnh** | Phong cảnh màu nước ở màn hình đầu và chân trang, khung hoa văn mảnh | Trắng/kem 70%, màu phong cảnh 20%, 1 màu nhấn | Đà Lạt sương (đồi thông, nhà gỗ), Phố cổ Hội An, Ruộng bậc thang mùa lúa chín, Vịnh biển, Châu Âu cổ |
| **C. Hoa lá tràn mép** | Hoa lá to, lệch một bên, cắt ở mép màn hình; tranh hoa in mờ sau chữ hoặc họa tiết kín hai bên | Trắng/kem 75%, màu hoa 15–20% | Mẫu đơn hồng, Hoa sứ trắng, Cẩm tú cầu, Lá bạch đàn, Hoa rum, Cúc họa mi |
| **D. Nền tối ánh kim** | Nền đậm có vân, chữ kem/vàng, viền vàng chạy dọc, hoa văn chạm trổ | Màu đậm 80–90%, kem/vàng 10–15% | Gấm đỏ nhũ vàng, Lục bảo ánh kim, Đêm sao xanh navy, Nhung đen vàng |
| **E. Mảng màu** | Các khối màu lớn bo vòm xen nền sáng, rất ít trang trí | Màu khối 30–40%, nền sáng 55–65% | Vòm sage, Gạch nung terracotta, Pastel xanh khói |

## 3. Quy tắc phối màu (đo trên mẫu tham chiếu)

- **Một màu nền chiếm 65–90%** (nhóm E: 30–50% vì có mảng màu). Màu chính 10–20%, màu nhấn ≤ 10%.
- **Màu chính là màu trầm, đã pha xám**: độ bão hòa đo được ở mẫu tham chiếu 0,14–0,30. Ví dụ đỏ hồng đất `#c89c96`, xanh rêu `#abae95`, xanh xám `#89a2a7`. Không dùng màu tươi chói.
- **Chữ mang màu chính** (đỏ đô, xanh rêu, nâu), không dùng chữ đen.
- **Nền không bao giờ phẳng**: vân giấy, lớp màu nước mờ, hoặc họa tiết. Màu kem dao động nhẹ (`#fff7eb` ↔ `#fffdf9`).
- Nền tối: không dùng đen tuyền; dùng đỏ thẫm `#3a0505`, xanh rêu `#23381e`... có vân và tối dần ở góc.

## 4. Quy tắc chữ

- **Toàn bộ là chữ có chân (serif)** như thiệp in: tên, tiêu đề, địa chỉ, ngày tháng. Chữ không chân chỉ dùng cho nhãn rất nhỏ (nếu có).
- **Chênh lệch cỡ chữ lớn**: tên 44–52px nét mảnh; nhãn ("TRƯỞNG NAM", "THÔNG TIN LỄ CƯỚI") 10–11px, in hoa, giãn chữ 0,25–0,35em.
- Chữ viết tay (script) chỉ dùng cho **một** thứ: tên, hoặc tiêu đề phần. Không dùng cả hai.
- Dòng ngày tháng: `THỨ BẢY | 19 | THÁNG 12` với 2 vạch dọc mảnh, số ngày to gấp 3 chữ hai bên.

## 5. Trang trí và ảnh

- **Một họa tiết chủ đạo lặp ít nhất 3 lần**: màn hình đầu, đường chia, chân trang (hoặc hộp quà).
- Trang trí **to, lệch một bên, tràn khỏi mép** ít nhất 2 chỗ. Tránh họa tiết nhỏ đặt giữa ở mọi phần.
- **Không có ô viền kiểu giao diện app** (ô viền, nút viền, chip). Thông tin chỉ là chữ căn giữa với vài đường kẻ mảnh. Viền chỉ dùng khi là khung trang trí thật. Riêng form xác nhận tham dự được có ô nhập.
- **Ảnh như vật thật**: viền trắng, bóng mềm, nghiêng 2–8°, hoặc nằm trong khung (vòm, tròn, khung chạm trổ).

## 6. Nguồn tranh minh họa (theo thứ tự ưu tiên)

1. **Tự vẽ bằng code** (SVG/CSS): chữ 囍, mây, lá bạch đàn, đường viền, hoa văn hình học, vân giấy (`numpy` sinh ảnh nền lặp).
2. **Tranh cổ điển hết bản quyền** (public domain, ví dụ tranh thực vật màu nước thế kỷ 18–19 trên Wikimedia Commons): ghi nguồn vào `docs/CREDITS.md`.
3. **AI tạo ảnh** khi đã có tài khoản (chủ repo cung cấp mã, không lưu vào repo).

Không dùng ảnh tải trên mạng không rõ bản quyền. Không đưa ảnh khách vào repo.

## 7. Thứ tự nội dung (đủ tính năng, không đổi)

Mở đầu → Màn hình đầu → Hai họ và tên → Lời mời (tên khách) → Ngày giờ + âm lịch → Địa điểm + chỉ đường
→ Album → Lịch tháng + đếm ngược → Lịch trình → Xác nhận tham dự → Quà mừng → Lời cảm ơn.
Màn hình đầu, khung trang trí và kiểu album làm tự do theo câu chuyện.

## 8. Bảng chấm 10 tiêu chí (bước 4 của skill)

| # | Tiêu chí | Cách kiểm |
|---|---|---|
| 1 | Màn hình đầu có tranh hoặc ảnh chiếm ≥ 50% màn hình | Ảnh chụp màn hình |
| 2 | Màu nền chiếm 65–90% (nhóm E 30–50%) | `palette.py` |
| 3 | Màu chính trầm: bão hòa ≤ 0,45 | `palette.py` |
| 4 | Nền không phẳng: độ dao động ≥ 1,5 | `palette.py` |
| 5 | Chữ: tên ≥ 44px, nhãn ≤ 11px giãn chữ ≥ 0,25em, nội dung serif | Đọc CSS |
| 6 | Một họa tiết chủ đạo lặp ≥ 3 lần | Ảnh chụp màn hình |
| 7 | ≥ 2 chỗ trang trí lệch một bên hoặc tràn mép | Ảnh chụp màn hình |
| 8 | Không có ô viền kiểu app (trừ form xác nhận) | Ảnh chụp màn hình |
| 9 | Ảnh có viền, bóng, nghiêng hoặc khung | Ảnh chụp màn hình |
| 10 | Đường chia, hộp quà, chân trang có tranh đúng chủ đề | Ảnh chụp màn hình |

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

## 3. Quy tắc phối màu (mặc định, đo trên mẫu tham chiếu)

Đây là mặc định cho các chất liệu trang nhã. Chất liệu nào có quy tắc riêng thì theo bảng ở mục 9 (ví dụ tranh Đông Hồ, hoạt hình dùng màu tươi; sơn mài dùng nền đen).


- **Một màu nền chiếm 65–90%** (nhóm E: 30–50% vì có mảng màu). Màu chính 10–20%, màu nhấn ≤ 10%.
- **Màu chính là màu trầm, đã pha xám**: độ bão hòa đo được ở mẫu tham chiếu 0,14–0,30. Ví dụ đỏ hồng đất `#c89c96`, xanh rêu `#abae95`, xanh xám `#89a2a7`. Không dùng màu tươi chói.
- **Chữ mang màu chính** (đỏ đô, xanh rêu, nâu), không dùng chữ đen.
- **Nền không bao giờ phẳng**: vân giấy, lớp màu nước mờ, hoặc họa tiết. Màu kem dao động nhẹ (`#fff7eb` ↔ `#fffdf9`).
- Nền tối: không dùng đen tuyền; dùng đỏ thẫm `#3a0505`, xanh rêu `#23381e`... có vân và tối dần ở góc.

## 4. Quy tắc chữ (mặc định)

Cặp chữ thay đổi theo chất liệu (mục 9). Giữ ở mọi mẫu: chênh lệch cỡ chữ lớn giữa tên và nhãn, tối đa 2 họ chữ + 1 chữ viết tay.


- **Toàn bộ là chữ có chân (serif)** như thiệp in: tên, tiêu đề, địa chỉ, ngày tháng. Chữ không chân chỉ dùng cho nhãn rất nhỏ (nếu có).
- **Chênh lệch cỡ chữ lớn**: tên 44–52px nét mảnh; nhãn ("TRƯỞNG NAM", "THÔNG TIN LỄ CƯỚI") 10–11px, in hoa, giãn chữ 0,25–0,35em.
- Chữ viết tay (script) chỉ dùng cho **một** thứ: tên, hoặc tiêu đề phần. Không dùng cả hai.
- Dòng ngày tháng: `THỨ BẢY | 19 | THÁNG 12` với 2 vạch dọc mảnh, số ngày to gấp 3 chữ hai bên.

## 5. Trang trí và ảnh

- **Một họa tiết chủ đạo lặp ít nhất 3 lần**: màn hình đầu, đường chia, chân trang (hoặc hộp quà).
- Trang trí **to, lệch một bên, tràn khỏi mép** ít nhất 2 chỗ. Tránh họa tiết nhỏ đặt giữa ở mọi phần.
- **Không có ô viền kiểu giao diện app** (ô viền, nút viền, chip). Thông tin chỉ là chữ căn giữa với vài đường kẻ mảnh. Viền chỉ dùng khi là khung trang trí thật. Riêng form xác nhận tham dự được có ô nhập.
- **Ảnh có cách xử lý riêng của mẫu** (chọn ở mục 9), không để ảnh vuông trơn.

## 6. Tranh minh họa (đúng với mọi chất liệu)

- **Một mẫu chỉ một chất liệu.** Ảnh chụp cắt nền, tranh màu nước và hình vector đặt chung sẽ lạc quẻ. Cả bộ tranh phải trông như một họa sĩ vẽ.
- **Bộ tranh trước, bố cục sau.** Vẽ trọn bộ (tranh màn hình đầu, góc, đường chia, món quà, chân trang, vật mở đầu) rồi chủ repo duyệt bảng tranh, sau đó mới bố cục.
- **Cách tạo:** AI vẽ cùng một câu lệnh phong cách (`scripts/design/ai_art.py`, FLUX.2 klein, Apache 2.0, dùng thương mại được). Không dùng ảnh từ các kho PNG chỉ cho phi thương mại (PNGWing, CleanPNG...).
- **Tranh luôn có nền trong suốt** (WebP có kênh alpha). `ai_art.py` tự chuyển giấy trắng thành trong suốt, lớp màu nước thành bán trong suốt, nên tranh nằm trên mọi nền như vẽ trên cùng tờ giấy, không có khung trắng, không có mép cắt. **Không dùng `mix-blend-mode: multiply`**: Zalo trên iPhone không hỗ trợ đúng, lộ nền trắng (lỗi đã gặp ở mẫu 28).
- Tranh vẽ tràn ra một mép thì mép đó luôn nằm ngoài màn hình (không để lộ đường cắt thẳng).
- **Một kiểu ảnh cho mọi ảnh trong một mẫu** (chọn từ mục 9 cho hợp chất liệu). Không trộn nhiều kiểu khung trong cùng một thiệp; đa dạng bằng kích thước và cách xếp.
- Tranh vẽ trên nền tối (sơn mài, nhũ vàng): tạo với `--paper dark`, nền đen thành trong suốt.
- Tranh nền phủ kín cả một phần (cảnh rộng làm nền) được để nguyên, không cần trong suốt.
- Nền giấy sinh bằng `scripts/design/paper.py`; ghi nguồn tranh vào `docs/CREDITS.md`.

## 7. Thứ tự nội dung (đủ tính năng, không đổi)

Mở đầu → Màn hình đầu → Hai họ và tên → Lời mời (tên khách) → Ngày giờ + âm lịch → Địa điểm + chỉ đường
→ Album → Lịch tháng + đếm ngược → Lịch trình → Xác nhận tham dự → Quà mừng → Lời cảm ơn.
Màn hình đầu, khung trang trí và kiểu album làm tự do theo câu chuyện.

## 8. Bảng chấm tiêu chí (bước 3 và 5 của skill)

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
| 11 | Một chất liệu tranh, một kiểu ảnh, không lộ mép cắt | Ảnh chụp màn hình |

## 9. Thực đơn đa dạng: mỗi mẫu chọn theo câu chuyện

Mỗi mẫu chọn **một phương án cho mỗi mặt** dưới đây, sao cho hợp câu chuyện. Trong một mẫu mọi thứ đồng bộ; giữa các mẫu phải khác nhau: **mẫu mới khác mọi mẫu trong `docs/templates-register.md` ở ít nhất 4 trong 7 mặt** (chất liệu, khung ảnh, mở đầu, bố cục, chữ, nền, màu chính).

### 9.1 Chất liệu tranh (kèm câu lệnh phong cách mở đầu cho `ai_art.py`)

| Chất liệu | Hợp với | Câu lệnh phong cách (STYLE) | Ghi chú |
|---|---|---|---|
| Màu nước | Hoa, vườn, phố cổ, biển | `Delicate hand-painted watercolor on cream paper, soft washes, fine sepia ink outlines` | Đã dùng ở t28 |
| Thủy mặc / tranh lụa Á Đông | Sen, trúc, hạc, núi sông | `Traditional East Asian ink wash painting on silk, sumi brush strokes, sparse composition, light colour accents` | Nhiều khoảng trống |
| Cắt giấy | Song Hỷ, Tết, truyền thống | `Intricate red paper-cut art, layered papercraft, crisp edges, subtle drop shadows, on white paper` | Khối đỏ phẳng, đổ bóng nhẹ |
| Tranh Đông Hồ / khắc gỗ dân gian | Vui, Việt Nam, đám cưới quê | `Vietnamese Dong Ho folk woodblock print, bold black outlines, flat natural pigments, rice paper texture` | Màu tươi được phép |
| Sơn mài / khảm vàng nền tối | Sang trọng, Long Phụng | `Vietnamese lacquer painting, gold leaf and eggshell inlay, rich vermilion and gold, on pure black background` | Dùng `--paper dark` |
| Khắc đồng cổ điển châu Âu | Baroque, lâu đài, hoàng gia | `Fine vintage copperplate engraving, cross-hatching, sepia ink on ivory paper, ornate` | Đơn sắc + 1 màu nhấn |
| Gốm men lam | Thanh lịch, Huế, Bát Tràng | `Blue and white porcelain painting, cobalt brush strokes on white glaze, traditional Vietnamese motifs` | Hai màu xanh trắng |
| Nét vẽ tối giản | Hiện đại, tối giản | `Minimal single-line drawing, thin uniform strokes, one accent colour, lots of white space` | Hợp nhóm E |
| Sơn dầu / tranh cổ điển | Lãng mạn, châu Âu | `Classical oil painting, soft impasto, warm glazes, museum quality` | Hợp làm cảnh nền phủ kín |
| Hoạt hình / chibi | Trẻ trung, vui | `Cute chibi illustration, clean outlines, soft cel shading, pastel palette` | Vẽ người: giữ nhân vật nhất quán khó, cần duyệt kỹ |

### 9.2 Khung ảnh (một kiểu cho mọi ảnh trong mẫu)

| Kiểu | Hợp chất liệu |
|---|---|
| Viền loang màu nước (mặt nạ vẽ cùng nét) | Màu nước, thủy mặc |
| Khung cắt giấy (viền răng cưa/hoa văn cắt) | Cắt giấy |
| Khung vòm kiến trúc viền mảnh | Khắc đồng, gốm, tối giản |
| Khung tròn nguyệt môn | Thủy mặc, sơn mài |
| Đĩa gốm (ảnh trong lòng đĩa men lam) | Gốm men lam |
| Khung sơn mài viền vàng | Sơn mài |
| Tem bưu chính răng cưa | Tối giản, hoạt hình |
| Polaroid kẹp dây | Hoạt hình, trẻ trung |
| Ảnh tràn viền, phủ lớp màu, chữ đè lên | Nhóm D, sơn dầu |
| Khung tranh mạ vàng chạm trổ | Khắc đồng, sơn dầu |

### 9.3 Mở đầu (ưu tiên kiểu chưa mẫu nào dùng)

Cửa gỗ mở (t26) · phong bì polaroid (t27) · quạt xoè (t28) · rèm lụa kéo · cuộn thư mở dọc · lật trang sách · mở nắp hộp quà / khay trầu · bật sáng đèn lồng · cánh hoa sen nở · ô cửa sổ mở · tấm voan vén lên · bóc tem niêm phong.

### 9.4 Bố cục

| Kiểu | Mô tả |
|---|---|
| Một cột căn giữa | Cổ điển, mọi chất liệu |
| Tạp chí so le | Ảnh và chữ lệch trái phải xen kẽ |
| Mảng sáng tối xen kẽ | Phần nền đậm xen phần nền sáng (nhóm D, E) |
| Cuộn thư dài | Cả thiệp như một cuộn giấy, viền hai bên |
| Thẻ chồng | Mỗi phần là một tấm thẻ/tấm giấy đặt chồng |
| Đường dẫn | Một đường cong/dòng sông nối các phần |

### 9.5 Chữ (cặp chữ đã cài sẵn)

| Cặp | Hợp |
|---|---|
| Cormorant Garamond + Great Vibes | Cổ điển, màu nước (t28) |
| Playfair Display + Allura | Sang trọng, sơn mài, khắc đồng |
| Lora + Dancing Script | Ấm áp, Đông Hồ, hoạt hình |
| Fahkwang + Be Vietnam Pro | Hiện đại, tối giản |
| Cormorant Garamond + Ephesis | Thanh nhã, thủy mặc, gốm |
| Be Vietnam Pro + Mea Culpa | Tối giản trẻ trung |

### 9.6 Nền

Giấy kem có vân (`paper.py`) · lụa có vân dệt · nền đen sơn mài có ánh · men gốm trắng ngà · giấy dó thô · khối màu phẳng (nhóm E) · cảnh vẽ phủ kín làm nền từng phần.

## 10. Tự kiểm trước khi gửi (rút ra từ 5 vòng sửa mockup của mẫu 28)

Trước khi gửi **bảng tranh** hoặc **mockup**, tự soát đủ danh sách này. Mỗi dòng là một lỗi chủ repo đã phải chỉ ra:

- [ ] Cả bộ tranh cùng một chất liệu, không có ảnh chụp cắt nền lẫn vào.
- [ ] Mọi tranh nền trong suốt, không thấy khung trắng hay mép giấy trên nền trang.
- [ ] Tranh vẽ tràn mép nào thì mép đó nằm ngoài màn hình; không có đường cắt thẳng nào lộ ra.
- [ ] Mọi ảnh dùng **một** kiểu khung; album trông như một bộ (chỉ khác kích thước, cách xếp).
- [ ] Ảnh trong khung không bị mất đầu, không co nhỏ giữa khoảng trống (mặt nạ cắt sát).
- [ ] Tranh góc nhìn thấy rõ (không lọt hết ra ngoài) và không đè lên chữ.
- [ ] Không có chữ tiếng Anh lọt vào (lịch của `_kit` in tên tháng tiếng Anh: ẩn `.k-cal-month`, tự viết "Tháng 12 · 2026").
- [ ] Tên dài không xuống dòng xấu (thử tên 2–3 chữ, họ tên cha mẹ dài).
- [ ] Đo `palette.py`: nền, độ bão hoà đúng mục tiêu của bản thiết kế.

## 11. Chạy được trong Zalo (iOS và Android)

Mini app chạy trong WebView của Zalo, không phải Chrome mới nhất. Tránh những thứ đã gây lỗi hoặc dễ gây lỗi:

- **Không `mix-blend-mode`** (iOS hiện nền trắng). Tranh dùng WebP trong suốt.
- **Không `:has()`**: WebView Android cũ không hiểu, dùng class thay thế.
- `mask-image` luôn viết kèm `-webkit-mask-image`.
- Hạn chế `backdrop-filter` (nặng, có máy không hỗ trợ); `text-wrap: balance` chỉ là trang trí thêm, không được để bố cục phụ thuộc vào nó.
- Ảnh tĩnh: WebP cho tranh trong suốt, JPEG cho ảnh/nền; mỗi file nên dưới khoảng 300 KB.
- Phần mở đầu là lớp phủ `position: fixed` phải tự biến mất sau khi mở (không chặn cuộn).

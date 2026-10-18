# Admin thiệp cưới

Web quản lý thiệp (chỉ chủ shop dùng): đăng nhập, tạo/sửa thiệp, tải ảnh, tạo link theo tên khách mời,
xem xác nhận tham dự và lời chúc, xuất Excel cho cô dâu chú rể.

## Chạy trên máy
```
cd admin
npm install
# tạo admin/.env.local (giống my-wed/.env.local):
#   VITE_SUPABASE_URL=https://xxxx.supabase.co
#   VITE_SUPABASE_ANON_KEY=eyJ...
npm run dev
```

## Deploy lên Vercel

Đã deploy: **https://thiep-cuoi-admin.vercel.app** (project `thiep-cuoi-admin`, Root Directory `admin`).
`.vercelignore` ở gốc repo giới hạn file gửi lên (chỉ `admin/` và ảnh thumbnail mẫu).

Cách tạo lại từ đầu:
1. vercel.com → **Add New → Project** → chọn repo `my-study`.
2. **Root Directory**: `admin` (Framework tự nhận là Vite).
3. **Environment Variables**: thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` (lấy trong `my-wed/.env.local`).
4. **Deploy**. Mỗi lần push lên `main` Vercel tự deploy lại.

Đăng nhập bằng tài khoản admin trong Supabase (Authentication → Users). Muốn thêm người quản lý:
tạo user rồi chạy `insert into public.admins (user_id) select id from auth.users where email = '...';`

Ảnh mẫu thiệp (thumbnail) được đọc từ `my-wed/src/static/thumbs`; danh sách mẫu và các ô ảnh của
từng mẫu nằm ở `src/catalog.ts` (thêm mẫu mới thì cập nhật file này).

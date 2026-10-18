# Cài Supabase cho thiệp thật

1. Tạo project ở https://supabase.com (Region: Southeast Asia (Singapore)).
2. **SQL Editor → New query**: dán toàn bộ `schema.sql` → **Run**.
3. **Authentication → Users → Add user**: tạo tài khoản admin (email + mật khẩu) cho chủ shop.
4. Chạy thêm trong SQL Editor (thay email):
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'EMAIL_CUA_BAN';
   ```
5. **Authentication → Sign In / Providers**: tắt "Allow new users to sign up" để không ai tự đăng ký được.
6. **Project Settings → API**: lấy `Project URL` và `anon public` key, ghi vào `my-wed/.env.local` (file này không lên git):
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
   Không bao giờ dùng `service_role` key trong app hay trong repo.

Link thiệp: `https://zalo.me/s/<APP_ID>/?thiep=<mã thiệp>&khach=<tên khách>`.

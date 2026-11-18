# KEOZ — Next.js + Supabase

Website thương mại điện tử KEOZ, viết lại từ giao diện Wix thành **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, dữ liệu trên **Supabase**. Deploy đích: **Vercel**.

- Production: **https://keoz.vercel.app** (team Vercel `cmcu1`)
- GitHub: **https://github.com/xoaixoai06/keoz**
- Báo cáo audit bảo mật: `C:\Users\Admin\security-audit-skill\keoz\run-1\REPORT.md`

> Đây là bản demo/portfolio: không có thanh toán thật, không có đăng nhập bắt buộc.
> Khi chưa cấu hình Supabase, site tự chạy bằng dữ liệu seed trong `lib/seed.ts`.

---

## 1. Chạy local

```powershell
npm install
npm run dev
```

Mở http://localhost:3000

Build production:

```powershell
npm run build
npm run start
```

### Biến môi trường

Sao chép `.env.example` thành `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Bỏ trống hai biến Supabase → site chạy ở chế độ demo:

- Sản phẩm lấy từ `lib/seed.ts`
- Đơn hàng trả về mã demo, không lưu database
- Newsletter báo thành công nhưng không ghi
- Trang tài khoản hiển thị thông báo chưa cấu hình

---

## 2. Cấu trúc

```text
app/
├─ layout.tsx              Font, header, footer, CartProvider
├─ page.tsx                Trang chủ (hero, sản phẩm, bộ sưu tập, film, try-on)
├─ products/               Danh sách + chi tiết sản phẩm
├─ collections/[slug]/     3 bộ sưu tập
├─ try-on/                 Thử kính bằng camera (getUserMedia)
├─ cart/                   Giỏ hàng (localStorage)
├─ checkout/               Form đặt hàng → server action
├─ account/                Đăng nhập / đăng ký Supabase Auth
├─ my-orders/              Đơn của khách (RLS theo email)
├─ about/                  Câu chuyện thương hiệu
├─ privacy/                Chính sách + điều khoản
├─ sitemap.ts, robots.ts
components/
├─ site-header.tsx         Nav đỏ, logo, marquee, menu mobile
├─ site-footer.tsx         Newsletter + link
├─ product-card.tsx        Card hover đổi ảnh
├─ product-gallery.tsx     Gallery + thumbnail
├─ add-to-cart.tsx         Chọn số lượng
├─ cart/cart-provider.tsx  Context + localStorage
├─ cart/cart-view.tsx
├─ checkout-form.tsx
├─ try-on-demo.tsx         Camera + overlay kính
├─ account-panel.tsx
├─ orders-list.tsx
lib/
├─ types.ts, seed.ts, products.ts    Dữ liệu & truy vấn
├─ supabase.ts                       Client phía server (anon key)
├─ supabase-browser.ts               Client phía browser (auth session)
├─ actions.ts                        Server actions: đặt hàng, newsletter
└─ format.ts                         formatPrice, cn
supabase/schema.sql        Bảng, RLS, seed — chạy trong SQL Editor
public/images|videos|fonts|brand
```

### Bảng dữ liệu

| Bảng | Mục đích | RLS |
|---|---|---|
| `categories` | 3 bộ sưu tập | Đọc công khai |
| `products` | 6 sản phẩm, `is_active` | Đọc công khai |
| `orders` | Đơn hàng | Ai cũng tạo được; chỉ đọc đơn của mình (theo email JWT) |
| `order_items` | Dòng đơn | Tạo được; đọc theo đơn thuộc về mình |
| `newsletter_subscribers` | Email | Chỉ insert |

Chạy `supabase/schema.sql` **một lần** trong Supabase Dashboard → SQL Editor. File idempotent, chạy lại an toàn.

---

## 3. Luồng chính

1. **Giỏ hàng** — `CartProvider` giữ state trong React, đồng bộ `localStorage` key `keoz.cart.v1`. Không cần đăng nhập.
2. **Đặt hàng** — `/checkout` gửi `placeOrder` (server action): validate bằng Zod, đọc lại giá từ database/seed (không tin giá client), tạo `orders` + `order_items`, trả mã `KEOZ-XXXXXX`. Thành công thì xoá giỏ.
3. **Newsletter** — `subscribe` insert email; trùng email (mã 23505) vẫn coi là thành công.
4. **Thử kính** — `getUserMedia` + overlay ảnh, kéo thả và chỉnh kích thước. Không upload gì lên server.
5. **Tài khoản** — Supabase Auth email/password; `/my-orders` đọc `orders` qua RLS.

---

## 4. Thiết kế

- Đỏ KEOZ `#930500`, nền giấy `#FBF9F5`, mực `#131110`.
- Font local: **Wix Madefor Display** (heading, `font-display`) và **Wix Madefor Text** (body), file trong `public/fonts`, khai báo bằng `next/font/local` trong `app/layout.tsx`.
- Logo là ảnh `public/brand/keoz-logo.png` (serif trắng).
- Ảnh sản phẩm: `public/images/products/00X-1..3.jpg` (Wix CDN, đã tải về).
- Ảnh editorial: `public/images/editorial/*.jpg`; video: `public/videos/keoz-film.mp4`.
- Nội dung tiếng Việt, đường dẫn tiếng Anh, lowercase, gạch ngang.
- Responsive: mobile 1 cột, `lg` 3 cột; nav chuyển thành menu overlay.

---

## 5. Deploy Vercel

1. Push repo lên GitHub.
2. Vercel → Add New Project → import repo.
3. Framework Preset: **Next.js** (tự nhận). Build: `npm run build`, Output: mặc định.
4. Thêm Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = domain Vercel
5. Deploy. Sau khi có domain, cập nhật `NEXT_PUBLIC_SITE_URL` và redeploy để sitemap/OG đúng.

Không có Supabase vẫn deploy được (chế độ demo), sau đó thêm biến và redeploy.

### Lưu ý Supabase

- Chạy `supabase/schema.sql` trước khi deploy để bảng tồn tại.
- Nếu bật xác nhận email, thêm domain Vercel vào Authentication → URL Configuration → Redirect URLs.
- Không đưa `service_role` key vào client hay repo.

---

## 6. Lệnh thường dùng

```powershell
npm run dev      # dev server
npm run build    # build production
npm run start    # chạy bản build
```

Kiểm tra kiểu:

```powershell
npx tsc --noEmit
```

---

## 7. Ghi chú

- `template/`, `source-live/`, `keoz-site/`, `tools/` là bản chụp Wix cũ, **đã nằm trong `.gitignore`**, chỉ dùng tham khảo cục bộ.
- Không thêm thư viện UI nặng; icon dùng `lucide-react`.
- Mọi truy vấn database đi qua `lib/products.ts`; thêm bảng mới thì cập nhật cả `supabase/schema.sql` và type tương ứng.

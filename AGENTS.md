# AGENTS.md — KEOZ Next.js + Supabase

> Bàn giao cho model/agent tiếp theo. **Đọc file này trước khi sửa bất cứ thứ gì.**
> Cập nhật: 19/11/2026 — chuyển từ static site sang Next.js + Supabase.

## 1. Mục tiêu

Xây lại website KEOZ (gốc Wix: https://nguyenthuylien012.wixsite.com/keoz) thành ứng dụng **Next.js 16 App Router** giữ giao diện và tinh thần thương hiệu, có database **Supabase**, deploy **Vercel**.

- Nội dung tiếng Việt; đường dẫn/thư mục tiếng Anh, lowercase, gạch ngang.
- Là demo/portfolio: không thanh toán thật, không bắt buộc đăng nhập.
- Phải chạy được **không cần** Supabase (fallback seed) để preview tức thì.

## 2. Stack

| Thành phần | Lựa chọn |
|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack build) |
| Ngôn ngữ | TypeScript strict |
| Style | Tailwind CSS v4 (`@theme` trong `app/globals.css`), không plugin |
| DB | Supabase (Postgres + Auth + RLS), `@supabase/supabase-js` |
| Validate | Zod 4 |
| Icon | lucide-react |
| Font | Wix Madefor Display/Text, self-host ở `public/fonts`, `next/font/local` |
| State giỏ | React Context + `localStorage` (`keoz.cart.v1`) |

Không thêm framework/thư viện UI khác nếu không cần.

## 3. Cấu trúc

```text
app/            route, layout, sitemap, robots
components/     UI + client components
lib/            types, seed, truy vấn, supabase client, server actions
supabase/       schema.sql (bảng + RLS + seed)
public/         images/, videos/, fonts/, brand/
template/ source-live/ keoz-site/ tools/   ← bản Wix cũ, đã gitignore
```

Chi tiết từng file: xem `README.md` mục 2.

## 4. Dữ liệu

Bảng: `categories`, `products`, `orders`, `order_items`, `newsletter_subscribers`.

- `lib/seed.ts` là nguồn fallback khi thiếu env; **giữ đồng bộ** với `supabase/schema.sql`.
- `lib/products.ts` là nơi duy nhất đọc sản phẩm/danh mục; có `cache()` của React.
- Ảnh sản phẩm: `public/images/products/00X-1..3.jpg` (001–006).
- Giá là số nguyên VND. Định dạng bằng `formatPrice` trong `lib/format.ts`.
- Sản phẩm hiển thị theo tên 001–006 + tên gọi (Aura, Mirage, Noir, Eclipse, Étoile, Lumen). Slug URL: `aura`, `mirage`, `noir`, `eclipse`, `etoile`, `lumen`.

### RLS

- `categories`, `products`: đọc công khai.
- `orders`, `order_items`: ai cũng **insert** được (server action), chỉ **select** đơn khớp email trong JWT hoặc `user_id`.
- `newsletter_subscribers`: chỉ insert.

Nếu thêm bảng: cập nhật `supabase/schema.sql`, bật RLS, thêm policy, thêm type.

## 5. Luồng quan trọng

- **Đặt hàng** (`lib/actions.ts` → `placeOrder`): Zod validate → đọc lại giá từ DB/seed → insert `orders` rồi `order_items`. Không tin giá từ client. Trả `code` dạng `KEOZ-XXXXXX`. Client xoá giỏ khi `status === "success"`.
- **Newsletter** (`subscribe`): insert email; lỗi `23505` (trùng) coi như thành công.
- **Giỏ hàng**: chỉ client, không gọi server. `hydrated` phải kiểm tra trước khi render số lượng để tránh lệch hydration.
- **Thử kính** (`components/try-on-demo.tsx`): `getUserMedia`, không upload. Overlay ảnh chỉ hiện khi camera bật; kéo thả bằng Pointer Events; dừng stream khi unmount.
- **Auth**: `lib/supabase-browser.ts` cho client, `lib/supabase.ts` cho server. Thiếu env → trả `null`, UI hiện thông báo demo.

## 6. Quy ước

1. Server Component mặc định; chỉ `"use client"` khi cần state/effect/API trình duyệt.
2. Không hardcode màu mới — dùng token `keoz-*` trong `app/globals.css` (`--color-keoz-red` #930500, `-red-dark`, `-cream` #F6F1E8, `-paper` #FBF9F5, `-ink` #131110, `-muted`, `-line`).
3. Heading dùng `font-display`, chữ nhỏ dùng `text-[10px] uppercase tracking-[0.24em]` theo nhịp hiện có.
4. Container chuẩn: `mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10`.
5. Ảnh dùng `next/image` với `sizes`; ảnh hero `priority`.
6. Copy tiếng Việt có dấu, giữ giọng editorial, ngắn gọn.
7. `metadata` cho mọi page; route mới thêm vào `app/sitemap.ts` và `app/robots.ts` nếu cần.
8. Redirect cấu hình trong `next.config.ts` (`/ar-vr` → `/try-on`, `/privacy-policy` → `/privacy`).
9. Không commit `.env.local` hay key Supabase. Chỉ `NEXT_PUBLIC_*` được lộ ra client.
10. Sau khi đổi kiến trúc/quyết định, cập nhật lại file này.

## 7. Môi trường

- Windows, Node v26, npm 11, Git 2.56 (`C:\Program Files\Git\cmd`).
- Repo git tại `D:\Web`, nhánh `main`.
- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build`; chạy: `npm run start`
- Kiểm tra kiểu: `npx tsc --noEmit`

## 8. Trạng thái

Đã xong:

- Toàn bộ 18 route (home, products, 6 chi tiết, 3 collections, cart, checkout, account, my-orders, about, try-on, privacy, 404, sitemap, robots).
- Giỏ hàng localStorage, checkout + server action, newsletter, auth Supabase, thử kính camera.
- `supabase/schema.sql` đầy đủ bảng/RLS/seed.
- Build production sạch, TypeScript sạch.
- QA trực quan desktop + mobile các trang chính.

- [x] Supabase thật: project `tixywqphdpkrqpeihtja`, đã chạy `supabase/schema.sql` (3 category, 6 product, 7 policy).
- [x] Kiểm thử đặt hàng với DB thật: đơn `KEOZ-OLATR4` đã lưu vào `orders` + `order_items`.
- [x] Deploy Vercel team `cmcu1`: production **https://keoz.vercel.app**, `NEXT_PUBLIC_SITE_URL` đã set.
- [x] UI/UX Pro Max skill cài global cho mọi agent; design system tại `design-system/keoz/MASTER.md` (brand token trong `app/globals.css` là nguồn quyết định).

Chưa xong / cần làm khi có điều kiện:

- [ ] Owner xác nhận Supabase Auth **Confirm email** đang bật (xem `C:\Users\Admin\security-audit-skill\keoz\run-1\NEEDS-VALIDATION.md`).
- [ ] Owner kiểm tra Vercel dùng lockfile khi install và key `NEXT_PUBLIC_SUPABASE_ANON_KEY` có role `anon`.
- [ ] Gắn custom domain (nếu có) rồi cập nhật `NEXT_PUBLIC_SITE_URL`.
- [ ] Bổ sung mô hình 3D cho try-on (hiện là overlay 2D).
- [ ] Ảnh sản phẩm có thể nén sang WebP/AVIF nếu cần tối ưu thêm.

## 9. Quyết định đã chốt

- Next.js App Router + TypeScript + Tailwind v4, **không** quay lại static HTML của Wix.
- Supabase là DB chính; fallback seed để không chặn preview.
- Không có backend riêng; mọi ghi dữ liệu đi qua Server Actions.
- Giữ tên sản phẩm 001–006 (dữ liệu gốc), thêm tên gọi cho dễ nhớ.
- Giỏ hàng client-side, không đồng bộ DB (đơn chỉ lưu khi đặt).
- Vercel là đích deploy.

## 10. Lịch sử phiên

- 18/11/2026 — chụp/khảo sát site Wix, build static site (đã bỏ).
- 19/11/2026 — chuyển hướng: init git, `.gitignore` template, scaffold Next.js + Supabase.
- 19/11/2026 — hoàn thiện toàn bộ trang, component, schema; build + QA desktop/mobile.
- 19/11/2026 — đổi nhãn "AR/VR" thành "Thử kính", route `/try-on` (giữ redirect `/ar-vr`).
- 19/11/2026 — deploy Vercel `cmcu1/keoz` → https://keoz.vercel.app; repo GitHub `xoaixoai06/keoz`.
- 19/11/2026 — audit bảo mật quick profile (17 unit, 0 confirmed, 3 needs-validation) tại `C:\Users\Admin\security-audit-skill\keoz\run-1`.
- 19/11/2026 — nâng cấp UI/UX toàn diện (scroll reveal, hover, ken-burns, sheen, progress bar) + vá hardening giỏ/camera/sitemap.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

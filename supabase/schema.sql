-- ==========================================================================
-- KEOZ — Supabase schema
-- Chạy toàn bộ file này trong Supabase Dashboard → SQL Editor → New query.
-- Idempotent: có thể chạy lại mà không làm mất dữ liệu hiện có.
-- ==========================================================================

create extension if not exists "pgcrypto";

-- --------------------------------------------------------------------------
-- 1. Bảng
-- --------------------------------------------------------------------------

create table if not exists public.categories (
  slug         text primary key,
  name         text not null,
  description  text not null default '',
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now()
);

create table if not exists public.products (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  model             text not null,
  name              text not null,
  description       text not null default '',
  price             integer not null check (price >= 0),
  compare_at_price  integer check (compare_at_price >= 0),
  category_slug     text not null references public.categories (slug) on update cascade,
  images            text[] not null default '{}',
  material          text not null default '',
  lens_width        integer,
  weight            integer,
  features          text[] not null default '{}',
  stock             integer not null default 0 check (stock >= 0),
  is_featured       boolean not null default false,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_slug);
create index if not exists products_active_idx   on public.products (is_active);

create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,
  customer_name  text not null,
  email          text not null,
  phone          text not null,
  address        text not null,
  city           text not null,
  note           text,
  subtotal       integer not null check (subtotal >= 0),
  shipping       integer not null default 0 check (shipping >= 0),
  total          integer not null check (total >= 0),
  status         text not null default 'pending'
                 check (status in ('pending', 'confirmed', 'shipping', 'delivered', 'cancelled')),
  user_id        uuid references auth.users (id) on delete set null,
  created_at     timestamptz not null default now()
);

create index if not exists orders_email_idx      on public.orders (lower(email));
create index if not exists orders_created_at_idx on public.orders (created_at desc);

create table if not exists public.order_items (
  id            bigserial primary key,
  order_id      uuid not null references public.orders (id) on delete cascade,
  product_slug  text not null,
  product_name  text not null,
  unit_price    integer not null check (unit_price >= 0),
  quantity      integer not null check (quantity > 0),
  created_at    timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items (order_id);

create table if not exists public.newsletter_subscribers (
  id          bigserial primary key,
  email       text unique not null,
  created_at  timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- 2. Row Level Security
-- --------------------------------------------------------------------------

alter table public.categories             enable row level security;
alter table public.products               enable row level security;
alter table public.orders                 enable row level security;
alter table public.order_items            enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Ai cũng đọc được danh mục và sản phẩm đang bán
drop policy if exists "categories are public" on public.categories;
create policy "categories are public"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "active products are public" on public.products;
create policy "active products are public"
  on public.products for select
  to anon, authenticated
  using (is_active = true);

-- Khách (anon) được tạo đơn hàng, nhưng không đọc được đơn của người khác
drop policy if exists "anyone can create orders" on public.orders;
create policy "anyone can create orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

drop policy if exists "customers read own orders" on public.orders;
create policy "customers read own orders"
  on public.orders for select
  to authenticated
  using (
    lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or user_id = auth.uid()
  );

drop policy if exists "anyone can create order items" on public.order_items;
create policy "anyone can create order items"
  on public.order_items for insert
  to anon, authenticated
  with check (true);

drop policy if exists "customers read own order items" on public.order_items;
create policy "customers read own order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1
      from public.orders o
      where o.id = order_items.order_id
        and (
          lower(o.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
          or o.user_id = auth.uid()
        )
    )
  );

-- Newsletter: chỉ cho phép thêm email mới
drop policy if exists "anyone can subscribe" on public.newsletter_subscribers;
create policy "anyone can subscribe"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

-- --------------------------------------------------------------------------
-- 3. Seed dữ liệu
-- --------------------------------------------------------------------------

insert into public.categories (slug, name, description, sort_order)
values
  ('eyeglasses', 'Gọng Kính',
   'Những đường nét tối giản, nhẹ như không đeo.', 1),
  ('sunglasses', 'Kính Mát',
   'Bảo vệ đôi mắt với chuẩn UV400, phom dáng thời trang.', 2),
  ('special-design', 'Thiết Kế Đặc Biệt',
   'Phiên bản giới hạn, chế tác thủ công cho ánh nhìn khác biệt.', 3)
on conflict (slug) do update
  set name = excluded.name,
      description = excluded.description,
      sort_order = excluded.sort_order;

insert into public.products (
  slug, model, name, description, price, compare_at_price, category_slug,
  images, material, lens_width, weight, features, stock, is_featured
)
values
  (
    'aura', '001', 'Aura',
    'Một đường nét tròn mềm mại, cân bằng giữa cổ điển và hiện đại. Aura được chế tác từ titan siêu nhẹ, ôm trọn khuôn mặt và gần như biến mất khi đeo.',
    1599000, null, 'eyeglasses',
    array['/images/products/001-1.jpg', '/images/products/001-2.jpg', '/images/products/001-3.avif'],
    'Titan siêu nhẹ', 50, 12,
    array[
      'Chất liệu titan bền bỉ, không gỉ',
      'Trọng lượng chỉ 12g',
      'Tròng chống UV400 và chống phản quang',
      'Phù hợp khuôn mặt oval, trái tim'
    ],
    24, true
  ),
  (
    'mirage', '002', 'Mirage',
    'Sự tối giản tuyệt đối. Mirage là phiên bản gọng không viền với đường nét hình học thanh thoát, dành cho những người tin rằng chi tiết nhỏ nhất tạo nên khác biệt lớn nhất.',
    1499000, null, 'eyeglasses',
    array['/images/products/002-1.jpg', '/images/products/002-2.jpg', '/images/products/002-3.jpg'],
    'Titan không viền', 52, 10,
    array[
      'Gọng không viền siêu mảnh',
      'Chất liệu titan cao cấp',
      'Tròng chống UV400',
      'Phù hợp khuôn mặt vuông, chữ nhật'
    ],
    18, true
  ),
  (
    'noir', '003', 'Noir',
    'Phom vuông đậm cá tính, lấy cảm hứng từ những năm 90. Noir được làm từ acetate Ý đánh bóng thủ công, tạo điểm nhấn mạnh mẽ cho mọi gương mặt.',
    1299000, null, 'eyeglasses',
    array['/images/products/003-1.jpg', '/images/products/003-2.jpg', '/images/products/003-3.jpg'],
    'Acetate Ý', 49, 24,
    array[
      'Acetate Ý đánh bóng thủ công',
      'Phom vuông unisex',
      'Tròng chống UV400',
      'Phù hợp khuôn mặt oval, tròn'
    ],
    32, true
  ),
  (
    'eclipse', '004', 'Eclipse',
    'Dáng oval thập niên 90 trở lại với tinh thần đương đại. Eclipse ôm trọn gương mặt, tròng kính tối màu chống UV400 và lớp phủ chống xước bền bỉ.',
    1399000, null, 'sunglasses',
    array['/images/products/004-1.jpg', '/images/products/004-2.jpg', '/images/products/004-3.jpg'],
    'Acetate Ý', 53, 28,
    array[
      'Tròng kính chống UV400',
      'Lớp phủ chống xước',
      'Phom oval thời thượng',
      'Phù hợp khuôn mặt tròn, trái tim'
    ],
    21, true
  ),
  (
    'etoile', '005', 'Étoile',
    'Phiên bản giới hạn với những điểm nhấn pha lê gắn thủ công trên gọng titan. Étoile dành cho người muốn ánh nhìn của mình không giống bất kỳ ai.',
    1399000, 1599000, 'special-design',
    array['/images/products/005-1.jpg', '/images/products/005-2.jpg', '/images/products/005-3.jpg'],
    'Titan & pha lê', 51, 11,
    array[
      'Chi tiết pha lê gắn thủ công',
      'Phiên bản giới hạn',
      'Tròng chống UV400',
      'Phù hợp khuôn mặt oval, trái tim'
    ],
    8, true
  ),
  (
    'lumen', '006', 'Lumen',
    'Thanh thoát đến mức khó nhận ra. Lumen là chiếc gọng không viền mảnh nhất trong bộ sưu tập, dành cho những ai yêu sự nhẹ nhàng và tinh tế.',
    1499000, null, 'eyeglasses',
    array['/images/products/006-1.jpg', '/images/products/006-2.jpg', '/images/products/006-3.jpg'],
    'Thép không gỉ', 54, 9,
    array[
      'Gọng không viền siêu nhẹ',
      'Thép không gỉ bền bỉ',
      'Tròng chống UV400',
      'Phù hợp khuôn mặt vuông, dài'
    ],
    15, false
  )
on conflict (slug) do update
  set model            = excluded.model,
      name             = excluded.name,
      description      = excluded.description,
      price            = excluded.price,
      compare_at_price = excluded.compare_at_price,
      category_slug    = excluded.category_slug,
      images           = excluded.images,
      material         = excluded.material,
      lens_width       = excluded.lens_width,
      weight           = excluded.weight,
      features         = excluded.features,
      stock            = excluded.stock,
      is_featured      = excluded.is_featured,
      is_active        = true;

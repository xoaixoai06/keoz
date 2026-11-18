import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description:
    "Sáu mẫu kính KEOZ: gọng kính titan, kính mát acetate và phiên bản thiết kế giới hạn.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, products, categories] = await Promise.all([
    searchParams,
    getProducts(),
    getCategories(),
  ]);

  const active = categories.find((item) => item.slug === category);
  const filtered = active
    ? products.filter((product) => product.category === active.slug)
    : products;

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-10">
      <header className="border-b border-keoz-line pb-10">
        <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
          KEOZ Eyewear — 2026
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
            Tất cả sản phẩm
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-keoz-muted">
            {filtered.length} thiết kế. Chế tác thủ công, bảo hành 24 tháng, giao
            hàng miễn phí toàn quốc.
          </p>
        </div>
      </header>

      <nav
        aria-label="Lọc theo bộ sưu tập"
        className="hide-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1"
      >
        <FilterLink href="/products" active={!active}>
          Tất cả ({products.length})
        </FilterLink>
        {categories.map((item) => (
          <FilterLink
            key={item.slug}
            href={`/products?category=${item.slug}`}
            active={active?.slug === item.slug}
          >
            {item.name}
          </FilterLink>
        ))}
      </nav>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
        {filtered.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            priority={index < 3}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-sm text-keoz-muted">
          Chưa có sản phẩm trong bộ sưu tập này.
        </p>
      ) : null}
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 border px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] transition-colors",
        active
          ? "border-keoz-red bg-keoz-red text-white"
          : "border-keoz-line text-keoz-ink/70 hover:border-keoz-ink/40 hover:text-keoz-ink",
      )}
    >
      {children}
    </Link>
  );
}

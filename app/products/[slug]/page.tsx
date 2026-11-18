import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BadgeCheck, RefreshCw, Truck } from "lucide-react";
import { getCategories, getProduct, getProducts } from "@/lib/products";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Không tìm thấy sản phẩm" };
  }

  return {
    title: `${product.model} — ${product.name}`,
    description: product.description,
    openGraph: {
      title: `${product.model} — ${product.name} · KEOZ`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, products, categories] = await Promise.all([
    getProduct(slug),
    getProducts(),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  const category = categories.find((item) => item.slug === product.category);
  const related = products
    .filter((candidate) => candidate.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-keoz-muted"
        >
          <Link href="/" className="transition-colors hover:text-keoz-red">
            Trang chủ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/products" className="transition-colors hover:text-keoz-red">
            Sản phẩm
          </Link>
          {category ? (
            <>
              <span aria-hidden="true">/</span>
              <Link
                href={`/collections/${category.slug}`}
                className="transition-colors hover:text-keoz-red"
              >
                {category.name}
              </Link>
            </>
          ) : null}
          <span aria-hidden="true">/</span>
          <span className="text-keoz-ink">{product.model}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductGallery
            images={product.images}
            name={product.name}
            model={product.model}
          />
        </div>

        <div className="lg:py-4">
          <p className="text-[10px] uppercase tracking-[0.32em] text-keoz-muted">
            {product.model} · {category?.name ?? "KEOZ"}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.92] sm:text-6xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-baseline gap-4">
            <p className="text-2xl text-keoz-red">{formatPrice(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-sm text-keoz-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>

          <p className="mt-7 max-w-lg text-sm leading-relaxed text-keoz-muted sm:text-base">
            {product.description}
          </p>

          <AddToCart product={product} />

          <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-keoz-line py-6">
            {[
              { label: "Chất liệu", value: product.material },
              { label: "Tròng", value: `${product.lensWidth} mm` },
              { label: "Trọng lượng", value: `${product.weight} g` },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-[9px] uppercase tracking-[0.22em] text-keoz-muted">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm text-keoz-ink/80">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-keoz-red" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-4 border-t border-keoz-line pt-8">
            <InfoRow
              icon={<Truck className="size-4" />}
              title="Giao hàng miễn phí"
              text="Nội thành Hà Nội 1–2 ngày, toàn quốc 3–5 ngày làm việc."
            />
            <InfoRow
              icon={<RefreshCw className="size-4" />}
              title="Đổi trả 14 ngày"
              text="Đổi mẫu hoặc hoàn tiền nếu kính chưa qua sử dụng."
            />
            <InfoRow
              icon={<BadgeCheck className="size-4" />}
              title="Bảo hành 24 tháng"
              text="Bảo hành khung gọng, miễn phí vệ sinh và cân chỉnh trọn đời."
            />
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <SectionHeading
          eyebrow="Có thể bạn thích"
          title="Cùng tinh thần"
          href="/products"
        />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      <section className="border-t border-keoz-line bg-keoz-cream">
        <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/editorial/studio-model.jpg"
              alt="Người mẫu KEOZ"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-keoz-muted">
              KEOZ Studio
            </p>
            <h2 className="font-display text-3xl leading-[1.02] sm:text-4xl">
              Bạn chưa chắc phom nào hợp?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-keoz-muted">
              Ghé studio ở Hà Nội để được đo và tư vấn miễn phí, hoặc thử trước
              bằng camera AR.
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <Link
                href="/try-on"
                className="group inline-flex items-center gap-2 border-b border-keoz-ink/25 pb-1 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-keoz-red hover:text-keoz-red"
              >
                Thử kính AR
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 border-b border-keoz-ink/25 pb-1 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-keoz-red hover:text-keoz-red"
              >
                Về studio
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-keoz-red">{icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em]">{title}</p>
        <p className="mt-1 text-sm text-keoz-muted">{text}</p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { specialDesignCopy } from "@/lib/wix-copy";

const heroImages: Record<string, string> = {
  eyeglasses: "/images/editorial/hero-model.jpg",
  sunglasses: "/images/products/004-2.jpg",
  "special-design": "/images/wix/editorial-red-glasses.jpg",
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return { title: "Không tìm thấy bộ sưu tập" };
  }

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} · KEOZ`,
      description: category.description,
      images: [{ url: heroImages[category.slug] ?? "/images/editorial/hero-model.jpg" }],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, products, categories] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const others = categories.filter((item) => item.slug !== category.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-keoz-ink">
        <div className="absolute inset-0">
          <Image
            src={heroImages[category.slug] ?? "/images/editorial/hero-model.jpg"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />
        </div>

        <div className="relative mx-auto flex min-h-[46svh] max-w-[1600px] flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:min-h-[56svh] lg:px-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-white/60">
            Bộ sưu tập · {String(products.length).padStart(2, "0")} thiết kế
          </p>
          <h1 className="font-display text-5xl leading-[0.9] text-white sm:text-6xl lg:text-8xl">
            {category.name}
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            {category.description}
          </p>
        </div>
      </section>

      {slug === "special-design" ? (
        <section className="border-b border-keoz-line bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10">
            <h2 className="font-display text-3xl leading-none text-keoz-ink sm:text-4xl">
              {specialDesignCopy.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-keoz-muted sm:text-base">
              {specialDesignCopy.text}
            </p>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 3}
            />
          ))}
        </div>

        {products.length === 0 ? (
          <p className="py-20 text-center text-sm text-keoz-muted">
            Bộ sưu tập đang được cập nhật.
          </p>
        ) : null}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-keoz-line pt-8">
          <p className="text-[10px] uppercase tracking-[0.28em] text-keoz-muted">
            Khám phá thêm
          </p>
          <div className="flex flex-wrap gap-6">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                className="group inline-flex items-center gap-2 border-b border-keoz-ink/25 pb-1 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-keoz-red hover:text-keoz-red"
              >
                {item.name}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

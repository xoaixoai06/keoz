import Image from "next/image";
import Link from "next/link";
import { getCategories, getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { homeCopy } from "@/lib/wix-copy";

const collectionImages: Record<string, string> = {
  eyeglasses: "/images/editorial/hero-model.jpg",
  sunglasses: "/images/products/004-2.jpg",
  "special-design": "/images/editorial/studio-model.jpg",
};

function StudioPanel({
  left,
  right,
  text,
  dark,
  heading,
}: {
  left: string;
  right: string;
  text: string;
  dark: boolean;
  heading?: string;
}) {
  return (
    <section className={dark ? "bg-keoz-ink text-white" : "bg-white text-keoz-ink"}>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e6e1] lg:aspect-auto lg:min-h-[840px]">
          <Image
            src={left}
            alt="Chi tiết gọng kính KEOZ"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
          {heading ? (
            <p className="absolute left-5 top-5 text-[26px] font-semibold leading-tight text-white drop-shadow-sm">
              {heading}
            </p>
          ) : null}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e6e1] lg:aspect-auto lg:min-h-[840px]">
          <Image
            src={right}
            alt="Gọng kính KEOZ trong ánh sáng studio"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0 p-0 sm:flex-row sm:items-end sm:gap-5 sm:p-6 lg:p-8">
            <div className="shrink-0 bg-keoz-red px-6 py-5 font-display text-xl leading-[1.05] text-white sm:text-2xl">
              KEOZ
              <br />
              STUDIO
              <br />
              2026
            </div>
            <p className="max-w-xs bg-white px-6 py-5 text-[15.6px] leading-relaxed text-keoz-red">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  const collections = categories.slice(0, 2);

  return (
    <>
      {/* Hero — image-led, as on the original Wix site */}
      <section className="bg-keoz-paper">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:min-h-[800px] lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#ece9e4] sm:aspect-[16/11] lg:aspect-auto">
            <Image
              src="/images/editorial/hero-model.jpg"
              alt="Người mẫu KEOZ đeo gọng kính titan mảnh"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <h1 className="text-[28px] font-semibold leading-tight text-white sm:text-[36px]">
                {homeCopy.hero}
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center bg-white p-6 sm:p-10 lg:p-14">
            <div className="relative aspect-[2/1] w-full max-w-[640px]">
              <Image
                src="/images/editorial/hero-eyewear-2026.jpg"
                alt="Gọng kính KEOZ màu bạc"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Best seller */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className="flex flex-col gap-3 border-b border-keoz-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[2rem] font-semibold uppercase leading-none text-keoz-red sm:text-[47px]">
              {homeCopy.bestSeller}
            </h2>
            <p className="text-[10px] uppercase tracking-[0.24em] text-keoz-muted">
              {homeCopy.bestSellerNote}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-10 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Studio image panels */}
      {homeCopy.studio.map((panel, index) => (
        <StudioPanel
          key={panel.right}
          {...panel}
          heading={index === 0 ? homeCopy.studioHeading : undefined}
        />
      ))}

      {/* Product specifications from the original Wix copy */}
      <section className="border-b border-keoz-line bg-keoz-paper">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-x-10 gap-y-3 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
          {homeCopy.specs.map((spec) => (
            <p key={spec} className="text-xs uppercase tracking-[0.16em] text-keoz-muted sm:text-sm">
              {spec}
            </p>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
          <h2 className="text-[27px] font-semibold leading-none text-keoz-red">
            {homeCopy.collectionsHeading}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {collections.map((category) => (
              <Link
                key={category.slug}
                href={`/collections/${category.slug}`}
                className="group block overflow-hidden bg-keoz-cream"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e6e1]">
                  <Image
                    src={collectionImages[category.slug] ?? "/images/products/001-1.jpg"}
                    alt={category.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-keoz-line bg-white px-5 py-4">
                  <span className="text-[22px] font-medium text-keoz-red">
                    {homeCopy.collectionLabels[category.slug] ?? category.name}
                  </span>
                  <span className="bg-keoz-red px-5 py-2 text-[10px] uppercase tracking-[0.24em] text-white">
                    {homeCopy.collectionCta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed sunglasses image */}
      <section className="relative aspect-[4/3] overflow-hidden bg-[#e9e6e1] sm:aspect-[21/9]">
        <Image
          src="/images/products/004-2.jpg"
          alt="Kính mát KEOZ"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </section>
    </>
  );
}

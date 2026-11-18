import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Marquee } from "@/components/marquee";

const collectionImages: Record<string, string> = {
  eyeglasses: "/images/editorial/hero-model.jpg",
  sunglasses: "/images/products/004-2.jpg",
  "special-design": "/images/editorial/studio-model.jpg",
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-keoz-ink">
        <div className="grid min-h-[62svh] grid-cols-1 lg:min-h-[68svh] lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-auto">
            <Image
              src="/images/editorial/hero-model.jpg"
              alt="Người mẫu KEOZ đeo gọng kính titan mảnh"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/70">
                Bộ sưu tập 2026
              </p>
              <h1 className="font-display text-4xl leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                Tầm nhìn
                <br />
                vượt thời gian
              </h1>
            </div>
          </div>

          <div className="relative flex flex-col justify-between bg-keoz-paper p-6 sm:p-10 lg:p-14">
            <div className="flex items-start justify-between">
              <p className="text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
                KEOZ Studio — Hà Nội
              </p>
              <Sparkles className="size-4 text-keoz-red" />
            </div>

            <div className="relative mx-auto my-8 w-full max-w-[620px]">
              <Image
                src="/images/editorial/hero-eyewear.jpg"
                alt="Gọng kính KEOZ màu bạc"
                width={952}
                height={474}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-keoz-muted sm:text-base">
                Những đường nét tối giản, chất liệu titan và acetate Ý. Được
                chế tác để trở thành một phần của bạn — không phải phụ kiện.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center gap-3 bg-keoz-red px-7 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
                >
                  Khám phá bộ sưu tập
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/try-on"
                  className="group inline-flex items-center gap-2 border-b border-keoz-ink/25 pb-1 text-[11px] uppercase tracking-[0.24em] text-keoz-ink transition-colors hover:border-keoz-red hover:text-keoz-red"
                >
                  Thử kính
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-keoz-line bg-keoz-cream py-3">
        <Marquee>
          <div className="flex items-center gap-10 pr-10 text-[10px] uppercase tracking-[0.3em] text-keoz-ink/70">
            <span>Titan siêu nhẹ</span>
            <span className="text-keoz-red">✳</span>
            <span>Acetate Ý</span>
            <span className="text-keoz-red">✳</span>
            <span>Tròng chống UV400</span>
            <span className="text-keoz-red">✳</span>
            <span>Bảo hành 24 tháng</span>
            <span className="text-keoz-red">✳</span>
            <span>Miễn phí giao hàng</span>
            <span className="text-keoz-red">✳</span>
          </div>
        </Marquee>
      </div>

      {/* Featured products */}
      <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <SectionHeading
          eyebrow="Sản phẩm nổi bật"
          title="Sáu phom dáng, một tinh thần"
          description="Mỗi mẫu kính là một nghiên cứu về tỷ lệ, trọng lượng và cách ánh sáng đi qua gương mặt."
          href="/products"
        />

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-14 lg:grid-cols-3 lg:gap-x-8">
          {products.slice(0, 6).map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 3}
            />
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="bg-keoz-ink px-4 py-20 text-keoz-cream sm:px-6 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-[10px] uppercase tracking-[0.34em] text-white/45">
            Triết lý thiết kế
          </p>
          <p className="font-display text-3xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl">
            “Một chiếc kính tốt không khiến người ta chú ý đến nó. Nó khiến
            người ta chú ý đến bạn.”
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/45">
            Nguyễn Thuỳ Liên — Nhà sáng lập KEOZ
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <SectionHeading
          eyebrow="Bộ sưu tập"
          title="Chọn theo cách bạn nhìn"
          description="Ba hướng thiết kế cho ba cách thể hiện bản thân."
        />

        <div className="mt-10 grid gap-4 sm:gap-6 lg:mt-14 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className="group relative block overflow-hidden bg-keoz-cream"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={collectionImages[category.slug] ?? "/images/products/001-1.jpg"}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
                  0{index + 1}
                </p>
                <h3 className="font-display text-3xl leading-none text-white">
                  {category.name}
                </h3>
                <p className="mt-3 max-w-xs text-sm text-white/70">
                  {category.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-white">
                  Xem bộ sưu tập
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Film */}
      <section className="border-y border-keoz-line bg-keoz-cream">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10">
          <div className="relative aspect-video overflow-hidden bg-keoz-ink">
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/editorial/studio-model.jpg"
            >
              <source src="/videos/keoz-film.mp4" type="video/mp4" />
            </video>
            <div className="absolute left-4 top-4 flex items-center gap-2 bg-black/35 px-3 py-1.5 text-[9px] uppercase tracking-[0.28em] text-white backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-keoz-red" />
              KEOZ Film
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
              Chế tác
            </p>
            <h2 className="font-display text-4xl leading-[0.95] sm:text-5xl">
              137 bước
              <br />
              cho một chiếc gọng
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-keoz-muted sm:text-base">
              Từ bản phác thảo trên giấy đến khi chiếc gọng nằm gọn trong hộp,
              mỗi sản phẩm KEOZ đi qua 137 công đoạn — trong đó có 26 bước làm
              hoàn toàn bằng tay tại xưởng ở Hà Nội.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-keoz-line pt-8">
              {[
                { value: "137", label: "Công đoạn" },
                { value: "26", label: "Bước thủ công" },
                { value: "24", label: "Tháng bảo hành" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-4xl leading-none text-keoz-red">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-[10px] uppercase tracking-[0.22em] text-keoz-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 border-b border-keoz-ink/25 pb-1 text-[11px] uppercase tracking-[0.24em] transition-colors hover:border-keoz-red hover:text-keoz-red"
            >
              Đọc câu chuyện KEOZ
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Try-on band */}
      <section className="relative overflow-hidden bg-keoz-red text-white">
        <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-white/55">
              KEOZ Lab
            </p>
            <h2 className="font-display text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              Thử kính
              <br />
              trong không gian AR
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              Bật camera và xem chiếc kính bạn chọn nằm trên gương mặt mình như
              thế nào. Không cần đến cửa hàng, không cần đăng ký.
            </p>
            <Link
              href="/try-on"
              className="mt-8 inline-flex h-12 items-center gap-3 bg-white px-7 text-[11px] uppercase tracking-[0.24em] text-keoz-red transition-colors hover:bg-keoz-cream"
            >
              Thử kính ngay
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden">
            <Image
              src="/images/editorial/studio-eyewear.jpg"
              alt="Kính KEOZ trong studio"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

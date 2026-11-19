import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/marquee";
import { aboutCopy } from "@/lib/wix-copy";

export const metadata: Metadata = {
  title: "Câu chuyện KEOZ",
  description:
    "KEOZ bắt đầu từ một xưởng nhỏ ở Hà Nội năm 2019, với niềm tin rằng một chiếc kính tốt phải nhẹ, bền và đủ tinh tế để không che đi gương mặt.",
};

const values = [
  {
    title: "Tối giản",
    text: "Chúng tôi bỏ đi mọi chi tiết không cần thiết cho đến khi chỉ còn lại đường nét quan trọng nhất.",
  },
  {
    title: "Bền bỉ",
    text: "Titan, acetate Ý và thép không gỉ — những vật liệu sống cùng bạn lâu hơn một mùa mốt.",
  },
  {
    title: "Thủ công",
    text: "26 trong 137 công đoạn được làm bằng tay bởi những người thợ đã gắn bó với xưởng nhiều năm.",
  },
];

const timeline = [
  { year: "2019", text: "Xưởng nhỏ 12m² ở phố Hàng Bông, Hà Nội. Mẫu kính đầu tiên ra đời." },
  { year: "2022", text: "Ra mắt dòng titan không viền. Bộ sưu tập đầu tiên bán hết trong 3 tuần." },
  { year: "2024", text: "KEOZ Lab thành lập, thử nghiệm tính năng thử kính bằng camera." },
  { year: "2026", text: "Sáu phom dáng kinh điển, hơn 4.000 khách hàng trên toàn quốc." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-keoz-ink">
        <div className="absolute inset-0">
          <Image
            src="/images/editorial/noir-glasses.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
        </div>

        <div className="relative mx-auto flex min-h-[52svh] max-w-[1600px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:min-h-[62svh] lg:px-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-white/60">
            Từ 2019 · Hà Nội
          </p>
          <h1 className="font-display text-5xl leading-[0.9] text-white sm:text-7xl lg:text-8xl">
            Câu chuyện
            <br />
            KEOZ
          </h1>
        </div>
      </section>

      <div className="border-y border-keoz-line bg-keoz-cream py-3">
        <Marquee>
          <div className="flex items-center gap-10 pr-10 text-[10px] uppercase tracking-[0.3em] text-keoz-ink/70">
            <span>Made in Hà Nội</span>
            <span className="text-keoz-red">✳</span>
            <span>137 công đoạn</span>
            <span className="text-keoz-red">✳</span>
            <span>Titan &amp; acetate Ý</span>
            <span className="text-keoz-red">✳</span>
            <span>Since 2019</span>
            <span className="text-keoz-red">✳</span>
          </div>
        </Marquee>
      </div>

      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-keoz-muted">
            KEOZ Studio
          </p>
          <div>
            <h2 className="font-display text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
              {aboutCopy.title}
            </h2>
            <p className="mt-8 text-sm leading-relaxed text-keoz-muted sm:text-base">
              {aboutCopy.text}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-keoz-cream">
        <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px]">
            <Image
              src="/images/editorial/studio-model.jpg"
              alt="Người mẫu KEOZ trong studio"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-14 sm:px-10 lg:px-16">
            <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-keoz-muted">
              Studio
            </p>
            <h2 className="font-display text-4xl leading-[0.95] sm:text-5xl">
              Xưởng ở Hà Nội,
              <br />
              tầm nhìn ở khắp nơi
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-keoz-muted sm:text-base">
              Mọi mẫu kính đều được lắp ráp, cân chỉnh và kiểm tra tại xưởng phố
              Hàng Bông. Khách đến studio có thể xem trực tiếp quy trình và được
              đo miễn phí.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-keoz-line pt-8">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.24em] text-keoz-muted">
                  Địa chỉ
                </dt>
                <dd className="mt-1.5 text-sm">Hàng Bông, Hoàn Kiếm, Hà Nội</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.24em] text-keoz-muted">
                  Giờ mở cửa
                </dt>
                <dd className="mt-1.5 text-sm">09:00 — 19:00, T2 — T7</dd>
              </div>
            </dl>

            <Link
              href="/products"
              className="mt-10 inline-flex w-fit items-center gap-3 bg-keoz-red px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
            >
              Xem bộ sưu tập
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bộ sưu tập sắp ra mắt — dữ liệu từ trang Wix "SẮP RA MẮT" */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e6e1]">
            <Image
              src="/images/wix/teaser-model.jpg"
              alt="Gương mặt KEOZ"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e6e1]">
            <Image
              src="/images/wix/teaser-fashion.jpg"
              alt="Phong cách KEOZ"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-6 lg:px-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-keoz-muted">
            Sắp ra mắt
          </p>
          <h2 className="font-display text-3xl leading-[0.95] sm:text-4xl">
            {aboutCopy.designedTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-keoz-muted sm:text-base">
            {aboutCopy.designedText}
          </p>
          <div className="relative mt-10 aspect-[21/9] overflow-hidden bg-[#e9e6e1]">
            <Image
              src="/images/wix/teaser-billboard.jpg"
              alt="KEOZ còn tiếp tục"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-keoz-muted">
          Giá trị
        </p>
        <h2 className="max-w-2xl font-display text-4xl leading-[0.95] sm:text-5xl">
          Ba nguyên tắc không đổi
        </h2>

        <div className="mt-12 grid gap-8 border-t border-keoz-line pt-10 sm:grid-cols-3">
          {values.map((value, index) => (
            <div key={value.title}>
              <p className="text-[10px] uppercase tracking-[0.26em] text-keoz-red">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-keoz-muted">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-keoz-line bg-keoz-ink text-keoz-cream">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl">
              Dấu mốc
            </h2>
            <ul className="divide-y divide-white/10">
              {timeline.map((item) => (
                <li key={item.year} className="flex gap-6 py-5 first:pt-0">
                  <span className="w-14 shrink-0 font-display text-xl text-keoz-red/90">
                    {item.year}
                  </span>
                  <span className="text-sm leading-relaxed text-white/65">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
            <Link
              href="/try-on"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white"
            >
              Thử kính
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/privacy"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-white"
            >
              Chính sách bảo mật
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

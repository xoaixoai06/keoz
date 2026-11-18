import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TryOnDemo } from "@/components/try-on-demo";

export const metadata: Metadata = {
  title: "Thử kính",
  description:
    "Thử kính KEOZ trực tiếp bằng camera trên trình duyệt — không cần ứng dụng, không lưu dữ liệu.",
};

export default function ArVrPage() {
  return (
    <>
      <section className="bg-keoz-red text-white">
        <div className="mx-auto max-w-[1600px] px-4 pb-12 pt-12 sm:px-6 sm:pt-16 lg:px-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-white/55">
            KEOZ Lab · Thử kính
          </p>
          <h1 className="max-w-4xl text-balance font-display text-5xl leading-[0.9] sm:text-6xl lg:text-7xl">
            Thử kính trong không gian của bạn
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Dùng camera trước để xem gọng kính nằm trên gương mặt mình với tỷ lệ
            thật. Toàn bộ xử lý diễn ra trên thiết bị — KEOZ không lưu hình ảnh
            của bạn.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <TryOnDemo />
      </section>

      <section className="border-t border-keoz-line bg-keoz-cream">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-10">
          <div className="relative aspect-[5/4] overflow-hidden">
            <Image
              src="/images/editorial/studio-eyewear.jpg"
              alt="Chi tiết gọng kính KEOZ"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-keoz-muted">
              Sắp ra mắt
            </p>
            <h2 className="font-display text-4xl leading-[0.95] sm:text-5xl">
              3D Try-on
              <br />
              &amp; tư vấn từ xa
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-keoz-muted sm:text-base">
              Chúng tôi đang hoàn thiện mô hình 3D cho cả sáu phom kính, kèm tính
              năng đo khuôn mặt và gợi ý phom phù hợp. Để lại email ở cuối trang
              để nhận thông báo đầu tiên.
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-keoz-line pt-7">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.24em] text-keoz-muted">
                  Hiện có
                </dt>
                <dd className="mt-1.5 text-sm">Thử kính 2D bằng camera</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.24em] text-keoz-muted">
                  Đang phát triển
                </dt>
                <dd className="mt-1.5 text-sm">Mô hình 3D &amp; đo khuôn mặt</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 border-b border-keoz-ink/25 pb-1 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-keoz-red hover:text-keoz-red"
              >
                Bộ sưu tập hiện tại
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 border-b border-keoz-ink/25 pb-1 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-keoz-red hover:text-keoz-red"
              >
                Về KEOZ Lab
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

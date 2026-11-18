import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Xem lại những chiếc kính bạn đã chọn trước khi thanh toán.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-keoz-line pb-8">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
            Bước 01 — 02
          </p>
          <h1 className="font-display text-5xl leading-[0.92] sm:text-6xl">
            Giỏ hàng
          </h1>
        </div>
        <nav
          aria-label="Tiến trình đặt hàng"
          className="flex items-center gap-3 text-[9px] uppercase tracking-[0.22em]"
        >
          <span className="text-keoz-red">Giỏ hàng</span>
          <span className="h-px w-8 bg-keoz-line" />
          <Link href="/checkout" className="text-keoz-muted hover:text-keoz-ink">
            Thanh toán
          </Link>
          <span className="h-px w-8 bg-keoz-line" />
          <span className="text-keoz-muted">Hoàn tất</span>
        </nav>
      </header>

      <CartView />
    </div>
  );
}

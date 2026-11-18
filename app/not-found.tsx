import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-[1200px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
        Lỗi 404
      </p>
      <h1 className="mt-4 font-display text-5xl leading-[0.9] sm:text-7xl">
        Không tìm thấy
        <br />
        trang này
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-keoz-muted">
        Có thể đường dẫn đã thay đổi, hoặc chiếc kính bạn tìm đã hết hàng.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="inline-flex h-12 items-center gap-3 bg-keoz-red px-7 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
        >
          Xem sản phẩm
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 items-center border border-keoz-line px-7 text-[11px] uppercase tracking-[0.24em] transition-colors hover:border-keoz-ink/40"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

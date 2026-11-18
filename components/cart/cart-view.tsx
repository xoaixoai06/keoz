"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, subtotal, count, hydrated, setQuantity, removeItem } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="h-32 animate-pulse border border-keoz-line bg-keoz-cream/60"
            />
          ))}
        </div>
        <div className="h-64 animate-pulse border border-keoz-line bg-keoz-cream/60" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border border-keoz-line bg-keoz-cream/50 px-6 py-20 text-center">
        <p className="font-display text-3xl leading-tight sm:text-4xl">
          Giỏ hàng đang trống
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm text-keoz-muted">
          Bạn chưa chọn chiếc kính nào. Bộ sưu tập 2026 đang chờ.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex h-12 items-center gap-3 bg-keoz-red px-7 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
        >
          Xem sản phẩm
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <div>
        <div className="hidden border-b border-keoz-line pb-3 text-[9px] uppercase tracking-[0.24em] text-keoz-muted sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-8">
          <span>Sản phẩm</span>
          <span>Số lượng</span>
          <span className="text-right">Tạm tính</span>
        </div>

        <ul className="divide-y divide-keoz-line">
          {items.map((item) => (
            <li
              key={item.slug}
              className="grid gap-4 py-6 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8"
            >
              <div className="flex gap-4">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative size-24 shrink-0 overflow-hidden bg-keoz-cream"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.24em] text-keoz-muted">
                    {item.model}
                  </p>
                  <Link
                    href={`/products/${item.slug}`}
                    className="mt-1 block font-display text-xl leading-none transition-colors hover:text-keoz-red"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1.5 text-sm text-keoz-muted">
                    {formatPrice(item.price)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="mt-2 inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-keoz-muted transition-colors hover:text-keoz-red sm:hidden"
                  >
                    <Trash2 className="size-3" />
                    Xoá
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-center">
                <div className="flex h-10 items-center border border-keoz-line">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.slug, item.quantity - 1)}
                    aria-label={`Giảm số lượng ${item.name}`}
                    className="grid h-full w-9 place-items-center transition-colors hover:text-keoz-red"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-7 text-center text-sm tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.slug, item.quantity + 1)}
                    aria-label={`Tăng số lượng ${item.name}`}
                    className="grid h-full w-9 place-items-center transition-colors hover:text-keoz-red"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.slug)}
                  aria-label={`Xoá ${item.name}`}
                  className="hidden p-1 text-keoz-muted transition-colors hover:text-keoz-red sm:block"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <p className="text-sm tabular-nums sm:min-w-24 sm:text-right">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-keoz-muted transition-colors hover:text-keoz-red"
        >
          ← Tiếp tục mua sắm
        </Link>
      </div>

      <aside className="h-fit border border-keoz-line bg-keoz-cream/50 p-6 sm:p-8 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Tóm tắt đơn hàng</h2>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-keoz-muted">Sản phẩm ({count})</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-keoz-muted">Vận chuyển</dt>
            <dd className="text-keoz-red">Miễn phí</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-baseline justify-between border-t border-keoz-line pt-5">
          <p className="text-[10px] uppercase tracking-[0.24em]">Tổng cộng</p>
          <p className="font-display text-2xl tabular-nums">
            {formatPrice(subtotal)}
          </p>
        </div>

        <Link
          href="/checkout"
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 bg-keoz-red px-6 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
        >
          Tiến hành thanh toán
          <ArrowRight className="size-4" />
        </Link>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-keoz-muted">
          Đây là bản demo. Không có giao dịch thật nào được thực hiện.
        </p>
      </aside>
    </div>
  );
}

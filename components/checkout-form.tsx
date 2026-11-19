"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { placeOrder, type ActionState } from "@/lib/actions";
import { formatPrice } from "@/lib/format";

const initialState: ActionState = { status: "idle" };

const paymentMethods = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)" },
  { id: "transfer", label: "Chuyển khoản ngân hàng" },
];

export function CheckoutForm() {
  const { items, subtotal, count, hydrated, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const [payment, setPayment] = useState("cod");

  const payload = useMemo(
    () =>
      JSON.stringify(
        items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
      ),
    [items],
  );

  useEffect(() => {
    if (state.status === "success") {
      clearCart();
    }
  }, [state.status, clearCart]);

  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="h-96 animate-pulse border border-keoz-line bg-keoz-cream/60" />
        <div className="h-64 animate-pulse border border-keoz-line bg-keoz-cream/60" />
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div className="border border-keoz-line bg-keoz-cream/50 px-6 py-16 text-center sm:py-20">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-keoz-red text-white">
          <Check className="size-6" />
        </span>
        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
          Cảm ơn bạn
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-keoz-muted">
          {state.message}
        </p>

        {state.code ? (
          <p className="mt-6 inline-block border border-dashed border-keoz-red/40 px-5 py-3 text-[11px] uppercase tracking-[0.24em] text-keoz-red">
            Mã đơn hàng — {state.code}
          </p>
        ) : null}

        {state.demo ? (
          <p className="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-keoz-muted">
            Đơn hàng này chỉ được ghi nhận tạm thời trên trình duyệt. Khi Supabase
            được cấu hình, đơn sẽ được lưu vào database.
          </p>
        ) : null}

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex h-12 items-center gap-3 bg-keoz-red px-7 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
          >
            Tiếp tục mua sắm
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

  if (items.length === 0) {
    return (
      <div className="border border-keoz-line bg-keoz-cream/50 px-6 py-20 text-center">
        <p className="font-display text-3xl leading-tight sm:text-4xl">
          Chưa có gì để thanh toán
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm text-keoz-muted">
          Thêm một chiếc kính vào giỏ trước khi tiến hành thanh toán.
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
    <form action={formAction} className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <input type="hidden" name="items" value={payload} />
      <input type="hidden" name="payment" value={payment} />

      <div>
        <section>
          <h2 className="mb-6 flex items-baseline gap-3 font-display text-2xl">
            <span className="text-[10px] uppercase tracking-[0.24em] text-keoz-red">
              01
            </span>
            Thông tin liên hệ
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Họ và tên" name="fullName" autoComplete="name" required />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <Field
              label="Số điện thoại"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
            <Field label="Thành phố" name="city" autoComplete="address-level2" required />
            <div className="sm:col-span-2">
              <Field
                label="Địa chỉ"
                name="address"
                autoComplete="street-address"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Field label="Ghi chú (không bắt buộc)" name="note" textarea />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 flex items-baseline gap-3 font-display text-2xl">
            <span className="text-[10px] uppercase tracking-[0.24em] text-keoz-red">
              02
            </span>
            Phương thức thanh toán
          </h2>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className="flex cursor-pointer items-center gap-3 border border-keoz-line px-4 py-4 text-sm transition-colors has-checked:border-keoz-red has-checked:bg-keoz-cream/60"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={payment === method.id}
                  onChange={() => setPayment(method.id)}
                  className="size-3.5 accent-[#930500]"
                />
                {method.label}
              </label>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-2 text-[11px] text-keoz-muted">
            <Lock className="size-3.5" />
            Bản demo — không có giao dịch thật nào được thực hiện.
          </p>
        </section>
      </div>

      <aside className="h-fit border border-keoz-line bg-keoz-cream/50 p-6 sm:p-8 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Đơn hàng của bạn</h2>

        <ul className="mt-6 space-y-4 border-b border-keoz-line pb-6">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-3">
              <div className="relative size-14 shrink-0 overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  {item.model} — {item.name}
                </p>
                <p className="mt-0.5 text-[11px] text-keoz-muted">
                  SL {item.quantity}
                </p>
              </div>
              <p className="text-sm tabular-nums">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-3 text-sm">
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
          <p className="font-display text-2xl tabular-nums">{formatPrice(subtotal)}</p>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 bg-keoz-red px-6 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Đang xử lý
            </>
          ) : (
            <>
              Đặt hàng
              <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <p
          aria-live="polite"
          className="mt-4 min-h-5 text-center text-[11px] leading-relaxed text-red-700"
        >
          {state.status === "error" ? state.message : ""}
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const shared =
    "mt-2 w-full border border-keoz-line bg-white/70 px-3 py-3 text-sm outline-none transition-colors focus:border-keoz-red";

  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-[0.22em] text-keoz-muted">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={3} className={shared} />
      ) : (
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className={shared}
        />
      )}
    </label>
  );
}

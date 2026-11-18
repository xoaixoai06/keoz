"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/lib/types";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 3200);
    return () => window.clearTimeout(timeout);
  }, [added]);

  const add = () => {
    addItem(
      {
        slug: product.slug,
        model: product.model,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity,
    );
    setAdded(true);
  };

  return (
    <div className="mt-8">
      <div className="flex items-stretch gap-3">
        <div className="flex h-12 items-center border border-keoz-ink/20">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Giảm số lượng"
            className="grid h-full w-10 place-items-center transition-colors hover:text-keoz-red"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-8 text-center text-sm tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            aria-label="Tăng số lượng"
            className="grid h-full w-10 place-items-center transition-colors hover:text-keoz-red"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={add}
          className="h-12 flex-1 bg-keoz-red px-6 text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
        >
          {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
        </button>
      </div>

      <div className="mt-4 flex min-h-5 items-center justify-between text-xs">
        <span className="inline-flex items-center gap-2 text-keoz-muted">
          {added ? (
            <>
              <Check className="size-3.5 text-keoz-red" />
              <Link href="/cart" className="text-keoz-red underline underline-offset-4">
                Xem giỏ hàng
              </Link>
            </>
          ) : (
            <>Còn {product.stock} sản phẩm</>
          )}
        </span>
        <span className="text-keoz-muted">Miễn phí giao hàng</span>
      </div>
    </div>
  );
}

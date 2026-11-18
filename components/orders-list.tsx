"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import {
  getSupabaseBrowser,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase-browser";
import { formatPrice } from "@/lib/format";

type OrderRow = {
  code: string;
  status: string;
  total: number;
  created_at: string;
  order_items: Array<{ product_name: string; quantity: number; unit_price: number }>;
};

const statusLabels: Record<string, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã huỷ",
};

export function OrdersList() {
  const [state, setState] = useState<"loading" | "guest" | "empty" | "ready">("loading");
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    if (!isSupabaseBrowserConfigured) {
      setState("guest");
      return;
    }

    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setState("guest");
      return;
    }

    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;

      if (!data.session) {
        setState("guest");
        return;
      }

      const { data: rows, error } = await supabase
        .from("orders")
        .select(
          "code, status, total, created_at, order_items(product_name, quantity, unit_price)",
        )
        .order("created_at", { ascending: false })
        .limit(20);

      if (!active) return;

      if (error || !rows?.length) {
        setState("empty");
        return;
      }

      setOrders(rows as OrderRow[]);
      setState("ready");
    });

    return () => {
      active = false;
    };
  }, []);

  if (state === "loading") {
    return <div className="h-48 animate-pulse border border-keoz-line bg-keoz-cream/50" />;
  }

  if (state === "guest") {
    return (
      <div className="border border-keoz-line bg-keoz-cream/50 px-6 py-16 text-center">
        <Package className="mx-auto size-8 text-keoz-red" />
        <p className="mt-5 font-display text-2xl">Đăng nhập để xem đơn hàng</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-keoz-muted">
          Lịch sử đơn được bảo vệ bằng Supabase Auth và Row Level Security. Mỗi
          khách hàng chỉ đọc được đơn của chính mình.
        </p>
        <Link
          href="/account"
          className="mt-7 inline-flex h-11 items-center gap-2 bg-keoz-red px-6 text-[10px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
        >
          Đăng nhập
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="border border-keoz-line bg-keoz-cream/50 px-6 py-16 text-center">
        <p className="font-display text-2xl">Chưa có đơn hàng nào</p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-keoz-muted">
          Đơn hàng bạn đặt sẽ xuất hiện ở đây sau khi được ghi nhận.
        </p>
        <Link
          href="/products"
          className="mt-7 inline-flex h-11 items-center gap-2 bg-keoz-red px-6 text-[10px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
        >
          Xem sản phẩm
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.code} className="border border-keoz-line p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-keoz-line pb-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.24em] text-keoz-muted">
                Mã đơn
              </p>
              <p className="mt-1 text-sm">{order.code}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.24em] text-keoz-muted">
                Ngày đặt
              </p>
              <p className="mt-1 text-sm">
                {new Date(order.created_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <span className="border border-keoz-red/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-keoz-red">
              {statusLabels[order.status] ?? order.status}
            </span>
          </div>

          <ul className="mt-4 space-y-2">
            {order.order_items?.map((item, index) => (
              <li
                key={`${order.code}-${index}`}
                className="flex justify-between gap-4 text-sm"
              >
                <span className="text-keoz-muted">
                  {item.product_name} × {item.quantity}
                </span>
                <span className="tabular-nums">
                  {formatPrice(item.unit_price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-baseline justify-between border-t border-keoz-line pt-4">
            <span className="text-[10px] uppercase tracking-[0.24em]">Tổng</span>
            <span className="font-display text-xl tabular-nums">
              {formatPrice(order.total)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

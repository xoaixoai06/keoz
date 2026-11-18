import type { Metadata } from "next";
import { OrdersList } from "@/components/orders-list";

export const metadata: Metadata = {
  title: "Đơn hàng của tôi",
  description: "Theo dõi trạng thái những đơn hàng KEOZ của bạn.",
};

export default function MyOrdersPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-10">
      <header className="mb-10 border-b border-keoz-line pb-8">
        <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
          KEOZ Members
        </p>
        <h1 className="font-display text-5xl leading-[0.92] sm:text-6xl">
          Đơn hàng của tôi
        </h1>
      </header>

      <OrdersList />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { AccountPanel } from "@/components/account-panel";

export const metadata: Metadata = {
  title: "Tài khoản",
  description: "Đăng nhập vào tài khoản KEOZ để theo dõi đơn hàng và ưu đãi.",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-10">
      <header className="mb-10 border-b border-keoz-line pb-8">
        <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
          KEOZ Members
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-5xl leading-[0.92] sm:text-6xl">
            Tài khoản
          </h1>
          <Link
            href="/my-orders"
            className="border-b border-keoz-ink/25 pb-1 text-[10px] uppercase tracking-[0.22em] text-keoz-muted transition-colors hover:border-keoz-red hover:text-keoz-red"
          >
            Đơn hàng của tôi
          </Link>
        </div>
      </header>

      <AccountPanel />
    </div>
  );
}

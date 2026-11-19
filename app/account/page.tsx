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
          <div>
            <h1 className="font-display text-5xl leading-[0.92] sm:text-6xl">
              Tài khoản
            </h1>
            <p className="mt-3 text-sm text-keoz-muted">
              Xem và chỉnh sửa thông tin cá nhân của bạn ở bên dưới.
            </p>
          </div>
          <Link
            href="/my-orders"
            className="border-b border-keoz-ink/25 pb-1 text-[10px] uppercase tracking-[0.22em] text-keoz-muted transition-colors hover:border-keoz-red hover:text-keoz-red"
          >
            Đơn hàng của tôi
          </Link>
        </div>
      </header>

      <div className="mb-8 grid gap-6 border-t border-keoz-line pt-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-keoz-red">
            Thông tin cá nhân
          </p>
          <p className="mt-2 text-sm text-keoz-muted">
            Cập nhật thông tin cá nhân của bạn.
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-keoz-red">
            Thông tin đăng nhập
          </p>
          <p className="mt-2 text-sm text-keoz-muted">
            Xem và cập nhật email đăng nhập và mật khẩu của bạn.
          </p>
        </div>
      </div>

      <AccountPanel />
    </div>
  );
}

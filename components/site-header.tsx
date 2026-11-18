"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Logo } from "@/components/logo";
import { Marquee } from "@/components/marquee";
import { cn } from "@/lib/format";

const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/collections/eyeglasses", label: "Bộ sưu tập" },
  { href: "/about", label: "Câu chuyện" },
  { href: "/try-on", label: "Thử kính" },
];

const collectionLinks = [
  { href: "/collections/eyeglasses", label: "Gọng kính" },
  { href: "/collections/sunglasses", label: "Kính mát" },
  { href: "/collections/special-design", label: "Thiết kế đặc biệt" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/products") {
      return pathname === "/products" || pathname.startsWith("/products/");
    }
    if (href === "/collections/eyeglasses") {
      return pathname.startsWith("/collections/");
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <div className="bg-keoz-red-dark text-white/75">
        <Marquee className="py-2">
          <div className="flex items-center gap-10 pr-10 text-[9px] uppercase tracking-[0.3em]">
            <span>Tầm nhìn tinh tế, đẳng cấp vượt thời gian</span>
            <span className="text-white/35">•</span>
            <span>Miễn phí giao hàng toàn quốc</span>
            <span className="text-white/35">•</span>
            <span>KEOZ Studio 2026</span>
            <span className="text-white/35">•</span>
            <span>Thử kính bằng camera</span>
            <span className="text-white/35">•</span>
          </div>
        </Marquee>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-keoz-red text-white">
        <div className="mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-[86px] sm:px-6 lg:px-10">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Mở menu"
              className="inline-flex items-center justify-center p-1 lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Điều hướng chính">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive(item.href)}
                  className={cn(
                    "nav-link pb-1 text-[10px] uppercase tracking-[0.24em] transition-colors",
                    isActive(item.href) ? "text-white" : "text-white/80 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" aria-label="KEOZ — Trang chủ" className="justify-self-center">
            <Logo className="h-7 sm:h-9" />
          </Link>

          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <Link
              href="/account"
              className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white sm:inline-flex"
            >
              <UserRound className="size-4" />
              Đăng nhập
            </Link>
            <Link
              href="/account"
              aria-label="Tài khoản"
              className="inline-flex p-1 text-white/80 transition-colors hover:text-white sm:hidden"
            >
              <UserRound className="size-5" />
            </Link>
            <Link
              href="/cart"
              className="group inline-flex items-center gap-2 border-l border-white/20 pl-3 text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-white sm:pl-5"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              <span className="tabular-nums">({hydrated ? count : 0})</span>
            </Link>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-keoz-red text-white transition-transform duration-500 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 py-5">
          <div className="flex items-center justify-between">
            <Logo className="h-8" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng menu"
              className="p-2"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="mt-14 flex flex-col gap-6" aria-label="Menu di động">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-4xl leading-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 border-t border-white/20 pt-6">
            <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/50">
              Bộ sưu tập
            </p>
            <div className="flex flex-col gap-3">
              {collectionLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm uppercase tracking-[0.18em] text-white/80"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-5 text-[10px] uppercase tracking-[0.24em]">
            <Link href="/account">Tài khoản</Link>
            <Link href="/cart">Giỏ hàng ({hydrated ? count : 0})</Link>
          </div>
        </div>
      </div>
    </>
  );
}

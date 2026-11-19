import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerCopy } from "@/lib/wix-copy";

const overviewLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/about", label: "Sắp ra mắt" },
  { href: "/try-on", label: "Thử kính" },
];

const policyLinks = [
  { href: "/privacy", label: "Chính sách bảo mật" },
  { href: "/privacy#shipping", label: "Vận chuyển & đổi trả" },
  { href: "/privacy#terms", label: "Điều khoản sử dụng" },
];

export function SiteFooter() {
  return (
    <footer className="bg-white text-keoz-ink">
      {/* Red newsletter band — like the original Wix site */}
      <div className="bg-keoz-red text-white">
        <div className="mx-auto max-w-[720px] px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-10">
          <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/60">
            {footerCopy.tagline}
          </p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            {footerCopy.newsletterTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/75">
            {footerCopy.newsletterText}
          </p>
          <div className="mx-auto mt-6 max-w-md text-left">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* White information footer */}
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-3">
          <FooterColumn title="Tổng quan" links={overviewLinks} />
          <FooterColumn title="Chính sách" links={policyLinks} />
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-keoz-muted">
              Liên hệ
            </p>
            <ul className="space-y-4 text-sm text-keoz-ink/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-keoz-red" />
                Hà Nội, Việt Nam
              </li>
              <li>
                <a
                  href="mailto:contact@keozeyewear.com"
                  className="flex gap-3 transition-colors hover:text-keoz-red"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-keoz-red" />
                  Email: contact@keozeyewear.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+84901234567"
                  className="flex gap-3 transition-colors hover:text-keoz-red"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-keoz-red" />
                  Hotline: +84 901 234 567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[713/625] overflow-hidden bg-[#e9e6e1]">
            <Image
              src="/images/wix/footer-left.jpg"
              alt="Gọng kính KEOZ"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative aspect-[713/625] overflow-hidden bg-[#e9e6e1]">
            <Image
              src="/images/wix/footer-right.jpg"
              alt="KEOZ Studio"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-keoz-line pt-6 text-[10px] uppercase tracking-[0.22em] text-keoz-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 KEOZ Eyewear. Thiết kế tại Hà Nội.</p>
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-keoz-muted">
        {title}
      </p>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-keoz-ink/75 transition-colors hover:text-keoz-red"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

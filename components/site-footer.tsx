import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";

const shopLinks = [
  { href: "/products", label: "Tất cả sản phẩm" },
  { href: "/collections/eyeglasses", label: "Gọng kính" },
  { href: "/collections/sunglasses", label: "Kính mát" },
  { href: "/collections/special-design", label: "Thiết kế đặc biệt" },
];

const aboutLinks = [
  { href: "/about", label: "Câu chuyện KEOZ" },
  { href: "/try-on", label: "Thử kính" },
  { href: "/account", label: "Tài khoản" },
  { href: "/cart", label: "Giỏ hàng" },
];

const policyLinks = [
  { href: "/privacy", label: "Chính sách bảo mật" },
  { href: "/privacy#shipping", label: "Vận chuyển & đổi trả" },
  { href: "/privacy#terms", label: "Điều khoản sử dụng" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-keoz-red/40 bg-keoz-ink text-keoz-cream">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:py-20">
          <div className="max-w-xl">
            <Logo className="h-10" />
            <h2 className="mt-8 font-display text-4xl leading-[1.05] sm:text-5xl">
              Trở thành thành viên
              <br />
              đặc quyền của KEOZ.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
              Nhận quyền truy cập sớm vào các bộ sưu tập giới hạn và những câu
              chuyện thiết kế trước khi chúng được kể.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <FooterColumn title="Cửa hàng" links={shopLinks} />
            <FooterColumn title="KEOZ" links={aboutLinks} />
            <FooterColumn title="Chính sách" links={policyLinks} />
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/40">
                Liên hệ
              </p>
              <ul className="space-y-4 text-sm text-white/65">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-keoz-red" />
                  Hà Nội, Việt Nam
                </li>
                <li>
                  <a
                    href="mailto:contact@keozeyewear.com"
                    className="flex min-w-0 gap-3 transition-colors hover:text-white"
                  >
                    <Mail className="mt-0.5 size-4 shrink-0 text-keoz-red" />
                    <span>
                      contact@<wbr />
                      keozeyewear.com
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+84901234567"
                    className="flex gap-3 transition-colors hover:text-white"
                  >
                    <Phone className="mt-0.5 size-4 shrink-0 text-keoz-red" />
                    +84 901 234 567
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 text-[10px] uppercase tracking-[0.22em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/40">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

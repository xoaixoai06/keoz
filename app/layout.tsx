import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const display = localFont({
  src: "../public/fonts/madefor-display.woff2",
  variable: "--font-keoz-display",
  weight: "400 800",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const sans = localFont({
  src: "../public/fonts/madefor-text.woff2",
  variable: "--font-keoz-sans",
  weight: "400 800",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keoz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KEOZ — Tầm nhìn tinh tế, đẳng cấp vượt thời gian",
    template: "%s · KEOZ",
  },
  description:
    "KEOZ là studio kính mắt tại Hà Nội. Gọng kính, kính mát và thiết kế giới hạn được chế tác thủ công cho những ánh nhìn khác biệt.",
  keywords: [
    "KEOZ",
    "kính mắt",
    "gọng kính",
    "kính mát",
    "eyewear",
    "Hà Nội",
    "thiết kế",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "KEOZ",
    title: "KEOZ — Tầm nhìn tinh tế, đẳng cấp vượt thời gian",
    description:
      "Gọng kính, kính mát và thiết kế giới hạn được chế tác thủ công tại Hà Nội.",
    images: [{ url: "/images/editorial/hero-model.jpg", width: 1024, height: 1024 }],
  },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#930500",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-keoz-paper antialiased">
        <div className="scroll-progress" aria-hidden="true" />
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}

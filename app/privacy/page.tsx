import type { Metadata } from "next";
import Link from "next/link";
import { privacySections } from "@/lib/wix-copy";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "KEOZ thu thập gì, lưu ở đâu và bạn kiểm soát dữ liệu của mình như thế nào.",
};

const sections = [
  ...privacySections,
  {
    id: "shipping",
    title: "Vận chuyển & đổi trả",
    body: [
      "Miễn phí giao hàng toàn quốc. Nội thành Hà Nội 1–2 ngày làm việc, các tỉnh thành khác 3–5 ngày làm việc.",
      "Bạn có 14 ngày kể từ khi nhận hàng để đổi mẫu hoặc trả lại sản phẩm chưa qua sử dụng, còn đầy đủ hộp và phụ kiện. Chi phí vận chuyển đổi trả do KEOZ chịu nếu lỗi thuộc về sản phẩm.",
      "Bảo hành khung gọng 24 tháng. Miễn phí vệ sinh, cân chỉnh và thay ve kính trọn đời sản phẩm.",
    ],
  },
  {
    id: "terms",
    title: "Điều khoản sử dụng",
    body: [
      "Đây là website demo được xây dựng lại từ giao diện KEOZ trên Wix. Sản phẩm, giá và đơn hàng chỉ mang tính minh hoạ; không có giao dịch thanh toán thật nào được thực hiện.",
      "Nội dung, hình ảnh và nhận diện thương hiệu thuộc về KEOZ. Vui lòng không sử dụng lại cho mục đích thương mại khi chưa có sự đồng ý.",
    ],
  },
  {
    id: "rights",
    title: "Quyền của bạn",
    body: [
      "Bạn có thể yêu cầu xem, chỉnh sửa hoặc xoá dữ liệu cá nhân bất kỳ lúc nào bằng cách gửi email tới contact@keozeyewear.com. Chúng tôi phản hồi trong vòng 7 ngày làm việc.",
      "Bạn có thể huỷ đăng ký newsletter bằng liên kết ở cuối mỗi email hoặc gửi yêu cầu trực tiếp.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-10">
      <header className="border-b border-keoz-line pb-8">
        <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-keoz-muted">
          Cập nhật lần cuối — 19/11/2026
        </p>
        <h1 className="font-display text-5xl leading-[0.92] sm:text-6xl">
          Chính sách bảo mật
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-keoz-muted">
          KEOZ chỉ thu thập những gì cần thiết để giao đơn và giữ liên lạc với
          bạn. Trang này giải thích rõ chúng tôi lưu gì, ở đâu và bạn kiểm soát
          nó thế nào.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <nav aria-label="Mục lục" className="h-fit lg:sticky lg:top-28">
          <p className="mb-4 text-[9px] uppercase tracking-[0.26em] text-keoz-muted">
            Mục lục
          </p>
          <ul className="space-y-2.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[12px] leading-snug text-keoz-muted transition-colors hover:text-keoz-red"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <p className="text-[10px] uppercase tracking-[0.26em] text-keoz-red">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-keoz-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-keoz-line pt-8">
            <p className="text-sm text-keoz-muted">
              Còn câu hỏi?{" "}
              <a
                href="mailto:contact@keozeyewear.com"
                className="border-b border-keoz-red/40 text-keoz-red"
              >
                contact@keozeyewear.com
              </a>{" "}
              — hoặc{" "}
              <Link href="/about" className="border-b border-keoz-ink/30">
                đọc câu chuyện KEOZ
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

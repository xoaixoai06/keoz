"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LogOut, ShieldCheck } from "lucide-react";
import {
  getSupabaseBrowser,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase-browser";

type Status = {
  tone: "info" | "error" | "success";
  message: string;
};

const benefits = [
  "Theo dõi đơn hàng và lịch sử mua",
  "Nhận thông báo bộ sưu tập giới hạn trước công chúng",
  "Lưu thông tin đo kính để tái đặt hàng nhanh hơn",
];

export function AccountPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setReady(true);
      return;
    }

    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSessionEmail(data.session?.user.email ?? null);
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = getSupabaseBrowser();

    if (!supabase) {
      setStatus({
        tone: "info",
        message:
          "Chưa cấu hình Supabase. Thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào .env.local để bật đăng nhập.",
      });
      return;
    }

    setPending(true);
    setStatus(null);

    const response =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setPending(false);

    if (response.error) {
      setStatus({ tone: "error", message: response.error.message });
      return;
    }

    if (mode === "signup" && !response.data.session) {
      setStatus({
        tone: "success",
        message: "Đã tạo tài khoản. Kiểm tra email để xác nhận trước khi đăng nhập.",
      });
      return;
    }

    setStatus({ tone: "success", message: "Đăng nhập thành công. Chào mừng trở lại." });
    setPassword("");
  };

  const signOut = async () => {
    const supabase = getSupabaseBrowser();
    await supabase?.auth.signOut();
    setSessionEmail(null);
    setStatus(null);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <div className="border border-keoz-line bg-keoz-cream/40 p-6 sm:p-10">
        <h2 className="font-display text-3xl leading-none">
          {sessionEmail ? "Tài khoản của bạn" : mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}
        </h2>

        {!isSupabaseBrowserConfigured ? (
          <p className="mt-4 border-l-2 border-keoz-red/50 pl-3 text-[11px] leading-relaxed text-keoz-muted">
            Supabase chưa được cấu hình trong môi trường này. Giao diện đăng nhập
            đang ở chế độ demo; đơn hàng và newsletter vẫn hoạt động ở chế độ
            tạm.
          </p>
        ) : null}

        {!ready ? (
          <div className="mt-8 h-40 animate-pulse bg-keoz-cream" />
        ) : sessionEmail ? (
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.24em] text-keoz-muted">
              Đang đăng nhập
            </p>
            <p className="mt-2 text-lg">{sessionEmail}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex h-11 items-center gap-2 bg-keoz-red px-5 text-[10px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark"
              >
                Tiếp tục mua sắm
                <ArrowRight className="size-3.5" />
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex h-11 items-center gap-2 border border-keoz-line px-5 text-[10px] uppercase tracking-[0.24em] transition-colors hover:border-keoz-ink/40"
              >
                <LogOut className="size-3.5" />
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-[9px] uppercase tracking-[0.22em] text-keoz-muted">
                Email
              </span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border border-keoz-line bg-white/70 px-3 py-3 text-sm outline-none transition-colors focus:border-keoz-red"
              />
            </label>

            <label className="block">
              <span className="text-[9px] uppercase tracking-[0.22em] text-keoz-muted">
                Mật khẩu
              </span>
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full border border-keoz-line bg-white/70 px-3 py-3 text-sm outline-none transition-colors focus:border-keoz-red"
              />
            </label>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex h-12 w-full items-center justify-center bg-keoz-red text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-keoz-red-dark disabled:opacity-60"
            >
              {pending ? "Đang xử lý" : mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}
            </button>

            {status ? (
              <p
                aria-live="polite"
                className={
                  status.tone === "error"
                    ? "text-[11px] leading-relaxed text-red-700"
                    : "text-[11px] leading-relaxed text-keoz-muted"
                }
              >
                {status.message}
              </p>
            ) : null}

            <p className="pt-2 text-[11px] text-keoz-muted">
              {mode === "signin" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setStatus(null);
                }}
                className="border-b border-keoz-red/40 text-keoz-red"
              >
                {mode === "signin" ? "Đăng ký" : "Đăng nhập"}
              </button>
            </p>
          </form>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-keoz-muted">
          Thành viên KEOZ
        </p>
        <h3 className="font-display text-3xl leading-[1.05] sm:text-4xl">
          Một tài khoản,
          <br />
          toàn bộ trải nghiệm.
        </h3>

        <ul className="mt-7 space-y-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-sm text-keoz-ink/75">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-keoz-red" />
              {benefit}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-sm text-[11px] leading-relaxed text-keoz-muted">
          Khi triển khai, xác thực được xử lý bởi Supabase Auth. Mật khẩu không
          bao giờ đi qua máy chủ của KEOZ.
        </p>
      </div>
    </div>
  );
}

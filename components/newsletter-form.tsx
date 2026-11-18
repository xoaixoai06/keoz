"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { subscribe, type ActionState } from "@/lib/actions";
import { cn } from "@/lib/format";

const initialState: ActionState = { status: "idle" };

export function NewsletterForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [state, formAction, pending] = useActionState(subscribe, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const isDark = variant === "dark";

  return (
    <div>
      <form
        ref={formRef}
        action={formAction}
        className={cn(
          "flex items-center gap-3 border-b py-3",
          isDark ? "border-white/30" : "border-keoz-ink/25",
        )}
      >
        <label htmlFor={isDark ? "newsletter-dark" : "newsletter-light"} className="sr-only">
          Email
        </label>
        <input
          id={isDark ? "newsletter-dark" : "newsletter-light"}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email của bạn"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-current/45",
            isDark ? "text-white" : "text-keoz-ink",
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] transition-opacity disabled:opacity-50",
            isDark ? "text-white" : "text-keoz-red",
          )}
        >
          {pending ? "Đang gửi" : "Đăng ký"}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
      <p
        aria-live="polite"
        className={cn(
          "mt-3 min-h-5 text-xs",
          state.status === "error"
            ? "text-red-300"
            : isDark
              ? "text-white/60"
              : "text-keoz-muted",
        )}
      >
        {state.message}
      </p>
    </div>
  );
}

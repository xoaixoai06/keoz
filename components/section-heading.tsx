import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/format";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Xem tất cả",
  className,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 text-[10px] uppercase tracking-[0.32em]",
              invert ? "text-white/55" : "text-keoz-muted",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl",
            invert ? "text-keoz-cream" : "text-keoz-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-xl text-sm leading-relaxed sm:text-base",
              invert ? "text-white/60" : "text-keoz-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className={cn(
            "group inline-flex items-center gap-2 border-b pb-1 text-[11px] uppercase tracking-[0.24em] transition-colors",
            invert
              ? "border-white/30 text-white hover:border-white"
              : "border-keoz-ink/25 text-keoz-ink hover:border-keoz-red hover:text-keoz-red",
          )}
        >
          {linkLabel}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}

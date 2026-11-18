import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/format";

export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 50vw",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const [first, second] = product.images;

  return (
    <Link href={`/products/${product.slug}`} data-reveal className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ece9e4]">
        <Image
          src={first}
          alt={`${product.model} — ${product.name}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        {second ? (
          <Image
            src={second}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}

        {product.category === "special-design" ? (
          <span className="absolute left-3 top-3 bg-keoz-red px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-white">
            Limited
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 grid size-9 translate-y-2 place-items-center bg-white/90 text-keoz-red opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-keoz-muted">
            {product.model}
          </p>
          <h3 className="mt-1 font-display text-xl leading-none text-keoz-ink">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <p className={cn("text-sm", product.compareAtPrice ? "text-keoz-red" : "")}>
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice ? (
            <p className="text-xs text-keoz-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
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
    <Link href={`/products/${product.slug}`} className="group block">
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
          <p className="mb-0.5 text-[9px] uppercase tracking-[0.2em] text-keoz-muted">
            Giá
          </p>
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

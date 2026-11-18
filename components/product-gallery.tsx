"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/format";

export function ProductGallery({
  images,
  name,
  model,
}: {
  images: string[];
  name: string;
  model: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#ece9e4]">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${model} — ${name}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.24em] text-keoz-ink/50">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Xem ảnh ${index + 1}`}
            aria-current={active === index}
            className={cn(
              "relative aspect-square overflow-hidden bg-[#ece9e4] ring-offset-2 transition-all",
              active === index
                ? "ring-1 ring-keoz-red ring-offset-keoz-paper"
                : "opacity-65 hover:opacity-100",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 12vw, 30vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

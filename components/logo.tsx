import Image from "next/image";
import { cn } from "@/lib/format";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/keoz-logo.png"
      alt="KEOZ"
      width={1375}
      height={333}
      priority
      className={cn("w-auto", className)}
    />
  );
}

import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const bannerVariants = cva("rounded-lg border p-4 font-sans text-sm leading-relaxed", {
  variants: {
    tone: {
      info: "border-primary/30 bg-primary/5 text-ink",
      success: "border-success/30 bg-success/10 text-ink",
      warning: "border-warning/40 bg-warning/10 text-ink",
      danger: "border-danger/30 bg-danger/10 text-ink",
    },
  },
  defaultVariants: { tone: "info" },
});

type BannerProps = ComponentPropsWithoutRef<"div"> & VariantProps<typeof bannerVariants>;

export function Banner({ className, tone, ...props }: BannerProps) {
  return <div role="status" className={cn(bannerVariants({ tone }), className)} {...props} />;
}

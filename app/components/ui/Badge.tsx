import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-sans text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "border border-border bg-surface-2 text-muted",
        primary: "bg-primary/12 text-primary-strong",
        success: "bg-success/12 text-success-strong",
        warning: "bg-warning/15 text-ink",
        danger: "bg-danger/12 text-danger-strong",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

type BadgeProps = ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

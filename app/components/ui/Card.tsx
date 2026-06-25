import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-surface-2 p-6", className)}
      {...props}
    />
  );
}

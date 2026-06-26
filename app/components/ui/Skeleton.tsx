import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

/** A loading placeholder. Set width/height via className. */
export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-surface-2", className)} {...props} />;
}

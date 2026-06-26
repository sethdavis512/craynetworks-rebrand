import type { ComponentPropsWithoutRef } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "../../lib/cn";

type ProgressProps = ComponentPropsWithoutRef<typeof BaseProgress.Root>;

export function Progress({ className, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root className={cn("w-full", className)} {...props}>
      <BaseProgress.Track className="h-2 w-full overflow-hidden rounded-full bg-border">
        <BaseProgress.Indicator className="h-full rounded-full bg-primary transition-all" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

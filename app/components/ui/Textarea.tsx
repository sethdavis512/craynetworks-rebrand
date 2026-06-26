import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-border bg-surface px-3 py-2 font-sans text-sm text-ink outline-none transition-[box-shadow,border-color] placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

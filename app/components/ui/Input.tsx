import type { ComponentPropsWithoutRef } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "../../lib/cn";

type InputProps = ComponentPropsWithoutRef<typeof BaseInput>;

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface px-3 font-sans text-sm text-ink outline-none transition-[box-shadow,border-color] placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

import type { ComponentPropsWithoutRef } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "../../lib/cn";

type CheckboxProps = ComponentPropsWithoutRef<typeof BaseCheckbox.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "flex size-5 items-center justify-center rounded border border-border bg-surface outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:border-primary data-[checked]:bg-primary data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex text-on-primary">
        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

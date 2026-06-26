import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { cn } from "../../lib/cn";

type RadioGroupProps = ComponentPropsWithoutRef<typeof BaseRadioGroup>;

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function RadioItem({ value, children }: { value: string; children: ReactNode }) {
  return (
    <label className="flex items-center gap-2 font-sans text-sm text-ink">
      <Radio.Root
        value={value}
        className="flex size-5 items-center justify-center rounded-full border border-border bg-surface outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:border-primary data-[disabled]:opacity-50"
      >
        <Radio.Indicator className="size-2.5 rounded-full bg-primary" />
      </Radio.Root>
      {children}
    </label>
  );
}

import type { ComponentPropsWithoutRef } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "../../lib/cn";

type SwitchProps = ComponentPropsWithoutRef<typeof BaseSwitch.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full bg-border transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:bg-primary data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="size-5 translate-x-0.5 rounded-full bg-surface shadow transition-transform data-[checked]:translate-x-[1.125rem]" />
    </BaseSwitch.Root>
  );
}

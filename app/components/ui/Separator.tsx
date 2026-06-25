import type { ComponentPropsWithoutRef } from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "../../lib/cn";

type SeparatorProps = ComponentPropsWithoutRef<typeof BaseSeparator>;

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        "bg-border",
        orientation === "vertical" ? "h-full w-px" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}

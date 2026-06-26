import type { ReactElement, ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cn } from "../../lib/cn";

type PopoverProps = { trigger: ReactElement; children: ReactNode; title?: ReactNode; className?: string };

export function Popover({ trigger, children, title, className }: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={8}>
          <BasePopover.Popup
            className={cn(
              "w-72 rounded-lg border border-border bg-surface p-4 shadow-lg outline-none transition-[opacity,transform] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
              className,
            )}
          >
            {title ? <BasePopover.Title className="font-sans text-sm font-semibold text-ink">{title}</BasePopover.Title> : null}
            <div className={cn("text-sm leading-relaxed text-muted", title ? "mt-1" : undefined)}>{children}</div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

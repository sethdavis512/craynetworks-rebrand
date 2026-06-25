import type { ReactElement, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "../../lib/cn";

export type SheetSide = "top" | "right" | "bottom" | "left";

const sideClasses: Record<SheetSide, string> = {
  right:
    "right-0 top-0 h-dvh w-[min(22rem,92vw)] border-l data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
  left:
    "left-0 top-0 h-dvh w-[min(22rem,92vw)] border-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
  top:
    "inset-x-0 top-0 max-h-[90vh] border-b data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full",
  bottom:
    "inset-x-0 bottom-0 max-h-[90vh] border-t data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
};

type SheetProps = {
  side?: SheetSide;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Sheet({
  side = "right",
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  className,
}: SheetProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-scrim transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <BaseDialog.Popup
          className={cn(
            "fixed z-50 flex flex-col gap-5 overflow-y-auto border-border bg-surface p-6 shadow-xl outline-none transition-transform duration-300 ease-out",
            sideClasses[side],
            className,
          )}
        >
          {title || description ? (
            <div>
              {title ? (
                <BaseDialog.Title className="font-sans text-lg font-semibold text-ink">{title}</BaseDialog.Title>
              ) : null}
              {description ? (
                <BaseDialog.Description className="mt-1 text-sm leading-relaxed text-muted">
                  {description}
                </BaseDialog.Description>
              ) : null}
            </div>
          ) : null}
          <div className="min-h-0 flex-1">{children}</div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

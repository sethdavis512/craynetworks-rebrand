import type { ReactElement, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "../../lib/cn";
import { Button } from "./Button";

type DialogProps = {
  trigger: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Dialog({ trigger, title, description, children, className }: DialogProps) {
  return (
    <BaseDialog.Root>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-scrim transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <BaseDialog.Popup
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-6 shadow-lg outline-none transition-[opacity,transform] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className,
          )}
        >
          <BaseDialog.Title className="font-sans text-lg font-semibold text-ink">{title}</BaseDialog.Title>
          {description ? (
            <BaseDialog.Description className="mt-1 text-sm leading-relaxed text-muted">
              {description}
            </BaseDialog.Description>
          ) : null}
          {children ? <div className="mt-4">{children}</div> : null}
          <div className="mt-6 flex justify-end gap-2">
            <BaseDialog.Close render={<Button variant="outline" size="sm">Close</Button>} />
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

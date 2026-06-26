import type { ReactElement } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "../../lib/cn";

export type MenuItem = { label: string; onClick?: () => void };

export function Menu({ trigger, items, className }: { trigger: ReactElement; items: MenuItem[]; className?: string }) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={6} align="start">
          <BaseMenu.Popup
            className={cn(
              "min-w-44 rounded-lg border border-border bg-surface p-1 shadow-lg outline-none transition-[opacity,transform] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
              className,
            )}
          >
            {items.map((it) => (
              <BaseMenu.Item
                key={it.label}
                onClick={it.onClick}
                className="cursor-default rounded-md px-3 py-1.5 font-sans text-sm text-ink outline-none transition-colors data-[highlighted]:bg-surface-2"
              >
                {it.label}
              </BaseMenu.Item>
            ))}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

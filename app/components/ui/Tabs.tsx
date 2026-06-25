import type { ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "../../lib/cn";

export type TabItem = { value: string; label: string; content: ReactNode };

type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
};

export function Tabs({ items, defaultValue, className }: TabsProps) {
  return (
    <BaseTabs.Root defaultValue={defaultValue ?? items[0]?.value} className={cn("w-full", className)}>
      <BaseTabs.List className="flex gap-1 border-b border-border">
        {items.map((it) => (
          <BaseTabs.Tab
            key={it.value}
            value={it.value}
            className="-mb-px cursor-default border-b-2 border-transparent px-3 py-2 font-sans text-sm text-muted outline-none transition-colors hover:text-ink focus-visible:text-ink data-[selected]:border-primary data-[selected]:text-ink"
          >
            {it.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((it) => (
        <BaseTabs.Panel key={it.value} value={it.value} className="pt-4 text-sm leading-relaxed text-muted">
          {it.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}

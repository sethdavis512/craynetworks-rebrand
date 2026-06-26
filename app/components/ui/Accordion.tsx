import type { ReactNode } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cn } from "../../lib/cn";

export type AccordionItem = { value: string; trigger: ReactNode; content: ReactNode };

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <BaseAccordion.Root className={cn("w-full divide-y divide-border rounded-lg border border-border", className)}>
      {items.map((it) => (
        <BaseAccordion.Item key={it.value} value={it.value} className="px-4">
          <BaseAccordion.Header>
            <BaseAccordion.Trigger className="group flex w-full items-center justify-between gap-4 py-3 text-left font-sans text-sm font-medium text-ink outline-none focus-visible:text-primary-strong">
              {it.trigger}
              <svg
                viewBox="0 0 12 12"
                className="size-3 shrink-0 text-muted transition-transform group-data-[panel-open]:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="overflow-hidden pb-3 text-sm leading-relaxed text-muted">
            {it.content}
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}

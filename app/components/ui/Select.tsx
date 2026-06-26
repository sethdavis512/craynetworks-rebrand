import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "../../lib/cn";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  items: SelectOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function Select({ items, defaultValue, value, onValueChange, placeholder = "Select...", className }: SelectProps) {
  return (
    <BaseSelect.Root
      items={items}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange ? (v) => onValueChange(v ?? "") : undefined}
    >
      <BaseSelect.Trigger
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 font-sans text-sm text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          className,
        )}
      >
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon className="text-muted">
          <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={6}>
          <BaseSelect.Popup className="max-h-72 min-w-44 overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg outline-none">
            {items.map((it) => (
              <BaseSelect.Item
                key={it.value}
                value={it.value}
                className="flex cursor-default items-center justify-between gap-2 rounded-md px-3 py-1.5 font-sans text-sm text-ink outline-none data-[highlighted]:bg-surface-2"
              >
                <BaseSelect.ItemText>{it.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="text-primary-strong">
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

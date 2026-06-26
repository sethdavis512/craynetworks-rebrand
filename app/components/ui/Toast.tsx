import type { ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { Button } from "./Button";

/** Imperatively raise a toast: `const toast = useToast(); toast.add({ title, description })`. */
export const useToast = BaseToast.useToastManager;

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((toast) => (
    <BaseToast.Root
      key={toast.id}
      toast={toast}
      className="relative w-72 rounded-lg border border-border bg-surface p-4 pr-8 shadow-lg outline-none transition-all data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
    >
      <BaseToast.Title className="font-sans text-sm font-semibold text-ink" />
      <BaseToast.Description className="mt-1 font-sans text-xs leading-relaxed text-muted" />
      <BaseToast.Close className="absolute right-2 top-2 text-muted transition-colors hover:text-ink" aria-label="Close">
        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
        </svg>
      </BaseToast.Close>
    </BaseToast.Root>
  ));
}

/** Wrap any subtree that needs toasts; renders a fixed bottom-right viewport. */
export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <BaseToast.Provider>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed bottom-4 right-4 z-50 flex w-72 flex-col gap-2">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToastButton() {
  const toast = useToast();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => toast.add({ title: "Backup complete", description: "Your data is safe and offsite." })}
    >
      Show toast
    </Button>
  );
}

/** Self-contained example for the gallery. */
export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  );
}

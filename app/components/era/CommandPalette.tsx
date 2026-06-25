import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";

type Command = { label: string; to: string; hint?: string };

const COMMANDS: Command[] = [
  { label: "Home", to: "/", hint: "marketing" },
  { label: "All services", to: "/services", hint: "services" },
  { label: "Request a quote", to: "/quote", hint: "estimate" },
  { label: "Admin", to: "/admin", hint: "internal" },
  { label: "Behind the rebrand", to: "/admin/behind-the-rebrand", hint: "case study" },
  { label: "Component gallery", to: "/admin/components", hint: "system" },
  { label: "Studio", to: "/admin/studio", hint: "type + color" },
];

/**
 * Cmd/Ctrl-K command palette: the 2056 navigation paradigm. Built on the accessible Base UI
 * dialog (focus trap, Esc, ARIA). Navigations use a view transition for the cinematic morph.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return COMMANDS;
    return COMMANDS.filter((c) => `${c.label} ${c.hint ?? ""}`.toLowerCase().includes(term));
  }, [q]);

  const go = (to: string) => {
    setOpen(false);
    setQ("");
    navigate(to, { viewTransition: true });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-30 hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 font-mono text-xs text-muted shadow-lg backdrop-blur-md transition-colors hover:text-ink sm:inline-flex"
      >
        <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-primary-strong">&#8984;K</kbd> command
      </button>

      <BaseDialog.Root open={open} onOpenChange={setOpen}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-scrim backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <BaseDialog.Popup className="fixed left-1/2 top-[16%] z-50 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl outline-none transition-[opacity,transform] data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <BaseDialog.Title className="sr-only">Command palette</BaseDialog.Title>
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the system..."
              aria-label="Search the system"
              className="w-full border-b border-border bg-transparent px-5 py-4 font-mono text-sm text-ink outline-none placeholder:text-muted"
            />
            <ul className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center font-mono text-sm text-muted">No matching nodes</li>
              ) : (
                results.map((c) => (
                  <li key={c.to}>
                    <button
                      type="button"
                      onClick={() => go(c.to)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-sans text-sm text-ink transition-colors hover:bg-surface-2"
                    >
                      <span>{c.label}</span>
                      {c.hint ? <span className="font-mono text-xs text-muted">{c.hint}</span> : null}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </>
  );
}

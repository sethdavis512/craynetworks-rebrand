import { Link, NavLink, Outlet } from "react-router";
import { cn } from "../lib/cn";
import { Logo } from "../components/brand/Logo";

const adminNav = [
  { to: "/admin/components", label: "Components", shortLabel: "Components" },
  { to: "/admin/studio", label: "Studio", shortLabel: "Studio" },
  { to: "/admin/behind-the-rebrand", label: "Behind the rebrand", shortLabel: "Rebrand" },
];

/** Admin shell: a persistent nav so every admin route links to the others. */
export default function AdminLayout() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Link to="/admin" aria-label="Cray Networks admin">
              <Logo showWordmark={false} className="sm:hidden" />
              <Logo className="hidden sm:inline-flex" />
            </Link>
            <span className="font-sans text-xs text-muted">admin</span>
          </div>
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {adminNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-2 py-1.5 font-sans text-sm whitespace-nowrap transition-colors sm:px-3",
                    isActive ? "bg-primary/10 text-primary-strong" : "text-muted hover:bg-surface-2 hover:text-ink",
                  )
                }
              >
                <span className="sm:hidden">{l.shortLabel}</span>
                <span className="hidden sm:inline">{l.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

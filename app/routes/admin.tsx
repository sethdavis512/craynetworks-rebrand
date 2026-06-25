import { Link, NavLink, Outlet } from "react-router";
import { cn } from "../lib/cn";

const adminNav = [
  { to: "/admin/components", label: "Components" },
  { to: "/admin/studio", label: "Studio" },
  { to: "/admin/colophon", label: "Colophon" },
];

/** Admin shell: a persistent nav so every admin route links to the others. */
export default function AdminLayout() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-baseline gap-2">
            <Link to="/admin" className="font-sans text-sm font-semibold text-ink">
              cray networks
            </Link>
            <span className="font-sans text-xs text-muted">admin</span>
          </div>
          <nav className="flex items-center gap-1">
            {adminNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-1.5 font-sans text-sm transition-colors",
                    isActive ? "bg-primary/10 text-primary-strong" : "text-muted hover:bg-surface-2 hover:text-ink",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/" className="rounded-md px-3 py-1.5 font-sans text-sm text-muted transition-colors hover:text-ink">
              View site
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

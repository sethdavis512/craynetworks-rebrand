import { NavLink, Outlet } from "react-router";
import { componentsByCategory } from "../components/gallery/registry";
import { cn } from "../lib/cn";

export default function ComponentsLayout() {
  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-6 py-12">
      <aside className="hidden w-52 shrink-0 md:block">
        <nav className="sticky top-12 space-y-6">
          <NavLink to="/admin/components" end className="block font-sans text-sm font-semibold text-ink">
            Components
          </NavLink>
          {componentsByCategory().map(({ category, items }) => (
            <div key={category}>
              <p className="mb-2 font-sans text-xs font-semibold text-muted">{category}</p>
              <ul className="space-y-1">
                {items.map((c) => (
                  <li key={c.slug}>
                    <NavLink
                      to={`/admin/components/${c.slug}`}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-md px-2 py-1 font-sans text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted hover:bg-surface-2 hover:text-ink",
                        )
                      }
                    >
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

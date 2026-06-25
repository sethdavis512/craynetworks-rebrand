import { Link } from "react-router";
import { Logo } from "../brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <Logo />
        <nav className="flex gap-4 font-sans text-sm text-muted">
          <Link to="/services" className="hover:text-ink">Services</Link>
          <Link to="/#contact" className="hover:text-ink">Contact</Link>
        </nav>
        <p className="font-sans text-sm text-muted">Central Texas IT, since 2003.</p>
      </div>
    </footer>
  );
}

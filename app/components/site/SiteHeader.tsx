import { Link } from "react-router";
import { Logo } from "../brand/Logo";
import { buttonVariants } from "../ui/Button";
import { Dialog } from "../ui/Dialog";
import { Input } from "../ui/Input";
import joinIcon from "../../images/join-icon.png";

function JoinForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3">
      <Input aria-label="Join code" placeholder="Enter your code" className="flex-1" />
      <button
        type="submit"
        aria-label="Join"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-hover"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="Cray Networks home">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Dialog
            trigger={
              <button
                type="button"
                aria-label="Join with a code"
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-sans text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <img src={joinIcon} alt="" className="size-5" />
                ConnectWise
              </button>
            }
            title={
              <span>
                <span className="text-primary">Join</span> with a code
              </span>
            }
          >
            <JoinForm />
          </Dialog>
          <Link
            to="/services"
            className="hidden rounded-md px-3 py-1.5 font-sans text-sm text-muted transition-colors hover:text-ink sm:inline-block"
          >
            Services
          </Link>
          <Link to="/#contact" className={buttonVariants({ size: "sm" })}>
            Request a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}

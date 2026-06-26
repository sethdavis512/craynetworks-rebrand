import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type FieldProps = {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Label + control + hint/error wrapper for consistent form rows. */
export function Field({ label, htmlFor, hint, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="font-sans text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p className="font-sans text-xs text-danger-strong">{error}</p>
      ) : hint ? (
        <p className="font-sans text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

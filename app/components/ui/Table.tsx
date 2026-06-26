import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

/** Lightweight styled table primitives. Compose: Table > THead/TBody > TR > TH/TD. */
export function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className={cn("w-full border-collapse font-sans text-sm", className)} {...props} />
    </div>
  );
}

export function THead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("bg-surface-2 text-left text-muted", className)} {...props} />;
}

export function TBody(props: ComponentPropsWithoutRef<"tbody">) {
  return <tbody {...props} />;
}

export function TR({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return <tr className={cn("border-t border-border", className)} {...props} />;
}

export function TH({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return <th className={cn("px-4 py-2.5 font-medium", className)} {...props} />;
}

export function TD({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return <td className={cn("px-4 py-2.5 text-ink", className)} {...props} />;
}

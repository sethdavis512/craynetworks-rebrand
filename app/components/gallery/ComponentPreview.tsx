import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

type ComponentPreviewProps = {
  children: ReactNode;
  code: string;
};

/** Kumo-style: live preview pane with the source shown directly beneath it. */
export function ComponentPreview({ children, code }: ComponentPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex min-h-32 flex-wrap items-center gap-3 bg-surface p-8">{children}</div>
      <div className="border-t border-border">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

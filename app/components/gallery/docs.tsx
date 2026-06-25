import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Switch } from "../ui/Switch";
import type { ApiRow } from "./ApiTable";

export type DocSection = { id: string; title: string; preview: ReactNode; code: string };
export type DocEntry = {
  importLine: string;
  sections: DocSection[];
  api: ApiRow[];
  accessibility: string[];
};

export const docs: Record<string, DocEntry> = {
  button: {
    importLine: `import { Button } from "~/components/ui/Button";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <Button>Request a quote</Button>,
        code: `<Button>Request a quote</Button>`,
      },
      {
        id: "variants",
        title: "Variants",
        preview: (
          <>
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </>
        ),
        code: `<Button>Primary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="danger">Danger</Button>`,
      },
      {
        id: "examples",
        title: "Sizes",
        preview: (
          <>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </>
        ),
        code: `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`,
      },
    ],
    api: [
      { prop: "variant", type: `"primary" | "outline" | "ghost" | "danger"`, default: `"primary"`, description: "Visual style of the button." },
      { prop: "size", type: `"sm" | "md" | "lg"`, default: `"md"`, description: "Control height and padding." },
      { prop: "disabled", type: "boolean", default: "false", description: "Disable interaction and dim the button." },
    ],
    accessibility: [
      "Renders a native button element, so keyboard activation and screen-reader semantics work by default.",
      "Focus-visible shows a token-colored outline; the disabled state removes pointer events.",
    ],
  },

  input: {
    importLine: `import { Input } from "~/components/ui/Input";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <Input placeholder="you@business.com" aria-label="Email" className="max-w-xs" />,
        code: `<Input placeholder="you@business.com" />`,
      },
      {
        id: "examples",
        title: "Disabled",
        preview: <Input placeholder="Disabled" aria-label="Disabled field" disabled className="max-w-xs" />,
        code: `<Input placeholder="Disabled" disabled />`,
      },
    ],
    api: [
      { prop: "disabled", type: "boolean", default: "false", description: "Disable the field." },
      { prop: "...props", type: "InputHTMLAttributes", description: "All native input props (type, value, onChange, placeholder)." },
    ],
    accessibility: [
      "Built on the Base UI Input primitive; always pair with a label or aria-label.",
      "Sets a data-disabled attribute rather than relying on the :disabled pseudo-class.",
    ],
  },

  switch: {
    importLine: `import { Switch } from "~/components/ui/Switch";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <>
            <Switch defaultChecked aria-label="Enabled" />
            <Switch aria-label="Disabled setting" />
          </>
        ),
        code: `<Switch defaultChecked />\n<Switch />`,
      },
    ],
    api: [
      { prop: "checked", type: "boolean", description: "Controlled checked state." },
      { prop: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when the state changes." },
      { prop: "disabled", type: "boolean", default: "false", description: "Disable the switch." },
    ],
    accessibility: [
      "Built on the Base UI Switch primitive: full keyboard support and role=switch.",
      "State is exposed via data-checked / data-disabled attributes for styling.",
    ],
  },

  badge: {
    importLine: `import { Badge } from "~/components/ui/Badge";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <Badge>Active</Badge>,
        code: `<Badge>Active</Badge>`,
      },
      {
        id: "variants",
        title: "Tones",
        preview: (
          <>
            <Badge>Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="success">Online</Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="danger">Outage</Badge>
          </>
        ),
        code: `<Badge>Neutral</Badge>\n<Badge tone="primary">Primary</Badge>\n<Badge tone="success">Online</Badge>\n<Badge tone="warning">Pending</Badge>\n<Badge tone="danger">Outage</Badge>`,
      },
    ],
    api: [
      { prop: "tone", type: `"neutral" | "primary" | "success" | "warning" | "danger"`, default: `"neutral"`, description: "Semantic color of the badge." },
    ],
    accessibility: [
      "Purely presentational by default; if the badge conveys status, include accompanying text rather than color alone.",
    ],
  },

  card: {
    importLine: `import { Card } from "~/components/ui/Card";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Card className="max-w-sm">
            <h3 className="font-sans text-lg font-semibold text-ink">Network management</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Proactive monitoring and maintenance, so problems get fixed before you notice them.
            </p>
          </Card>
        ),
        code: `<Card>\n  <h3>Network management</h3>\n  <p>Proactive monitoring and maintenance.</p>\n</Card>`,
      },
    ],
    api: [
      { prop: "...props", type: "HTMLDivAttributes", description: "All native div props; className merges with the base styles." },
    ],
    accessibility: [
      "A plain surface container with no implicit semantics; add headings and landmarks as the content requires.",
    ],
  },
};

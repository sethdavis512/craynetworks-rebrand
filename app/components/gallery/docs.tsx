import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Switch } from "../ui/Switch";
import { Checkbox } from "../ui/Checkbox";
import { Tabs } from "../ui/Tabs";
import { Dialog } from "../ui/Dialog";
import { Tooltip } from "../ui/Tooltip";
import { Avatar } from "../ui/Avatar";
import { Separator } from "../ui/Separator";
import { Banner } from "../ui/Banner";
import { Sheet } from "../ui/Sheet";
import { Textarea } from "../ui/Textarea";
import { Field } from "../ui/Field";
import { Select } from "../ui/Select";
import { RadioGroup, RadioItem } from "../ui/RadioGroup";
import { Slider } from "../ui/Slider";
import { Menu } from "../ui/Menu";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { Accordion } from "../ui/Accordion";
import { Popover } from "../ui/Popover";
import { ToastDemo } from "../ui/Toast";
import { Table, THead, TBody, TR, TH, TD } from "../ui/Table";
import { Progress } from "../ui/Progress";
import { Skeleton } from "../ui/Skeleton";
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

  checkbox: {
    importLine: `import { Checkbox } from "~/components/ui/Checkbox";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <>
            <Checkbox defaultChecked aria-label="Subscribed" />
            <Checkbox aria-label="Not subscribed" />
          </>
        ),
        code: `<Checkbox defaultChecked />\n<Checkbox />`,
      },
    ],
    api: [
      { prop: "checked", type: "boolean", description: "Controlled checked state." },
      { prop: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial state." },
      { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when the state changes." },
      { prop: "disabled", type: "boolean", default: "false", description: "Disable the checkbox." },
    ],
    accessibility: [
      "Built on the Base UI Checkbox primitive with role=checkbox and full keyboard support.",
      "State is exposed via data-checked / data-disabled for styling.",
    ],
  },

  tabs: {
    importLine: `import { Tabs } from "~/components/ui/Tabs";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Tabs
            className="max-w-sm"
            items={[
              { value: "overview", label: "Overview", content: "Proactive monitoring keeps systems healthy." },
              { value: "pricing", label: "Pricing", content: "Flat monthly plans, no surprises." },
              { value: "support", label: "Support", content: "Local techs, same-day response." },
            ]}
          />
        ),
        code: `<Tabs\n  items={[\n    { value: "overview", label: "Overview", content: <p>...</p> },\n    { value: "pricing", label: "Pricing", content: <p>...</p> },\n  ]}\n/>`,
      },
    ],
    api: [
      { prop: "items", type: "{ value, label, content }[]", description: "The tabs to render." },
      { prop: "defaultValue", type: "string", default: "items[0].value", description: "Initially selected tab." },
    ],
    accessibility: [
      "Built on the Base UI Tabs primitive: arrow-key navigation and correct tab/panel ARIA wiring.",
      "The selected tab is exposed via data-selected for styling.",
    ],
  },

  dialog: {
    importLine: `import { Dialog } from "~/components/ui/Dialog";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Dialog
            trigger={<Button>Create a worker</Button>}
            title="Create a worker"
            description="Spin up a new edge worker for this account."
          >
            <p className="text-sm leading-relaxed text-muted">
              Workers deploy globally in seconds. Name it and confirm to continue.
            </p>
          </Dialog>
        ),
        code: `<Dialog\n  trigger={<Button>Create a worker</Button>}\n  title="Create a worker"\n  description="Spin up a new edge worker."\n>\n  <p>...</p>\n</Dialog>`,
      },
    ],
    api: [
      { prop: "trigger", type: "ReactElement", description: "Element that opens the dialog (props are merged in)." },
      { prop: "title", type: "ReactNode", description: "Dialog title (announced to screen readers)." },
      { prop: "description", type: "ReactNode", description: "Optional supporting text." },
      { prop: "children", type: "ReactNode", description: "Dialog body content." },
    ],
    accessibility: [
      "Built on the Base UI Dialog primitive: focus is trapped, the backdrop is inert, and Escape closes.",
      "Title and description are wired to aria-labelledby / aria-describedby automatically.",
    ],
  },

  tooltip: {
    importLine: `import { Tooltip } from "~/components/ui/Tooltip";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Tooltip content="Add a worker">
            <Button variant="outline" size="sm">
              Hover me
            </Button>
          </Tooltip>
        ),
        code: `<Tooltip content="Add a worker">\n  <Button variant="outline" size="sm">Hover me</Button>\n</Tooltip>`,
      },
    ],
    api: [
      { prop: "children", type: "ReactElement", description: "The trigger element (hover/focus target)." },
      { prop: "content", type: "ReactNode", description: "The tooltip content." },
    ],
    accessibility: [
      "Built on the Base UI Tooltip primitive: shows on hover and keyboard focus, hides on Escape.",
      "Pair with a trigger that has an accessible label; tooltips supplement, not replace, labels.",
    ],
  },

  avatar: {
    importLine: `import { Avatar } from "~/components/ui/Avatar";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <>
            <Avatar fallback="CN" />
            <Avatar fallback="SD" />
          </>
        ),
        code: `<Avatar fallback="CN" />\n<Avatar src="/seth.jpg" alt="Seth" fallback="SD" />`,
      },
    ],
    api: [
      { prop: "src", type: "string", description: "Image URL; falls back to initials if it fails to load." },
      { prop: "alt", type: "string", description: "Alt text for the image." },
      { prop: "fallback", type: "string", description: "Initials shown when there is no image." },
    ],
    accessibility: [
      "Built on the Base UI Avatar primitive; the fallback renders if the image is missing or slow.",
      "Provide meaningful alt text when the avatar conveys identity.",
    ],
  },

  separator: {
    importLine: `import { Separator } from "~/components/ui/Separator";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <div className="flex items-center gap-3 font-sans text-sm text-muted">
            <span>Home</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Docs</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Pricing</span>
          </div>
        ),
        code: `<Separator />\n<Separator orientation="vertical" className="h-4" />`,
      },
    ],
    api: [
      { prop: "orientation", type: `"horizontal" | "vertical"`, default: `"horizontal"`, description: "Direction of the divider." },
    ],
    accessibility: [
      "Built on the Base UI Separator primitive with role=separator and the correct aria-orientation.",
    ],
  },

  banner: {
    importLine: `import { Banner } from "~/components/ui/Banner";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <Banner className="max-w-sm">Scheduled maintenance this Sunday at 2am CT.</Banner>,
        code: `<Banner>Scheduled maintenance this Sunday at 2am CT.</Banner>`,
      },
      {
        id: "variants",
        title: "Tones",
        preview: (
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Banner tone="info">A new dashboard is available.</Banner>
            <Banner tone="success">Backup completed successfully.</Banner>
            <Banner tone="warning">Your certificate expires in 7 days.</Banner>
            <Banner tone="danger">We detected an outage in your region.</Banner>
          </div>
        ),
        code: `<Banner tone="info">...</Banner>\n<Banner tone="success">...</Banner>\n<Banner tone="warning">...</Banner>\n<Banner tone="danger">...</Banner>`,
      },
    ],
    api: [
      { prop: "tone", type: `"info" | "success" | "warning" | "danger"`, default: `"info"`, description: "Semantic intent of the message." },
    ],
    accessibility: [
      "Renders with role=status so assistive tech announces the message politely.",
      "Conveys intent with text and border, not color alone.",
    ],
  },

  sheet: {
    importLine: `import { Sheet } from "~/components/ui/Sheet";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Sheet
            side="right"
            trigger={<Button>Open panel</Button>}
            title="Panel"
            description="Slides in from the right."
          >
            <p className="text-sm leading-relaxed text-muted">
              The global theme Drawer is this same component with side=right.
            </p>
          </Sheet>
        ),
        code: `<Sheet\n  side="right"\n  trigger={<Button>Open panel</Button>}\n  title="Panel"\n>\n  ...\n</Sheet>`,
      },
    ],
    api: [
      { prop: "side", type: `"top" | "right" | "bottom" | "left"`, default: `"right"`, description: "Edge the panel slides from." },
      { prop: "trigger", type: "ReactElement", description: "Element that opens the sheet (uncontrolled use)." },
      { prop: "open", type: "boolean", description: "Controlled open state." },
      { prop: "onOpenChange", type: "(open: boolean) => void", description: "Controlled open handler." },
      { prop: "title", type: "ReactNode", description: "Panel title." },
      { prop: "description", type: "ReactNode", description: "Optional supporting text." },
    ],
    accessibility: [
      "Built on the Base UI Dialog primitive: focus trap, scroll lock, Escape to close, and aria wiring.",
      "The global theme Drawer is this component with side=right.",
    ],
  },

  textarea: {
    importLine: `import { Textarea } from "~/components/ui/Textarea";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <Textarea placeholder="Tell us what is going on..." aria-label="Message" className="max-w-sm" />,
        code: `<Textarea placeholder="Tell us what is going on..." />`,
      },
    ],
    api: [{ prop: "...props", type: "TextareaHTMLAttributes", description: "All native textarea props." }],
    accessibility: ["A native textarea; always pair with a label or aria-label."],
  },

  select: {
    importLine: `import { Select } from "~/components/ui/Select";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Select
            className="max-w-xs"
            defaultValue="managed"
            items={[
              { value: "managed", label: "Managed IT" },
              { value: "repair", label: "Computer repair" },
              { value: "hosting", label: "Web hosting" },
            ]}
          />
        ),
        code: `<Select\n  defaultValue="managed"\n  items={[{ value: "managed", label: "Managed IT" }, ...]}\n/>`,
      },
    ],
    api: [
      { prop: "items", type: "{ value, label }[]", description: "The options to choose from." },
      { prop: "value / defaultValue", type: "string", description: "Selected value (controlled / uncontrolled)." },
      { prop: "onValueChange", type: "(value: string) => void", description: "Selection handler." },
    ],
    accessibility: ["Built on the Base UI Select primitive: keyboard navigation, typeahead, and listbox ARIA."],
  },

  "radio-group": {
    importLine: `import { RadioGroup, RadioItem } from "~/components/ui/RadioGroup";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <RadioGroup defaultValue="monthly">
            <RadioItem value="monthly">Monthly</RadioItem>
            <RadioItem value="annual">Annual</RadioItem>
          </RadioGroup>
        ),
        code: `<RadioGroup defaultValue="monthly">\n  <RadioItem value="monthly">Monthly</RadioItem>\n  <RadioItem value="annual">Annual</RadioItem>\n</RadioGroup>`,
      },
    ],
    api: [
      { prop: "value / defaultValue", type: "string", description: "Selected radio." },
      { prop: "onValueChange", type: "(value: string) => void", description: "Change handler." },
    ],
    accessibility: ["Built on the Base UI RadioGroup: arrow-key navigation and radiogroup/radio ARIA."],
  },

  slider: {
    importLine: `import { Slider } from "~/components/ui/Slider";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <Slider defaultValue={40} className="max-w-xs" aria-label="Amount" />,
        code: `<Slider defaultValue={40} />`,
      },
    ],
    api: [
      { prop: "value / defaultValue", type: "number | number[]", description: "Current value(s)." },
      { prop: "min / max / step", type: "number", description: "Range bounds and increment." },
      { prop: "onValueChange", type: "(value) => void", description: "Change handler." },
    ],
    accessibility: ["Built on the Base UI Slider: keyboard support and slider ARIA; give it an aria-label."],
  },

  field: {
    importLine: `import { Field } from "~/components/ui/Field";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Field label="Email" hint="We never share it." className="max-w-sm">
            <Input type="email" placeholder="you@business.com" aria-label="Email" />
          </Field>
        ),
        code: `<Field label="Email" hint="We never share it.">\n  <Input type="email" />\n</Field>`,
      },
      {
        id: "error",
        title: "With error",
        preview: (
          <Field label="Email" error="Enter a valid email." className="max-w-sm">
            <Input aria-label="Email" aria-invalid />
          </Field>
        ),
        code: `<Field label="Email" error="Enter a valid email.">\n  <Input aria-invalid />\n</Field>`,
      },
    ],
    api: [
      { prop: "label", type: "string", description: "The field label." },
      { prop: "hint", type: "ReactNode", description: "Helper text under the control." },
      { prop: "error", type: "ReactNode", description: "Error message (shown instead of the hint)." },
    ],
    accessibility: ["Renders a label element; pass htmlFor plus a matching id on the control to associate them."],
  },

  menu: {
    importLine: `import { Menu } from "~/components/ui/Menu";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Menu
            trigger={
              <Button variant="outline" size="sm">
                Actions
              </Button>
            }
            items={[{ label: "Rename" }, { label: "Duplicate" }, { label: "Delete" }]}
          />
        ),
        code: `<Menu\n  trigger={<Button>Actions</Button>}\n  items={[{ label: "Rename", onClick }, ...]}\n/>`,
      },
    ],
    api: [
      { prop: "trigger", type: "ReactElement", description: "Element that opens the menu." },
      { prop: "items", type: "{ label, onClick }[]", description: "The menu items." },
    ],
    accessibility: ["Built on the Base UI Menu: roving focus, typeahead, Escape to close, and menu ARIA."],
  },

  breadcrumbs: {
    importLine: `import { Breadcrumbs } from "~/components/ui/Breadcrumbs";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Breadcrumbs
            items={[{ label: "Home", href: "#" }, { label: "Services", href: "#" }, { label: "Computer repair" }]}
          />
        ),
        code: `<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Computer repair" }]} />`,
      },
    ],
    api: [{ prop: "items", type: "{ label, href? }[]", description: "The trail; the last item is the current page." }],
    accessibility: ["A nav[aria-label=Breadcrumb] with an ordered list; the current page carries aria-current."],
  },

  accordion: {
    importLine: `import { Accordion } from "~/components/ui/Accordion";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Accordion
            className="max-w-md"
            items={[
              { value: "a", trigger: "What is managed IT?", content: "Proactive monitoring and maintenance." },
              { value: "b", trigger: "Do you come on-site?", content: "Yes, across Central Texas and the Hill Country." },
            ]}
          />
        ),
        code: `<Accordion items={[{ value, trigger, content }, ...]} />`,
      },
    ],
    api: [{ prop: "items", type: "{ value, trigger, content }[]", description: "The collapsible sections." }],
    accessibility: ["Built on the Base UI Accordion: header/button/region wiring and keyboard support."],
  },

  popover: {
    importLine: `import { Popover } from "~/components/ui/Popover";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Popover
            trigger={
              <Button variant="outline" size="sm">
                Details
              </Button>
            }
            title="Service window"
          >
            <p>On-site visits run 8am to 6pm, Monday through Friday.</p>
          </Popover>
        ),
        code: `<Popover trigger={<Button>Details</Button>} title="Service window">\n  <p>...</p>\n</Popover>`,
      },
    ],
    api: [
      { prop: "trigger", type: "ReactElement", description: "Element that opens the popover." },
      { prop: "title", type: "ReactNode", description: "Optional heading." },
      { prop: "children", type: "ReactNode", description: "Popover body." },
    ],
    accessibility: ["Built on the Base UI Popover: focus management, Escape to close, and aria wiring."],
  },

  toast: {
    importLine: `import { ToastProvider, useToast } from "~/components/ui/Toast";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <ToastDemo />,
        code: `// wrap a subtree once\n<ToastProvider>{children}</ToastProvider>\n\n// then, anywhere inside\nconst toast = useToast();\ntoast.add({ title: "Backup complete", description: "..." });`,
      },
    ],
    api: [
      { prop: "ToastProvider", type: "component", description: "Wrap the subtree; renders the viewport." },
      { prop: "useToast().add", type: "({ title, description }) => void", description: "Raise a toast." },
    ],
    accessibility: ["Built on the Base UI Toast: a polite live region with timeout and swipe dismissal."],
  },

  table: {
    importLine: `import { Table, THead, TBody, TR, TH, TD } from "~/components/ui/Table";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <Table className="max-w-md">
            <THead>
              <TR>
                <TH>Service</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>Web hosting</TD>
                <TD>Online</TD>
              </TR>
              <TR>
                <TD>Backups</TD>
                <TD>Online</TD>
              </TR>
            </TBody>
          </Table>
        ),
        code: `<Table>\n  <THead><TR><TH>Service</TH><TH>Status</TH></TR></THead>\n  <TBody><TR><TD>Web hosting</TD><TD>Online</TD></TR></TBody>\n</Table>`,
      },
    ],
    api: [
      { prop: "Table / THead / TBody / TR / TH / TD", type: "components", description: "Styled native table elements; className merges." },
    ],
    accessibility: ["Native table semantics; use TH for header cells and add a caption when the table needs context."],
  },

  progress: {
    importLine: `import { Progress } from "~/components/ui/Progress";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: <Progress value={68} className="max-w-xs" aria-label="Backup progress" />,
        code: `<Progress value={68} />`,
      },
    ],
    api: [
      { prop: "value", type: "number | null", description: "0-100; null for indeterminate." },
      { prop: "max", type: "number", default: "100", description: "Maximum value." },
    ],
    accessibility: ["Built on the Base UI Progress: role=progressbar with aria-valuenow / min / max."],
  },

  skeleton: {
    importLine: `import { Skeleton } from "~/components/ui/Skeleton";`,
    sections: [
      {
        id: "usage",
        title: "Usage",
        preview: (
          <div className="w-full max-w-xs space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ),
        code: `<Skeleton className="h-4 w-3/4" />`,
      },
    ],
    api: [{ prop: "className", type: "string", description: "Set the width, height, and shape." }],
    accessibility: ["Decorative (aria-hidden); mark the surrounding region aria-busy while content loads."],
  },
};

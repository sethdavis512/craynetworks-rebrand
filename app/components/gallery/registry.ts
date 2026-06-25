export type Category = "Forms" | "Navigation" | "Overlays" | "Data display" | "Feedback";

export type ComponentMeta = {
  slug: string;
  name: string;
  category: Category;
  summary: string;
};

/** Sidebar + index source of truth. Grows as the library grows. */
export const components: ComponentMeta[] = [
  { slug: "button", name: "Button", category: "Forms", summary: "Trigger an action or submit a form." },
  { slug: "input", name: "Input", category: "Forms", summary: "A single-line text field." },
  { slug: "checkbox", name: "Checkbox", category: "Forms", summary: "Toggle a value in a group or form." },
  { slug: "switch", name: "Switch", category: "Forms", summary: "Toggle a single setting on or off." },
  { slug: "tabs", name: "Tabs", category: "Navigation", summary: "Switch between related panels." },
  { slug: "dialog", name: "Dialog", category: "Overlays", summary: "A modal surface for focused tasks." },
  { slug: "tooltip", name: "Tooltip", category: "Overlays", summary: "A hint shown on hover or focus." },
  { slug: "sheet", name: "Sheet", category: "Overlays", summary: "A panel that slides in from any edge." },
  { slug: "badge", name: "Badge", category: "Data display", summary: "A small status or category label." },
  { slug: "card", name: "Card", category: "Data display", summary: "A surface that groups related content." },
  { slug: "avatar", name: "Avatar", category: "Data display", summary: "Represent a person or entity." },
  { slug: "separator", name: "Separator", category: "Data display", summary: "Divide content into sections." },
  { slug: "banner", name: "Banner", category: "Feedback", summary: "Communicate a status or message." },
];

export const categories: Category[] = ["Forms", "Navigation", "Overlays", "Data display", "Feedback"];

export function componentsByCategory() {
  return categories.map((category) => ({
    category,
    items: components.filter((c) => c.category === category),
  }));
}

export function getComponent(slug: string | undefined): ComponentMeta | undefined {
  return components.find((c) => c.slug === slug);
}

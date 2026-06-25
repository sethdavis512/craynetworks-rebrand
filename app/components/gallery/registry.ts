export type Category = "Forms" | "Data display";

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
  { slug: "switch", name: "Switch", category: "Forms", summary: "Toggle a single setting on or off." },
  { slug: "badge", name: "Badge", category: "Data display", summary: "A small status or category label." },
  { slug: "card", name: "Card", category: "Data display", summary: "A surface that groups related content." },
];

export const categories: Category[] = ["Forms", "Data display"];

export function componentsByCategory() {
  return categories.map((category) => ({
    category,
    items: components.filter((c) => c.category === category),
  }));
}

export function getComponent(slug: string | undefined): ComponentMeta | undefined {
  return components.find((c) => c.slug === slug);
}

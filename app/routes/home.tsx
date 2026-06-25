import type { Route } from "./+types/home";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cray Networks — token preview" },
    { name: "description", content: "Refined Cray Networks design tokens and first components." },
  ];
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <span className="font-sans text-sm font-semibold text-primary">cray networks</span>
        <Button variant="outline" size="sm" onClick={toggleTheme}>
          Toggle theme
        </Button>
      </div>

      <h1 className="mt-10 text-balance text-5xl font-semibold tracking-tight text-ink">
        Reliable IT, handled like a neighbor would.
      </h1>
      <p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-muted">
        This is the Literata body specimen set on a comfortable measure. The headings are Hanken
        Grotesk; the color is the refined Cray blue in OKLCH, with a navy-tinted dark mode and an
        amber pop. Toggle the theme to see the tokens flip.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button>Request a quote</Button>
        <Button variant="outline">Our services</Button>
        <Button variant="ghost">Learn more</Button>
        <Button variant="danger">Report an outage</Button>
        <Button disabled>Disabled</Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      <Card className="mt-12">
        <h2 className="text-xl font-semibold text-ink">Network management</h2>
        <p className="mt-2 max-w-[60ch] leading-relaxed text-muted">
          Proactive monitoring and maintenance so problems get fixed before you notice them. Built
          from the same Card and Button primitives, consuming the same tokens.
        </p>
        <div className="mt-5 flex gap-3">
          <Button size="sm">Get started</Button>
          <Button size="sm" variant="outline">
            Pricing
          </Button>
        </div>
      </Card>
    </main>
  );
}

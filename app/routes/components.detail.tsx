import type { Route } from "./+types/components.detail";
import { getComponent } from "../components/gallery/registry";
import { docs } from "../components/gallery/docs";
import { ComponentPreview } from "../components/gallery/ComponentPreview";
import { ApiTable } from "../components/gallery/ApiTable";
import { CodeBlock } from "../components/gallery/CodeBlock";

export function loader({ params }: Route.LoaderArgs) {
  const meta = getComponent(params.slug);
  if (!meta) throw new Response("Not Found", { status: 404 });
  return { meta };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const name = loaderData?.meta.name ?? "Component";
  return [{ title: `${name} — Cray Networks components` }];
}

export default function ComponentDetail({ loaderData }: Route.ComponentProps) {
  const { meta } = loaderData;
  const doc = docs[meta.slug];

  const toc = [
    { id: "installation", label: "Installation" },
    ...doc.sections.map((s) => ({ id: s.id, label: s.title })),
    { id: "api-reference", label: "API reference" },
    { id: "accessibility", label: "Accessibility" },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_11rem]">
      <article className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">{meta.name}</h1>
        <p className="mt-2 max-w-[60ch] text-lg leading-relaxed text-muted">{meta.summary}</p>

        <section id="installation" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-semibold text-ink">Installation</h2>
          <div className="mt-4 overflow-hidden rounded-md border border-border">
            <CodeBlock code={doc.importLine} />
          </div>
        </section>

        {doc.sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-12 scroll-mt-24">
            <h2 className="text-xl font-semibold text-ink">{s.title}</h2>
            <div className="mt-4">
              <ComponentPreview code={s.code}>{s.preview}</ComponentPreview>
            </div>
          </section>
        ))}

        <section id="api-reference" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-semibold text-ink">API reference</h2>
          <div className="mt-4">
            <ApiTable rows={doc.api} />
          </div>
        </section>

        <section id="accessibility" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-semibold text-ink">Accessibility</h2>
          <ul className="mt-4 space-y-2">
            {doc.accessibility.map((a, i) => (
              <li key={i} className="max-w-[60ch] leading-relaxed text-muted">
                {a}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <aside className="hidden lg:block">
        <nav className="sticky top-12">
          <p className="mb-3 font-sans text-xs font-semibold text-muted">On this page</p>
          <ul className="space-y-2 border-l border-border">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="-ml-px block border-l border-transparent pl-3 font-sans text-sm text-muted transition-colors hover:border-primary hover:text-ink"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

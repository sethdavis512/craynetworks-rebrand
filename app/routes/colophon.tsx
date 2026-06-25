export function meta() {
  return [
    { title: "Colophon — Cray Networks" },
    { name: "description", content: "How the Cray Networks rebrand was designed and built." },
  ];
}

export default function Colophon() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Colophon</h1>
      <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-muted">
        A short account of how this rebrand was designed and built, and what each decision is meant
        to demonstrate.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-ink">The thesis</h2>
        <p className="mt-3 max-w-[68ch] leading-relaxed text-muted">
          Cray Networks already had an identity: a cyan-leaning blue, a deep navy, and white. The
          work here is not a reinvention but a systematization. Same brand, finally given a real
          token system, a coherent type pairing, and a dark mode it never had.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">Three things to look at</h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-sans font-semibold text-ink">Typography</h3>
            <p className="mt-1 max-w-[68ch] leading-relaxed text-muted">
              Hanken Grotesk for headings, Literata for reading. Both are variable and self-hosted,
              so the type scale, weight, and optical size are real, configurable values rather than
              screenshots.
            </p>
          </div>
          <div>
            <h3 className="font-sans font-semibold text-ink">Tokens</h3>
            <p className="mt-1 max-w-[68ch] leading-relaxed text-muted">
              Color is OKLCH, authored as composable channels and exposed through Tailwind's
              @theme inline, so every utility resolves to a CSS variable. That is what lets the whole
              interface re-theme without re-rendering a single component.
            </p>
          </div>
          <div>
            <h3 className="font-sans font-semibold text-ink">Real-time theming</h3>
            <p className="mt-1 max-w-[68ch] leading-relaxed text-muted">
              The control drawer writes those channel variables onto the document. Mode, accent hue,
              radius, and density cascade instantly and persist across reloads; reset reveals the
              canonical system underneath.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">The stack</h2>
        <p className="mt-3 max-w-[68ch] leading-relaxed text-muted">
          React Router in framework mode (server-rendered), Tailwind v4, Base UI primitives, Motion
          for restrained scroll work, and OKLCH design tokens. Bun for tooling; Node serves the
          production build.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-ink">How it was made</h2>
        <p className="mt-3 max-w-[68ch] leading-relaxed text-muted">
          Every surface went through an Impeccable design pass, and the git history is meant to be
          read: each stage is an atomic, tagged commit that explains the why. The build is the
          argument; nothing here is claimed that the code does not show.
        </p>
      </section>
    </div>
  );
}

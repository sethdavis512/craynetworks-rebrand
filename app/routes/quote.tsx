import { Suspense, useState } from "react";
import { Await } from "react-router";
import type { Route } from "./+types/quote";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { ContactForm } from "../components/site/ContactForm";
import { AnimatedNumber } from "../components/site/AnimatedNumber";
import { Switch } from "../components/ui/Switch";
import { SERVICES, getServiceConfig, computeEstimate, type ServiceId } from "../lib/estimate";
import { seededUnit, simulatedLatency, sleep } from "../mock/simulate.server";

export function meta() {
  return [
    { title: "Estimate your plan — Cray Networks" },
    { name: "description", content: "Estimate the cost of IT support, repair, hosting, or web work." },
  ];
}

export async function loader() {
  // RR8 deferred data: stream a simulated "quotes sent this week" stat in after a fake latency.
  const quotesThisWeek = sleep(simulatedLatency("quotes-week", 400, 1100)).then(() =>
    Math.round(35 + seededUnit("quotes-week") * 24),
  );
  return { quotesThisWeek };
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 py-3">
      <span className="font-sans text-sm text-ink">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </label>
  );
}

export default function Quote({ loaderData }: Route.ComponentProps) {
  const [service, setService] = useState<ServiceId>("managed-it");
  const [qty, setQty] = useState(5);
  const [onsite, setOnsite] = useState(false);
  const [monitoring, setMonitoring] = useState(true);
  const [priority, setPriority] = useState(false);

  const config = getServiceConfig(service);
  const q = Math.min(qty, config.unitMax);
  const { total, cadence } = computeEstimate({ service, quantity: q, onsite, monitoring, priority });

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-ink">Estimate your plan</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          A quick, honest ballpark for the work you have in mind. Slide things around; the real quote
          is free and comes after a short conversation.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <label className="block">
              <span className="font-sans text-xs font-semibold text-muted">Service</span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value as ServiceId)}
                className="mt-2 h-10 w-full rounded-md border border-border bg-surface px-3 font-sans text-sm text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <div className="flex items-baseline justify-between font-sans text-xs text-muted">
                <span>Number of {config.unit}</span>
                <span className="tabular-nums text-ink">{q}</span>
              </div>
              <input
                type="range"
                min={1}
                max={config.unitMax}
                value={q}
                onChange={(e) => setQty(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </label>

            <div className="divide-y divide-border rounded-lg border border-border px-4">
              <ToggleRow label="On-site service" checked={onsite} onChange={setOnsite} />
              <ToggleRow label="Monitoring & backups" checked={monitoring} onChange={setMonitoring} />
              <ToggleRow label="Priority / after-hours" checked={priority} onChange={setPriority} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-border bg-surface-2 p-6">
              <p className="font-sans text-xs font-semibold text-muted">
                Estimated {cadence === "mo" ? "monthly" : "one-time"} cost
              </p>
              <div className="mt-1 flex items-baseline gap-1 text-ink">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">
                  <AnimatedNumber value={total} />
                </span>
                {cadence === "mo" ? <span className="font-sans text-sm text-muted">/mo</span> : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A ballpark for {q} {config.unit}. Estimates only; your real quote is free.
              </p>
              <p className="mt-4 border-t border-border pt-3 font-mono text-xs text-muted">
                <Suspense fallback={<span className="opacity-60">syncing live ops...</span>}>
                  <Await resolve={loaderData.quotesThisWeek}>
                    {(n) => <span className="text-primary-strong">{n}</span>}
                  </Await>
                </Suspense>{" "}
                quotes sent this week
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">How payment works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface-2 p-5">
              <h3 className="font-sans font-semibold text-ink">Maintenance plan</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Prevent problems instead of just fixing them. Scheduled maintenance weekly, monthly,
                quarterly, or annually, done remotely, on-site, or both, based on how much equipment
                you have.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-5">
              <h3 className="font-sans font-semibold text-ink">Pay as you go</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Only pay when you need help. Great for smaller offices that want expert IT on call
                without a full maintenance plan.
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-muted">
            Every business is different. We can also build a custom plan around your needs, just ask.
          </p>
        </section>

        <section id="contact" className="mt-12 scroll-mt-20 rounded-xl border border-border bg-surface-2 p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Get your real quote</h2>
          <p className="mt-2 max-w-xl leading-relaxed text-muted">
            Tell us what you need and we will follow up with a firm number. Most quotes go out the same day.
          </p>
          <div className="mt-6 max-w-xl">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

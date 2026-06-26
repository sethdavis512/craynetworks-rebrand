import { useFetcher } from "react-router";
import { Banner } from "../ui/Banner";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import type { action } from "../../routes/contact";

/**
 * Shared quote/service-call form. A real RR8 `fetcher.Form` posting to the `/contact` action,
 * with server-side Zod validation, a pending state, and an opt-in seeded ~25% failure (the chaos
 * checkbox) so the error path is demonstrable without breaking the happy path by default.
 */
export function ContactForm() {
  const fetcher = useFetcher<typeof action>();
  const data = fetcher.data;
  const busy = fetcher.state !== "idle";
  const errors = data && !data.ok ? data.errors : undefined;

  if (data?.ok) {
    return <Banner tone="success">Thanks, {data.name}. We will be in touch within one business day.</Banner>;
  }

  return (
    <fetcher.Form method="post" action="/contact" className="flex flex-col gap-3">
      {data && !data.ok && data.formError ? (
        <Banner tone="danger" role="alert">
          {data.formError}
        </Banner>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="sm:flex-1">
          <Input
            name="name"
            aria-label="Your name"
            placeholder="Your name"
            aria-invalid={errors?.name ? true : undefined}
            className="w-full"
          />
          {errors?.name ? <p className="mt-1 font-sans text-xs text-danger-strong">{errors.name}</p> : null}
        </div>
        <div className="sm:flex-1">
          <Input
            type="email"
            name="email"
            aria-label="Email"
            placeholder="you@business.com"
            aria-invalid={errors?.email ? true : undefined}
            className="w-full"
          />
          {errors?.email ? <p className="mt-1 font-sans text-xs text-danger-strong">{errors.email}</p> : null}
        </div>
        <Button type="submit" disabled={busy}>
          {busy ? "Sending..." : "Request a quote"}
        </Button>
      </div>
      <label className="flex items-center gap-2 font-sans text-xs text-muted">
        <input type="checkbox" name="chaos" className="size-3.5 accent-primary" />
        Simulate a flaky connection (seeded ~25% failure)
      </label>
    </fetcher.Form>
  );
}

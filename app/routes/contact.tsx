import { redirect } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/contact";
import { maybeFail, simulatedLatency, sleep } from "../mock/simulate.server";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email."),
  message: z.string().trim().max(2000).optional().default(""),
});

export type ContactResult =
  | { ok: true; name: string }
  | { ok: false; errors?: Record<string, string>; formError?: string };

export async function action({ request }: Route.ActionArgs): Promise<ContactResult> {
  const form = await request.formData();
  const chaos = form.get("chaos") === "on" || new URL(request.url).searchParams.get("chaos") === "1";

  const parsed = ContactSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    message: form.get("message") ?? "",
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
  }

  // Seeded "network": deterministic latency, and a ~25% failure only when chaos is opted in.
  const seed = `${parsed.data.email}|${parsed.data.name}`;
  await sleep(simulatedLatency(seed));
  if (chaos && maybeFail(seed)) {
    return { ok: false, formError: "Our system hiccuped (simulated). Please try again." };
  }
  return { ok: true, name: parsed.data.name };
}

/** GET /contact has no UI; send people to the marketing contact section. */
export function loader() {
  return redirect("/#contact");
}

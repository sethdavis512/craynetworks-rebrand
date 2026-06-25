import { useState } from "react";
import { Banner } from "../ui/Banner";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

/** Shared quote/service-call form. Used by the marketing page and every service page. */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <Banner tone="success">Thanks. We will be in touch within one business day.</Banner>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <Input name="name" aria-label="Your name" placeholder="Your name" required className="sm:flex-1" />
      <Input type="email" name="email" aria-label="Email" placeholder="you@business.com" required className="sm:flex-1" />
      <Button type="submit">Request a quote</Button>
    </form>
  );
}

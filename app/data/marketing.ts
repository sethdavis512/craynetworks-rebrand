/** Marketing content, shared by the present-day home and the 2056 home so copy stays identical. */

export type Service = { slug: string; name: string; body: string; featured?: boolean };

export const SERVICES: Service[] = [
  {
    slug: "network-management",
    name: "IT & network management",
    body: "Proactive monitoring and maintenance, so problems get fixed before you ever notice them.",
    featured: true,
  },
  {
    slug: "computer-repair",
    name: "Computer repair",
    body: "Drop-off or on-site fixes for the desktop, laptop, or server that simply will not cooperate.",
  },
  {
    slug: "web-hosting",
    name: "Web hosting",
    body: "Fast, dependable hosting for your site and email, kept patched and backed up.",
  },
  {
    slug: "web-design",
    name: "Web design & development",
    body: "Sites that look right and work right, built by people down the road.",
  },
];

export const VALUES = [
  { name: "Warm", body: "We talk like neighbors, not a ticket queue. You get a person who remembers your setup." },
  { name: "Clear", body: "Plain answers and honest timelines. No jargon deployed to sound smart." },
  { name: "Trusted", body: "Two decades keeping Central Texas businesses online, one handshake at a time." },
];

export const AREAS = ["Leander", "Cedar Park", "Austin", "Round Rock", "Pflugerville", "Georgetown", "Hill Country"];

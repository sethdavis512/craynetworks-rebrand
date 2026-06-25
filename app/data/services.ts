/**
 * Service content ported (lightly cleaned) from the real craynetworks.com pages, so the rebrand
 * carries the actual business's words. Clean slugs replace the old Joomla "/NN-..." URLs.
 */

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  paragraphs: string[];
};

export const SERVICE_AREA =
  "Cray Networks serves clients from our office in Leander and throughout Central Texas and the Hill Country, including Austin, Round Rock, Pflugerville, Georgetown, Cedar Park, Travis County, and Williamson County.";

export const services: Service[] = [
  {
    slug: "network-management",
    name: "IT & network management",
    tagline: "Proactive support, security, and backups for your whole network.",
    paragraphs: [
      "Whether you are interested in upgrading your current network or require long-term technical support, Cray Networks is the solution for you. We proactively use the latest industry best practices and methodologies to safeguard your priceless information assets.",
      "Backups are the key to protecting your data and your business. Cray Networks uses the latest backup technologies to ensure your data is safe from disaster, and our anti-virus and anti-spyware tools get you through a tidal wave of virus and spyware related events.",
      "Cray Networks can set up a VPN connection on your network, a secure way for remote users to access the business network when they are not on-site.",
    ],
  },
  {
    slug: "computer-repair",
    name: "Desktop, server & printer repair",
    tagline: "On-site and remote hardware support that minimizes downtime.",
    paragraphs: [
      "From time to time, your PC, printer, or server will have a problem. Cray Networks offers full support for all of your hardware devices. Through on-site and remote service, our technicians can troubleshoot and diagnose problems in a timely and efficient manner, minimizing downtime.",
      "Devices in your network are similar to vehicles. All of your desktops, laptops, servers, and printers need maintenance or repair to keep them operating as desired. We have been repairing desktops, laptops, servers, and printers for over 15 years. We look at each machine thoroughly and discuss findings with you before moving forward, and we make sure that whatever needs to be done makes sense financially.",
      "Want to keep things at peak levels? Allow us to perform regular maintenance on your machines and we can fix issues before they become a problem.",
    ],
  },
  {
    slug: "web-hosting",
    name: "Web hosting",
    tagline: "Reliable, secure hosting and infrastructure management.",
    paragraphs: [
      "Your business is finance, electricity, or manufacturing. Your business is not the 24x7 monitoring of your critical applications. Scarce resources and tight budgets have you looking for fast, economical ways to manage and deploy your enterprise systems.",
      "When you are talking about hosting, storage, or application services, there is almost nothing to gain from keeping your infrastructure support in-house. Your applications are critical to your success; they must be reliable, flexible, and secure. Whether your needs are 24x7 service and management or cost reduction, you will benefit from the storage and infrastructure management facilities we have to offer.",
    ],
  },
  {
    slug: "web-design",
    name: "Web design & development",
    tagline: "Brand strategy and user experience, built to last.",
    paragraphs: [
      "We unite brand strategy with user experience design. We begin every project by asking the questions that help us gain insight into the key drivers of your business and brand, then apply a user-centric strategy and our expertise in interface design to reinforce what makes you unique and memorable at every point of interaction.",
      "We build websites to last and deliver results. We create structurally sound websites that scale gracefully alongside your business and are easy to manage, a smart investment that pays in consistent, long-term dividends.",
      "We create systems-based design built to last. Each design deliverable must look great in its own right, but it is always part of a greater whole. Our expertise in brand guidelines and clear processes keeps clients on-brand and speaking from a singular point of view.",
    ],
  },
];

export function getService(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}

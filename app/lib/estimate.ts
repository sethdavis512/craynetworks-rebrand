/**
 * Pure pricing model for the quote estimator. Grounded in the services Cray actually offers,
 * priced for a local shop that wants to win business (reasonable, not enterprise). Pure and
 * deterministic so it is trivially unit-testable.
 */

export type ServiceId = "managed-it" | "computer-repair" | "web-hosting" | "web-design";

export type ServiceConfig = {
  id: ServiceId;
  label: string;
  unit: string;
  unitMax: number;
  perUnit: number;
  setup: number;
  cadence: "mo" | "once";
  onsite: number;
  monitoringPerUnit: number;
};

export const SERVICES: ServiceConfig[] = [
  { id: "managed-it", label: "Managed IT & network", unit: "workstations", unitMax: 50, perUnit: 40, setup: 0, cadence: "mo", onsite: 60, monitoringPerUnit: 12 },
  { id: "computer-repair", label: "Computer repair", unit: "devices", unitMax: 15, perUnit: 70, setup: 89, cadence: "once", onsite: 50, monitoringPerUnit: 25 },
  { id: "web-hosting", label: "Web hosting", unit: "sites", unitMax: 10, perUnit: 22, setup: 0, cadence: "mo", onsite: 0, monitoringPerUnit: 8 },
  { id: "web-design", label: "Web design", unit: "pages", unitMax: 20, perUnit: 220, setup: 1100, cadence: "once", onsite: 0, monitoringPerUnit: 0 },
];

export function getServiceConfig(id: ServiceId): ServiceConfig {
  return SERVICES.find((s) => s.id === id) ?? SERVICES[0];
}

export type EstimateInput = {
  service: ServiceId;
  quantity: number;
  onsite: boolean;
  monitoring: boolean;
  priority: boolean;
};

export function computeEstimate(input: EstimateInput): { total: number; cadence: "mo" | "once" } {
  const c = getServiceConfig(input.service);
  const qty = Math.max(1, Math.min(c.unitMax, Math.round(input.quantity)));
  let total = c.setup + c.perUnit * qty;
  if (input.onsite) total += c.onsite;
  if (input.monitoring) total += c.monitoringPerUnit * qty;
  if (input.priority) total *= 1.15;
  return { total: Math.round(total), cadence: c.cadence };
}

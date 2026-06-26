/**
 * Deterministic, seeded simulation for the demo data + forms. Failures are never pure RNG:
 * each is a pure function of a seed string, so chaos is reproducible and opt-in (a control / ?chaos=1).
 */

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic value in [0, 1) for any seed. */
export function seededUnit(seed: string): number {
  return hash(seed) / 0x100000000;
}

/** Deterministically true for ~`rate` of seeds. */
export function maybeFail(seed: string, rate = 0.25): boolean {
  return seededUnit(`fail:${seed}`) < rate;
}

/** Deterministic latency in ms within [min, max] for a seed. */
export function simulatedLatency(seed: string, min = 250, max = 850): number {
  return Math.round(min + seededUnit(`lat:${seed}`) * (max - min));
}

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

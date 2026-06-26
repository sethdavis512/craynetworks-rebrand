import { describe, it, expect } from "vitest";
import { seededUnit, maybeFail, simulatedLatency } from "./simulate.server";

describe("simulate.server", () => {
  it("seededUnit is deterministic and in [0,1)", () => {
    expect(seededUnit("a")).toBe(seededUnit("a"));
    expect(seededUnit("a")).not.toBe(seededUnit("b"));
    const u = seededUnit("cray@example.com|Pat");
    expect(u).toBeGreaterThanOrEqual(0);
    expect(u).toBeLessThan(1);
  });

  it("maybeFail is deterministic and roughly hits the rate", () => {
    expect(maybeFail("x")).toBe(maybeFail("x"));
    let fails = 0;
    const N = 4000;
    for (let i = 0; i < N; i += 1) if (maybeFail(`seed-${i}`, 0.25)) fails += 1;
    expect(fails / N).toBeGreaterThan(0.2);
    expect(fails / N).toBeLessThan(0.3);
  });

  it("simulatedLatency stays within bounds", () => {
    for (let i = 0; i < 100; i += 1) {
      const ms = simulatedLatency(`s${i}`, 250, 850);
      expect(ms).toBeGreaterThanOrEqual(250);
      expect(ms).toBeLessThanOrEqual(850);
    }
  });
});

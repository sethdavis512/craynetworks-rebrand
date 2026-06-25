import { describe, it, expect } from "vitest";
import { clamp, formatOklch, readableInk } from "./oklch";

describe("clamp", () => {
  it("bounds values", () => {
    expect(clamp(0, 1, 2)).toBe(1);
    expect(clamp(0, 1, -1)).toBe(0);
    expect(clamp(0, 1, 0.5)).toBe(0.5);
  });
});

describe("formatOklch", () => {
  it("serializes channels", () => {
    expect(formatOklch({ l: 0.58, c: 0.11, h: 232 })).toBe("oklch(0.58 0.11 232)");
  });
});

describe("readableInk", () => {
  it("wants light text on dark fills and dark text on light fills", () => {
    expect(readableInk(0.4)).toBe("light");
    expect(readableInk(0.8)).toBe("dark");
  });
});

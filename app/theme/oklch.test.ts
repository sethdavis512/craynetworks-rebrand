import { describe, it, expect } from "vitest";
import { clamp, formatOklch, readableInk, wcagContrast, wcagLevel, oklchToRgb, ramp } from "./oklch";

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

describe("contrast + gamut", () => {
  it("white on black is ~21:1", () => {
    expect(wcagContrast({ l: 1, c: 0, h: 0 }, { l: 0, c: 0, h: 0 })).toBeGreaterThan(20);
  });

  it("a color has ~1:1 contrast with itself", () => {
    const x = { l: 0.6, c: 0.12, h: 232 };
    expect(wcagContrast(x, x)).toBeCloseTo(1, 4);
  });

  it("flags out-of-gamut OKLCH and accepts in-gamut", () => {
    expect(oklchToRgb({ l: 0.62, c: 0.3, h: 270 }).inGamut).toBe(false);
    expect(oklchToRgb({ l: 0.6, c: 0.1, h: 232 }).inGamut).toBe(true);
  });

  it("grades WCAG levels", () => {
    expect(wcagLevel(8)).toBe("AAA");
    expect(wcagLevel(5)).toBe("AA");
    expect(wcagLevel(2)).toBe("fail");
  });

  it("ramp keeps chroma/hue and varies lightness", () => {
    const r = ramp({ c: 0.1, h: 232 });
    expect(r.length).toBeGreaterThan(4);
    expect(r.every((s) => s.c === 0.1 && s.h === 232)).toBe(true);
  });
});

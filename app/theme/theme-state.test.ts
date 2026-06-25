import { describe, it, expect } from "vitest";
import { serialize, deserialize, DEFAULT_THEME_STATE } from "./theme-state";

describe("theme-state", () => {
  it("round-trips a custom state", () => {
    const state = {
      mode: "dark" as const,
      accent: { l: 0.6, c: 0.12, h: 200 },
      radius: 1,
      density: 0.3,
    };
    expect(deserialize(serialize(state))).toEqual(state);
  });

  it("falls back to defaults on malformed input", () => {
    expect(deserialize("m=neon&al=banana")).toEqual(DEFAULT_THEME_STATE);
  });

  it("returns defaults for empty input", () => {
    expect(deserialize("")).toEqual(DEFAULT_THEME_STATE);
    expect(deserialize(null)).toEqual(DEFAULT_THEME_STATE);
  });

  it("clamps out-of-range channels by rejecting to defaults", () => {
    // hue 999 is out of range -> whole parse fails -> defaults
    expect(deserialize("m=light&al=0.5&ac=0.1&ah=999&r=0.5&s=0.25")).toEqual(DEFAULT_THEME_STATE);
  });
});

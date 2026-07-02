import { describe, expect, it } from "bun:test";

import { TAG_COLOR_PRESETS, pickTagColor } from "../tags";

describe("pickTagColor", () => {
  it("always returns a preset color", () => {
    for (const name of ["bug", "feature request", "", "  ", "🚀 rocket"]) {
      expect(TAG_COLOR_PRESETS).toContain(pickTagColor(name));
    }
  });

  it("is deterministic for a given name", () => {
    expect(pickTagColor("backend")).toBe(pickTagColor("backend"));
    expect(pickTagColor("frontend")).toBe(pickTagColor("frontend"));
  });

  it("spreads different names across the palette", () => {
    const names = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    const colors = new Set(names.map(pickTagColor));
    // not all names should collapse to a single color
    expect(colors.size).toBeGreaterThan(1);
  });
});

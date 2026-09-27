import { describe, expect, it } from "bun:test";

import Color from "colorjs.io";

import {
  getStatusBackgroundColor,
  getStatusTextColors,
  statusTextColorStyle,
} from "../statusColors";

const lightness = (hex: string) => new Color(hex).get("oklch.l");

const alpha = (rgb: string) => new Color(rgb).alpha;

describe("getStatusBackgroundColor", () => {
  it("returns a translucent tint carrying the status color channels", () => {
    const bg = getStatusBackgroundColor("#3b82f6");
    expect(bg).toBeDefined();
    const parsed = new Color(bg!).to("srgb");
    const [r, g, b] = parsed.coords as [number, number, number];
    expect(Math.round(r * 255)).toBe(59);
    expect(Math.round(g * 255)).toBe(130);
    expect(Math.round(b * 255)).toBe(246);
    expect(parsed.alpha).toBeCloseTo(0.15, 5);
  });

  it("honors a custom opacity", () => {
    expect(alpha(getStatusBackgroundColor("#3b82f6", 0.2)!)).toBeCloseTo(
      0.2,
      5,
    );
  });

  it("returns undefined for missing or invalid colors", () => {
    expect(getStatusBackgroundColor(null)).toBeUndefined();
    expect(getStatusBackgroundColor(undefined)).toBeUndefined();
    expect(getStatusBackgroundColor("not-a-color")).toBeUndefined();
  });
});

describe("getStatusTextColors", () => {
  it("lightens a dark status (e.g. closed) enough to read on the dark theme", () => {
    // #6b7280 (gray-500) is the unreadable "Closed" color on dark backgrounds
    const { dark } = getStatusTextColors("#6b7280");
    expect(dark).toBeDefined();
    // allow for 8-bit hex quantization drift on the oklch round-trip
    expect(lightness(dark!)).toBeGreaterThanOrEqual(0.74);
  });

  it("darkens a pale status enough to read on the light theme", () => {
    const { light } = getStatusTextColors("#facc15");
    expect(light).toBeDefined();
    // allow for 8-bit hex quantization drift on the oklch round-trip
    expect(lightness(light!)).toBeLessThanOrEqual(0.51);
  });

  it("returns an empty object for missing or invalid colors", () => {
    expect(getStatusTextColors(null)).toEqual({});
    expect(getStatusTextColors("nope")).toEqual({});
  });
});

describe("statusTextColorStyle", () => {
  it("wires both theme colors into custom properties", () => {
    const style = statusTextColorStyle("#6b7280") as Record<string, string>;
    expect(style["--status-fg-light"]).toBeDefined();
    expect(style["--status-fg-dark"]).toBeDefined();
  });

  it("is empty when no color is provided", () => {
    expect(statusTextColorStyle(null)).toEqual({});
  });
});

import { describe, expect, it } from "bun:test";

import { canCreateCommentFromData } from "../canCreateComment";

describe("canCreateCommentFromData", () => {
  it("allows when the limit cannot be determined (fail open; server enforces)", () => {
    // a fetch error / loading produces null data -- must NOT read as 'at limit'
    expect(canCreateCommentFromData(null)).toBe(true);
  });

  it("allows when under the limit", () => {
    expect(
      canCreateCommentFromData({ totalComments: 0, commentLimit: 50 }),
    ).toBe(true);
    expect(
      canCreateCommentFromData({ totalComments: 49, commentLimit: 50 }),
    ).toBe(true);
  });

  it("blocks only when genuinely at or over the limit", () => {
    expect(
      canCreateCommentFromData({ totalComments: 50, commentLimit: 50 }),
    ).toBe(false);
    expect(
      canCreateCommentFromData({ totalComments: 51, commentLimit: 50 }),
    ).toBe(false);
  });

  it("treats a negative limit as unlimited (paid tiers use -1)", () => {
    expect(
      canCreateCommentFromData({ totalComments: 9999, commentLimit: -1 }),
    ).toBe(true);
  });
});

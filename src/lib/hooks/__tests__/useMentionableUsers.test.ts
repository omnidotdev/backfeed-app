import { describe, expect, it } from "bun:test";

import { toMentionItems } from "../useMentionableUsers";

describe("toMentionItems", () => {
  it("returns [] for null/empty input", () => {
    expect(toMentionItems(null)).toEqual([]);
    expect(toMentionItems([])).toEqual([]);
  });

  it("builds a /profile/<rowId>/account url (load-bearing for the parser)", () => {
    expect(toMentionItems([{ rowId: "abc-123", username: "ada" }])).toEqual([
      { id: "abc-123", label: "ada", url: "/profile/abc-123/account" },
    ]);
  });

  it("dedupes by rowId, keeping the first", () => {
    const items = toMentionItems([
      { rowId: "u1", username: "ada" },
      { rowId: "u1", username: "ada-again" },
      { rowId: "u2", username: "linus" },
    ]);
    expect(items.map((item) => item.id)).toEqual(["u1", "u2"]);
    expect(items[0].label).toBe("ada");
  });

  it("skips users missing a rowId or username", () => {
    expect(
      toMentionItems([
        { rowId: "u1", username: null },
        { rowId: null, username: "ghost" },
        null,
        undefined,
        { rowId: "u2", username: "real" },
      ]),
    ).toEqual([{ id: "u2", label: "real", url: "/profile/u2/account" }]);
  });
});

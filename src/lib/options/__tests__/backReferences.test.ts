import { describe, expect, it } from "bun:test";

import { referenceSourceIds, toBackReferences } from "../backReferences";

describe("referenceSourceIds", () => {
  it("returns [] for null/empty edges", () => {
    expect(referenceSourceIds(null, "self")).toEqual([]);
    expect(referenceSourceIds([], "self")).toEqual([]);
  });

  it("dedupes source ids and drops nulls", () => {
    const nodes = [
      { sourceId: "a" },
      null,
      { sourceId: "b" },
      { sourceId: "a" },
    ];
    expect(referenceSourceIds(nodes, "self").sort()).toEqual(["a", "b"]);
  });

  it("excludes the post's own id (no self-reference)", () => {
    const nodes = [{ sourceId: "self" }, { sourceId: "other" }];
    expect(referenceSourceIds(nodes, "self")).toEqual(["other"]);
  });
});

describe("toBackReferences", () => {
  it("returns [] for null/empty posts", () => {
    expect(toBackReferences(null)).toEqual([]);
    expect(toBackReferences([])).toEqual([]);
  });

  it("maps posts and defaults a missing number to 0 and title to null", () => {
    const nodes = [
      { rowId: "p1", number: 42, title: "Dark mode" },
      { rowId: "p2", number: null, title: null },
      null,
    ];
    expect(toBackReferences(nodes)).toEqual([
      { rowId: "p1", number: 42, title: "Dark mode" },
      { rowId: "p2", number: 0, title: null },
    ]);
  });
});

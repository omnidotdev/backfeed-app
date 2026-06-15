import { describe, expect, it } from "bun:test";

import { splitIssueRefs } from "../issueRefs";

describe("splitIssueRefs", () => {
  it("returns a single text segment when there are no references", () => {
    expect(splitIssueRefs("just a comment")).toEqual([
      { type: "text", value: "just a comment" },
    ]);
  });

  it("extracts a #number reference", () => {
    expect(splitIssueRefs("see #123 please")).toEqual([
      { type: "text", value: "see " },
      { type: "ref", number: 123, raw: "#123" },
      { type: "text", value: " please" },
    ]);
  });

  it("extracts multiple references", () => {
    expect(splitIssueRefs("#1 and #2")).toEqual([
      { type: "ref", number: 1, raw: "#1" },
      { type: "text", value: " and " },
      { type: "ref", number: 2, raw: "#2" },
    ]);
  });

  it("ignores # not on a word boundary (e.g. hex colors, ids)", () => {
    expect(splitIssueRefs("color #fff and id abc#12")).toEqual([
      { type: "text", value: "color #fff and id abc#12" },
    ]);
  });

  it("ignores a bare # with no number", () => {
    expect(splitIssueRefs("a # b")).toEqual([{ type: "text", value: "a # b" }]);
  });
});

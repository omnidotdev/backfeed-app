import { describe, expect, it } from "bun:test";

import { linkifyIssueRefsHtml } from "../issueRefs";

const href = (n: string) => `/p/${n}`;

describe("linkifyIssueRefsHtml", () => {
  it("links a #number reference in text", () => {
    expect(linkifyIssueRefsHtml("<p>see #42 ok</p>", href)).toBe(
      '<p>see <a href="/p/42">#42</a> ok</p>',
    );
  });

  it("links multiple references", () => {
    expect(linkifyIssueRefsHtml("<p>#1 and #2</p>", href)).toBe(
      '<p><a href="/p/1">#1</a> and <a href="/p/2">#2</a></p>',
    );
  });

  it("never matches inside a tag's attributes", () => {
    // a hex color in an attribute must not be rewritten
    expect(linkifyIssueRefsHtml('<p style="color:#333">#7</p>', href)).toBe(
      '<p style="color:#333"><a href="/p/7">#7</a></p>',
    );
  });

  it("ignores numeric entities and non-boundary hashes", () => {
    expect(linkifyIssueRefsHtml("<p>x&#39;y abc#12 #fff</p>", href)).toBe(
      "<p>x&#39;y abc#12 #fff</p>",
    );
  });
});

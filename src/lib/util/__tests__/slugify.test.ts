import { describe, expect, it } from "bun:test";

import slugify from "../slugify";

describe("slugify", () => {
  it("lowercases and joins words with underscores", () => {
    expect(slugify("In Progress")).toBe("in_progress");
    expect(slugify("Under Review")).toBe("under_review");
  });

  it("collapses runs of separators and special characters", () => {
    expect(slugify("Won't  Fix!!")).toBe("won_t_fix");
    expect(slugify("needs   triage")).toBe("needs_triage");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify("  Planned  ")).toBe("planned");
    expect(slugify("--done--")).toBe("done");
  });

  it("keeps existing digits", () => {
    expect(slugify("Phase 2")).toBe("phase_2");
  });

  it("returns an empty string for separator-only input", () => {
    expect(slugify("   ")).toBe("");
    expect(slugify("!!!")).toBe("");
  });
});

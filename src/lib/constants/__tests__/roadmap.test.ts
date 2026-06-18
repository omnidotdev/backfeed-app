import { describe, expect, it } from "bun:test";

import {
  ROADMAP_HIDDEN_STATUS_NAMES,
  isStatusOnRoadmap,
} from "../roadmap.constant";

describe("isStatusOnRoadmap", () => {
  it("hides intake + closed statuses by the default heuristic", () => {
    for (const name of ROADMAP_HIDDEN_STATUS_NAMES) {
      expect(isStatusOnRoadmap({ name })).toBe(false);
    }
  });

  it("shows building statuses by the default heuristic", () => {
    expect(isStatusOnRoadmap({ name: "planned" })).toBe(true);
    expect(isStatusOnRoadmap({ name: "in_progress" })).toBe(true);
    expect(isStatusOnRoadmap({ name: "completed" })).toBe(true);
  });

  it("shows unknown custom statuses by default", () => {
    expect(isStatusOnRoadmap({ name: "needs_triage" })).toBe(true);
    expect(isStatusOnRoadmap({ name: undefined })).toBe(true);
    expect(isStatusOnRoadmap({})).toBe(true);
  });

  it("lets an explicit flag override the heuristic in both directions", () => {
    // force a normally-hidden status onto the roadmap
    expect(isStatusOnRoadmap({ name: "open", showOnRoadmap: true })).toBe(true);
    // hide a normally-shown status from the roadmap
    expect(isStatusOnRoadmap({ name: "planned", showOnRoadmap: false })).toBe(
      false,
    );
  });

  it("falls back to the heuristic when the flag is null", () => {
    expect(isStatusOnRoadmap({ name: "open", showOnRoadmap: null })).toBe(
      false,
    );
    expect(isStatusOnRoadmap({ name: "planned", showOnRoadmap: null })).toBe(
      true,
    );
  });
});

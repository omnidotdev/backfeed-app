import { describe, expect, it } from "bun:test";

import { BOARD_HIDDEN_STATUS_NAMES, isStatusOnBoard } from "../board.constant";

describe("isStatusOnBoard", () => {
  it("hides terminal statuses by the default heuristic", () => {
    for (const name of BOARD_HIDDEN_STATUS_NAMES) {
      expect(isStatusOnBoard({ name })).toBe(false);
    }
  });

  it("shows active statuses by the default heuristic", () => {
    expect(isStatusOnBoard({ name: "open" })).toBe(true);
    expect(isStatusOnBoard({ name: "under_review" })).toBe(true);
    expect(isStatusOnBoard({ name: "in_progress" })).toBe(true);
    expect(isStatusOnBoard({ name: "planned" })).toBe(true);
  });

  it("shows unknown custom statuses by default", () => {
    expect(isStatusOnBoard({ name: "needs_triage" })).toBe(true);
    expect(isStatusOnBoard({ name: undefined })).toBe(true);
    expect(isStatusOnBoard({})).toBe(true);
  });

  it("lets an explicit flag override the heuristic in both directions", () => {
    // force a normally-hidden status onto the board
    expect(isStatusOnBoard({ name: "completed", showOnBoard: true })).toBe(
      true,
    );
    // hide a normally-shown status from the board
    expect(isStatusOnBoard({ name: "open", showOnBoard: false })).toBe(false);
  });

  it("falls back to the heuristic when the flag is null", () => {
    expect(isStatusOnBoard({ name: "completed", showOnBoard: null })).toBe(
      false,
    );
    expect(isStatusOnBoard({ name: "open", showOnBoard: null })).toBe(true);
  });
});

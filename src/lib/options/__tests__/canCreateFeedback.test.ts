import { describe, expect, it } from "bun:test";

import { canCreateFeedbackFromData } from "../canCreateFeedback";

describe("canCreateFeedbackFromData", () => {
  it("allows when the limit cannot be determined (fail open; server enforces)", () => {
    expect(canCreateFeedbackFromData(null)).toBe(true);
  });

  it("treats a negative limit as unlimited (catalog max_feedback_users is -1)", () => {
    // regression: the form used to hide once 15 unique users had submitted
    expect(
      canCreateFeedbackFromData({
        activeUserCount: 16,
        hasUserSubmittedFeedback: false,
        userLimit: -1,
      }),
    ).toBe(true);
  });

  it("blocks a new submitter only when a finite limit is reached", () => {
    expect(
      canCreateFeedbackFromData({
        activeUserCount: 4,
        hasUserSubmittedFeedback: false,
        userLimit: 5,
      }),
    ).toBe(true);
    expect(
      canCreateFeedbackFromData({
        activeUserCount: 5,
        hasUserSubmittedFeedback: false,
        userLimit: 5,
      }),
    ).toBe(false);
  });

  it("never blocks a user who already submitted feedback", () => {
    expect(
      canCreateFeedbackFromData({
        activeUserCount: 5,
        hasUserSubmittedFeedback: true,
        userLimit: 5,
      }),
    ).toBe(true);
  });
});

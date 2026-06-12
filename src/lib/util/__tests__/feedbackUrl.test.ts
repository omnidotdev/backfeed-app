import { describe, expect, it } from "bun:test";

import {
  buildFeedbackDisplayKey,
  buildFeedbackKey,
  parseFeedbackParam,
} from "../feedbackUrl";

describe("parseFeedbackParam", () => {
  it("parses a legacy UUID into a rowId lookup", () => {
    const result = parseFeedbackParam("3f9a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c");

    expect(result).toEqual({
      type: "uuid",
      rowId: "3f9a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
    });
  });

  it("parses a number with a trailing slug", () => {
    const result = parseFeedbackParam("42-login-button-broken");

    expect(result).toEqual({
      type: "number",
      number: 42,
      slug: "login-button-broken",
    });
  });

  it("parses a bare number without a slug", () => {
    const result = parseFeedbackParam("42");

    expect(result).toEqual({ type: "number", number: 42, slug: undefined });
  });

  it("returns invalid for a non-numeric, non-uuid param", () => {
    expect(parseFeedbackParam("login-button-broken")).toEqual({
      type: "invalid",
    });
  });

  it("returns invalid for an empty param", () => {
    expect(parseFeedbackParam("")).toEqual({ type: "invalid" });
  });
});

describe("buildFeedbackKey", () => {
  it("joins number and slugified title", () => {
    expect(buildFeedbackKey({ number: 42, title: "Login button broken" })).toBe(
      "42-login-button-broken",
    );
  });

  it("returns the bare number when title is missing", () => {
    expect(buildFeedbackKey({ number: 42, title: undefined })).toBe("42");
  });

  it("returns the bare number when title slugifies to empty", () => {
    expect(buildFeedbackKey({ number: 42, title: "!!!" })).toBe("42");
  });
});

describe("buildFeedbackDisplayKey", () => {
  it("joins the project prefix and number", () => {
    expect(buildFeedbackDisplayKey({ prefix: "API", number: 42 })).toBe(
      "API-42",
    );
  });

  it("falls back to a hashed number when there is no prefix", () => {
    expect(buildFeedbackDisplayKey({ prefix: null, number: 42 })).toBe("#42");
    expect(buildFeedbackDisplayKey({ prefix: "", number: 42 })).toBe("#42");
  });
});

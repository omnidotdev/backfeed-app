import { describe, expect, it } from "bun:test";

import {
  buildFeedbackDisplayKey,
  buildFeedbackKey,
  parseFeedbackParam,
} from "@/lib/util/feedbackUrl";

describe("parseFeedbackParam", () => {
  it("parses a legacy UUID into a rowId lookup", () => {
    expect(parseFeedbackParam("3f9a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c")).toEqual({
      type: "uuid",
      rowId: "3f9a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
    });
  });

  it("parses a legacy number with a trailing slug", () => {
    expect(parseFeedbackParam("42-login-button-broken")).toEqual({
      type: "number",
      prefix: undefined,
      number: 42,
      slug: "login-button-broken",
    });
  });

  it("parses a bare number without a slug", () => {
    expect(parseFeedbackParam("42")).toEqual({
      type: "number",
      prefix: undefined,
      number: 42,
      slug: undefined,
    });
  });

  it("parses a prefixed key with number and slug", () => {
    expect(parseFeedbackParam("API-42-login-button-broken")).toEqual({
      type: "number",
      prefix: "API",
      number: 42,
      slug: "login-button-broken",
    });
  });

  it("parses a prefixed key without a slug", () => {
    expect(parseFeedbackParam("API-42")).toEqual({
      type: "number",
      prefix: "API",
      number: 42,
      slug: undefined,
    });
  });

  it("keeps a multi-segment slug intact", () => {
    expect(parseFeedbackParam("API-42-v2-launch-plan")).toEqual({
      type: "number",
      prefix: "API",
      number: 42,
      slug: "v2-launch-plan",
    });
  });

  it("returns invalid for a non-numeric, non-uuid param", () => {
    expect(parseFeedbackParam("login-button-broken")).toEqual({
      type: "invalid",
    });
  });

  it("returns invalid for a number with trailing non-key characters", () => {
    expect(parseFeedbackParam("42abc")).toEqual({ type: "invalid" });
  });

  it("returns invalid for an empty param", () => {
    expect(parseFeedbackParam("")).toEqual({ type: "invalid" });
  });
});

describe("buildFeedbackKey", () => {
  it("joins number and a slug derived from the title", () => {
    expect(buildFeedbackKey({ number: 42, title: "Login button broken" })).toBe(
      "42-login-button-broken",
    );
  });

  it("returns the bare number when the title has no slugifiable content", () => {
    expect(buildFeedbackKey({ number: 42, title: undefined })).toBe("42");
    expect(buildFeedbackKey({ number: 42, title: "" })).toBe("42");
  });

  it("prepends the project prefix when present", () => {
    expect(
      buildFeedbackKey({
        prefix: "API",
        number: 42,
        title: "Login button broken",
      }),
    ).toBe("API-42-login-button-broken");
  });

  it("uses prefix and bare number when the title is empty", () => {
    expect(buildFeedbackKey({ prefix: "API", number: 42, title: "" })).toBe(
      "API-42",
    );
  });

  it("round-trips through parseFeedbackParam", () => {
    const key = buildFeedbackKey({
      prefix: "API",
      number: 42,
      title: "Login button broken",
    });
    const parsed = parseFeedbackParam(key);

    expect(parsed).toMatchObject({
      type: "number",
      prefix: "API",
      number: 42,
    });
  });
});

describe("buildFeedbackDisplayKey", () => {
  it("joins the project prefix and number", () => {
    expect(buildFeedbackDisplayKey({ prefix: "API", number: 42 })).toBe(
      "API-42",
    );
  });

  it("falls back to #number when there is no prefix", () => {
    expect(buildFeedbackDisplayKey({ prefix: null, number: 42 })).toBe("#42");
    expect(buildFeedbackDisplayKey({ number: 42 })).toBe("#42");
  });
});

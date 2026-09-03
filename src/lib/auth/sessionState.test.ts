import { describe, expect, test } from "bun:test";

import { isSessionDegraded } from "./sessionState";

describe("isSessionDegraded", () => {
  test("an unauthenticated session is not degraded", () => {
    // No session at all is the redirect-to-login case, not the re-login prompt.
    expect(isSessionDegraded(null)).toBe(false);
    expect(isSessionDegraded(undefined)).toBe(false);
  });

  test("an authenticated session with an access token is healthy", () => {
    // A genuinely workspace-less user has a valid token; they see the normal
    // "Create a workspace to get started" state, not the re-login prompt.
    expect(isSessionDegraded({ accessToken: "at_live" })).toBe(false);
  });

  test("an authenticated session without an access token is degraded", () => {
    // Refresh-token grant failed: session served without a fresh token, orgs
    // empty. This must be distinguishable so the user is prompted to re-login.
    expect(isSessionDegraded({})).toBe(true);
    expect(isSessionDegraded({ accessToken: undefined })).toBe(true);
    expect(isSessionDegraded({ accessToken: null })).toBe(true);
    expect(isSessionDegraded({ accessToken: "" })).toBe(true);
  });
});

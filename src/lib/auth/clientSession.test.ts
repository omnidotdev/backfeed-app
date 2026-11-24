import { describe, expect, test } from "bun:test";

import { toClientSession } from "./clientSession";

import type { GetAuthSession } from "@omnidotdev/providers/auth";

const rawSession: GetAuthSession = {
  accessToken: "at_live",
  organizations: [],
  user: {
    id: "user-1",
    name: "Ada",
    email: "ada@example.com",
    emailVerified: true,
    image: null,
    identityProviderId: "idp-1",
    rowId: "row-1",
  },
  session: {
    id: "session-1",
    token: "ba_session_token",
    expiresAt: "2030-01-01T00:00:00.000Z",
    ipAddress: "203.0.113.7",
    userAgent: "test-agent",
  },
};

describe("toClientSession", () => {
  test("an unauthenticated session stays null", () => {
    expect(toClientSession(null)).toBeNull();
  });

  test("the session token never reaches the browser", () => {
    const client = toClientSession(rawSession);
    const serialized = JSON.stringify(client);

    expect(client).not.toHaveProperty("session");
    expect(serialized).not.toContain("ba_session_token");
    expect(serialized).not.toContain("203.0.113.7");
    expect(serialized).not.toContain("test-agent");
  });

  test("the fields the client reads are kept", () => {
    const client = toClientSession(rawSession);

    expect(client?.accessToken).toBe("at_live");
    expect(client?.user).toMatchObject({
      id: "user-1",
      email: "ada@example.com",
      identityProviderId: "idp-1",
      rowId: "row-1",
    });
  });
});

import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test";

const originalLocation = Object.getOwnPropertyDescriptor(window, "location");

/** Stand in for the page location, so navigation is observable */
const stubLocation = () => {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: {
      origin: "https://app.example.com",
      pathname: "/projects",
      search: "?tab=recent",
      href: "https://app.example.com/projects?tab=recent",
    },
  });
};

// The auth client derives its base URL from the page origin when it loads
stubLocation();

// Module mocks are process-wide in bun, so keep every other export real and
// put the originals back once this file is done
const actualAuthFns = { ...(await import("@/server/functions/auth")) };
const actualSignIn = { ...(await import("@/lib/auth/signIn")) };

const calls: string[] = [];
const signInArgs: unknown[] = [];

mock.module("@/server/functions/auth", () => ({
  ...actualAuthFns,
  signOutLocal: async () => {
    calls.push("signOutLocal");
    return { idpLogoutUrl: "https://identity.example.com/oauth2/end-session" };
  },
}));

mock.module("@/lib/auth/signIn", () => ({
  ...actualSignIn,
  default: async (params: unknown) => {
    calls.push("signIn");
    signInArgs.push(params);
  },
}));

const { followSignOut, followSwitch } = await import("./followIdentity");

describe("followIdentity", () => {
  beforeEach(() => {
    calls.length = 0;
    signInArgs.length = 0;
    stubLocation();
  });

  afterAll(() => {
    if (originalLocation)
      Object.defineProperty(window, "location", originalLocation);
    mock.module("@/server/functions/auth", () => actualAuthFns);
    mock.module("@/lib/auth/signIn", () => actualSignIn);
  });

  test("a switched account signs out locally, then signs in again back to the same page", async () => {
    await followSwitch();

    expect(calls).toEqual(["signOutLocal", "signIn"]);
    expect(signInArgs).toEqual([{ redirectUrl: "/projects?tab=recent" }]);
  });

  test("a signed-out identity provider signs out locally only and goes home", async () => {
    await followSignOut();

    expect(calls).toEqual(["signOutLocal"]);
    // Never the federated end-session URL the local sign-out also returns
    expect(window.location.href).toBe("/");
  });
});

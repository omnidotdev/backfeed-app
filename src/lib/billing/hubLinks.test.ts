import { describe, expect, test } from "bun:test";

import {
  hubProfileUrl,
  manageSubscriptionUrl,
  upgradePlanUrl,
  workspaceSettingsUrl,
} from "./hubLinks";

const HUB = "https://account.omni.dev";
const BACKFEED = "https://backfeed.omni.dev";

const params = (url: string) => Object.fromEntries(new URL(url).searchParams);

describe("workspaceSettingsUrl", () => {
  test("points at the workspace's settings page", () => {
    expect(workspaceSettingsUrl(`${BACKFEED}/`, "acme")).toBe(
      `${BACKFEED}/@acme/~/settings`,
    );
  });

  test("falls back to the browser origin when the base URL is empty", () => {
    expect(workspaceSettingsUrl("", "acme")).toBe(
      `${window.location.origin}/@acme/~/settings`,
    );
  });
});

describe("upgradePlanUrl", () => {
  test("buys the plan on the account hub and returns to the workspace's settings", () => {
    const url = upgradePlanUrl(HUB, BACKFEED, {
      plan: "pro",
      interval: "month",
      workspaceSlug: "acme",
    });

    expect(url.startsWith(`${HUB}/billing?`)).toBe(true);
    expect(params(url)).toEqual({
      product: "backfeed",
      plan: "pro",
      interval: "month",
      workspace: "acme",
      return: `${BACKFEED}/@acme/~/settings`,
    });
  });

  test("lets the hub ask for the workspace and returns to pricing", () => {
    expect(
      params(upgradePlanUrl(HUB, BACKFEED, { plan: "team", interval: "year" })),
    ).toEqual({
      product: "backfeed",
      plan: "team",
      interval: "year",
      return: `${BACKFEED}/pricing`,
    });
  });

  test("opens the hub as the signed-in account", () => {
    expect(
      params(
        upgradePlanUrl(HUB, BACKFEED, {
          plan: "pro",
          interval: "month",
          workspaceSlug: "acme",
          loginHint: "user-123",
        }),
      ),
    ).toHaveProperty("login_hint", "user-123");
  });

  test("is empty when no account hub is configured", () => {
    expect(
      upgradePlanUrl(undefined, BACKFEED, { plan: "pro", interval: "month" }),
    ).toBe("");
  });
});

describe("hubProfileUrl", () => {
  test("points at the account hub's profile page", () => {
    expect(hubProfileUrl(`${HUB}/`)).toBe(`${HUB}/profile`);
  });

  test("opens the hub as the signed-in account", () => {
    const url = hubProfileUrl(HUB, "user-123");

    expect(new URL(url).pathname).toBe("/profile");
    expect(params(url)).toEqual({ login_hint: "user-123" });
  });

  test("is empty when no account hub is configured", () => {
    expect(hubProfileUrl(undefined, "user-123")).toBe("");
  });
});

describe("manageSubscriptionUrl", () => {
  test("manages the workspace's plan on the account hub", () => {
    const url = manageSubscriptionUrl(HUB, BACKFEED, "acme");

    expect(url.startsWith(`${HUB}/billing?`)).toBe(true);
    expect(params(url)).toEqual({
      product: "backfeed",
      workspace: "acme",
      manage: "1",
      return: `${BACKFEED}/@acme/~/settings`,
    });
  });

  test("opens the hub as the signed-in account", () => {
    expect(
      params(manageSubscriptionUrl(HUB, BACKFEED, "acme", "user-123")),
    ).toHaveProperty("login_hint", "user-123");
  });

  test("is empty when no account hub is configured", () => {
    expect(manageSubscriptionUrl("", BACKFEED, "acme")).toBe("");
  });
});

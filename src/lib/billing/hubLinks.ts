import { hubManageUrl, hubPlanUrl } from "@omnidotdev/providers/react";

import type { HubPlanInterval } from "@omnidotdev/providers/react";

/**
 * Plans are bought and managed on the Omni account hub, the one place every
 * product sells plans. Backfeed shows its own pricing, but its Upgrade and
 * Manage subscription actions link to the hub, which confirms the plan (names
 * and prices from Aether), runs checkout or the billing portal, and returns
 * here. Each link carries the signed-in account's subject as `loginHint`, so
 * the hub opens as the same account. Each helper is empty when no account hub
 * is configured, so the action is hidden rather than dead
 */

const PRODUCT = "backfeed";

/**
 * Backfeed's absolute origin for a return URL: the configured base URL, else
 * the browser's origin, so the return stays absolute when the base URL is
 * built empty
 */
const appOrigin = (baseUrl: string | undefined): string | undefined => {
  const origin =
    baseUrl ||
    (typeof window === "undefined" ? undefined : window.location.origin);

  return origin ? origin.replace(/\/+$/, "") : undefined;
};

/** A workspace's settings page, where the hub returns after a plan action */
export const workspaceSettingsUrl = (
  baseUrl: string | undefined,
  workspaceSlug: string,
): string | undefined => {
  const origin = appOrigin(baseUrl);

  return origin ? `${origin}/@${workspaceSlug}/~/settings` : undefined;
};

/**
 * Buy a Backfeed plan on the account hub. Without a workspace the hub asks,
 * listing only workspaces the user owns or administers, and returns to pricing
 * @param accountBaseUrl - Account hub base URL
 * @param baseUrl - Backfeed's base URL, for the return
 */
export const upgradePlanUrl = (
  accountBaseUrl: string | undefined,
  baseUrl: string | undefined,
  {
    plan,
    interval,
    workspaceSlug,
    loginHint,
  }: {
    plan: string;
    interval: HubPlanInterval;
    workspaceSlug?: string;
    /** The signed-in account's subject */
    loginHint?: string | null;
  },
): string => {
  const origin = appOrigin(baseUrl);

  return hubPlanUrl(accountBaseUrl, {
    product: PRODUCT,
    plan,
    interval,
    workspace: workspaceSlug,
    returnUrl: workspaceSlug
      ? workspaceSettingsUrl(baseUrl, workspaceSlug)
      : origin
        ? `${origin}/pricing`
        : undefined,
    loginHint,
  });
};

/**
 * The account hub's profile page. The hub link helpers have no profile page,
 * so this one link is built here, carrying the same `login_hint` they would.
 * Empty when no account hub is configured
 * @param accountBaseUrl - Account hub base URL
 * @param loginHint - The signed-in account's subject
 */
export const hubProfileUrl = (
  accountBaseUrl: string | undefined,
  loginHint?: string | null,
): string => {
  if (!accountBaseUrl) return "";

  const url = `${accountBaseUrl.replace(/\/+$/, "")}/profile`;
  if (!loginHint) return url;

  return `${url}?${new URLSearchParams({ login_hint: loginHint })}`;
};

/**
 * Manage a workspace's Backfeed plan (change or cancel it, payment method,
 * invoices) on the account hub, returning to the workspace's settings page
 * @param accountBaseUrl - Account hub base URL
 * @param baseUrl - Backfeed's base URL, for the return
 * @param loginHint - The signed-in account's subject
 */
export const manageSubscriptionUrl = (
  accountBaseUrl: string | undefined,
  baseUrl: string | undefined,
  workspaceSlug: string,
  loginHint?: string | null,
): string =>
  hubManageUrl(accountBaseUrl, {
    product: PRODUCT,
    workspace: workspaceSlug,
    returnUrl: workspaceSettingsUrl(baseUrl, workspaceSlug),
    loginHint,
  });

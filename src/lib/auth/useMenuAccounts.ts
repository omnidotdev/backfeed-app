import { useRememberedAccounts } from "@omnidotdev/providers/react";
import { useMemo } from "react";

import type { RememberedAccount } from "@omnidotdev/providers/react";
import type { AccountMenuAccount } from "@omnidotdev/thornberry/account-menu";

/**
 * Remembered accounts as account menu entries, keyed by their handle (the
 * `login_hint` that switches to them)
 * @param accounts - The accounts signed in on this browser
 */
export const toMenuAccounts = (
  accounts: RememberedAccount[],
): AccountMenuAccount[] =>
  accounts.map(({ handle, name, email, image }) => ({
    id: handle,
    name,
    email,
    image,
  }));

/**
 * The accounts signed in on this browser, for the account menu to list the
 * other ones inline. Empty while signed out or when the identity provider does
 * not answer
 * @param authBaseUrl - Identity provider base URL
 * @param enabled - Whether the app is signed in
 */
export const useMenuAccounts = (
  authBaseUrl: string | undefined,
  enabled: boolean,
): AccountMenuAccount[] => {
  const accounts = useRememberedAccounts({ authBaseUrl, enabled });

  return useMemo(() => toMenuAccounts(accounts), [accounts]);
};

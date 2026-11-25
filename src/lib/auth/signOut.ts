import { signOutLocal } from "@/server/functions/auth";

import type { IdpLogoutConfig } from "@omnidotdev/providers/auth";

/**
 * Sign out from the application with federated logout
 *
 * Clears local session then redirects to IDP end_session_endpoint
 * to also clear the identity provider session
 * @param options.accounts - Which accounts on the browser to sign out of:
 * only this app's (`"current"`) or every one (`"all"`). Unset, the identity
 * provider asks when more than one is signed in
 */
const signOut = async ({
  accounts,
}: Pick<IdpLogoutConfig, "accounts"> = {}) => {
  const { idpLogoutUrl } = await signOutLocal({ data: { accounts } });

  // Redirect to IDP for federated logout, or fallback to home
  window.location.href = idpLogoutUrl ?? "/";
};

export default signOut;

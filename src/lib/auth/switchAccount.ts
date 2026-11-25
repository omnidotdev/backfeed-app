import { switchAccountParams } from "@omnidotdev/providers/auth";

import authClient from "@/lib/auth/authClient";

/**
 * Switch to another Omni account: re-run sign-in with `prompt=select_account`,
 * which opens the Omni account picker (accounts signed in on this device, or
 * another one). With a remembered account's handle it continues as that
 * account without asking. Coming back signs the app in as the chosen account
 * on the same page; cancelling leaves the current account signed in
 * @param loginHint - Handle of the remembered account to switch to
 */
const switchAccount = async (loginHint?: string) => {
  await authClient.signIn.social({
    provider: "omni",
    callbackURL: `${window.location.pathname}${window.location.search}`,
    additionalParams: switchAccountParams(loginHint),
  });
};

export default switchAccount;

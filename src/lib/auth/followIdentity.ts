import signIn from "@/lib/auth/signIn";
import { signOutLocal } from "@/server/functions/auth";

/**
 * Responses to the browser's identity provider session changing under this
 * app (see `useIdentitySync`). Both end only this app's session, never the
 * identity provider's
 */

/** Signed out of Omni in another app: sign out here too */
export const followSignOut = async () => {
  await signOutLocal();
  window.location.href = "/";
};

/**
 * Another Omni account is now active: sign in again, which completes without
 * a prompt as that account, and come back to the same page
 */
export const followSwitch = async () => {
  await signOutLocal();
  await signIn({
    redirectUrl: `${window.location.pathname}${window.location.search}`,
  });
};

import authClient from "@/lib/auth/authClient";

/**
 * Switch to another Omni account: re-run sign-in with `prompt=select_account`,
 * which opens the Omni account picker (accounts signed in on this device, or
 * another one). Coming back signs the app in as the chosen account on the same
 * page; cancelling leaves the current account signed in
 */
const switchAccount = async () => {
  await authClient.signIn.social({
    provider: "omni",
    callbackURL: `${window.location.pathname}${window.location.search}`,
    additionalParams: { prompt: "select_account" },
  });
};

export default switchAccount;

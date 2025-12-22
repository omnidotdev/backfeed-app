import authClient from "@/lib/auth/authClient";

interface Params {
  /** Redirect URL. */
  redirectUrl: string;
  // TODO: handle sign-up action if Better Auth supports it
  // action?: "sign-up";
}

/**
 * Sign in with OAuth2 provider.
 */
const signIn = async ({ redirectUrl }: Params) => {
  await authClient.signIn.oauth2({
    // TODO env var/derive for the self-hosting fam
    providerId: "omni",
    callbackURL: redirectUrl,
  });
};

export default signIn;

import authClient from "@/lib/auth/authClient";

interface Params {
  /** Redirect URL after authentication. */
  redirectUrl: string;
  /** Action to perform (sign-in or sign-up). */
  action?: "sign-in" | "sign-up";
}

/**
 * Sign in or sign up with OAuth2 provider.
 */
const signIn = async ({ redirectUrl, action = "sign-in" }: Params) => {
  await authClient.signIn.oauth2({
    // TODO env var/derive for the self-hosting fam
    providerId: "omni",
    callbackURL: redirectUrl,
    // Pass screen_hint to OIDC provider to show sign-up form
    ...(action === "sign-up" && {
      additionalData: { screen_hint: "signup" },
    }),
  });
};

export default signIn;

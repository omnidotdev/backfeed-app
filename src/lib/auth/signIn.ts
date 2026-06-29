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
    // Flag a sign-up so the server config promotes it to OIDC `prompt=create`
    // (see `authorizationUrlParams` in auth.ts); `additionalData` on its own
    // never reaches the authorization URL
    ...(action === "sign-up" && {
      additionalData: { screen_hint: "signup" },
    }),
  });
};

export default signIn;

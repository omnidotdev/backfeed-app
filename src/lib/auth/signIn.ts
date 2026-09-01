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
  await authClient.signIn.social({
    // TODO env var/derive for the self-hosting fam
    provider: "omni",
    callbackURL: redirectUrl,
    // Forward an explicit sign-up to the IDP via the standard OIDC
    // `prompt=create` (the IDP's sign-up page). `additionalParams` reaches the
    // authorization URL directly and overrides the provider's default `prompt`
    ...(action === "sign-up" && {
      additionalParams: { prompt: "create" },
    }),
  });
};

export default signIn;

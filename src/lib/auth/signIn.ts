import authClient from "@/lib/auth/authClient";

/**
 * Sign in with OAuth2 provider.
 */
const signIn = async ({
  redirectUrl,
  action,
}: {
  redirectUrl: string;
  action?: "sign-up";
}) => {
  await authClient.signIn.oauth2({
    providerId: "omni",
    callbackURL: redirectUrl,
    // TODO: handle sign-up action if Better Auth supports it
  });
};

export default signIn;

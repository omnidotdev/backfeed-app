import authClient from "lib/auth/authClient";

/**
 * Sign in with OAuth2 provider.
 */
const signIn = async ({ redirectUrl }: { redirectUrl: string }) => {
  await authClient.signIn.oauth2({
    providerId: "omni",
    callbackURL: redirectUrl,
  });
};

export default signIn;

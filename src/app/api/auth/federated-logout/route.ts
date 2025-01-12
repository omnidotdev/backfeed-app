import { auth } from "auth";
import { AUTH_KEYCLOAK_ISSUER, BASE_URL } from "lib/config";

/**
 * Federated logout route handler. This route is used to handle the backchannel logout flow.
 */
export const GET = async () => {
  let redirectURL = BASE_URL!;

  try {
    const session = await auth();

    if (session) {
      const signOutURL = `${AUTH_KEYCLOAK_ISSUER!}/protocol/openid-connect/logout`;

      const signOutParams = new URLSearchParams({
        id_token_hint: session.user.idToken!,
        post_logout_redirect_uri: redirectURL,
      });

      redirectURL = `${signOutURL}?${signOutParams.toString()}`;
    }
  } catch (error) {
    console.error(error);
  }

  return Response.json({ url: redirectURL });
};

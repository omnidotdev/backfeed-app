import { auth } from "auth";

/**
 * Federated logout route handler. This route is used to handle the backchannel logout flow.
 */
export const GET = async () => {
  let redirectURL = "http://localhost:3000/";

  try {
    const session = await auth();

    if (session) {
      const signOutURL =
        "https://hidra.omni.dev/realms/test/protocol/openid-connect/logout";

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

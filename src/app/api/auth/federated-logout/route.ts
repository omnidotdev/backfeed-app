import { auth } from "auth";
// import { AUTH_CLIENT_ID, AUTH_ISSUER } from "lib/config";

/**
 * Federated logout route handler. This route is used to log the user out of the IDP session.
 */
export const POST = async () => {
  try {
    const session = await auth();

    if (session) {
      // TODO update, below is from Keycloak. Determine proper `end_session_endpoint` for Better Auth (https://linear.app/omnidev/issue/OMNI-304/resolve-federated-logout)
      // await fetch(`${AUTH_ISSUER}/protocol/openid-connect/logout`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     Authorization: `Bearer ${session.accessToken}`,
      //   },
      //   body: new URLSearchParams({
      //     client_id: AUTH_CLIENT_ID!,
      //     client_secret: AUTH_CLIENT_ID!,
      //     refresh_token: session.refreshToken,
      //   }),
      // });
    }

    return Response.json(
      { message: "Successfully logged out of IDP" },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { error: "Error logging out of IDP" },
      { status: 500 },
    );
  }
};

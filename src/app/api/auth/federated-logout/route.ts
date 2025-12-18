import { headers } from "next/headers";

import auth from "lib/auth/auth";

/**
 * Federated logout route handler. This route is used to log the user out of the IDP session.
 */
export const POST = async () => {
  try {
    const reqHeaders = await headers();

    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (session) {
      // TODO update, below is from Keycloak. Determine proper `end_session_endpoint` for Better Auth (https://linear.app/omnidev/issue/OMNI-304/resolve-federated-logout)
      // await fetch(`${AUTH_ISSUER_URL}/protocol/openid-connect/logout`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   body: new URLSearchParams({
      //     client_id: AUTH_CLIENT_ID!,
      //     client_secret: AUTH_CLIENT_ID!,
      //     refresh_token: refreshToken,
      //   }),
      // });
    }

    return Response.json(
      { message: "Successfully logged out of IDP" },
      { status: 200 },
    );
  } catch (_err) {
    return Response.json(
      { error: "Error logging out of IDP" },
      { status: 500 },
    );
  }
};

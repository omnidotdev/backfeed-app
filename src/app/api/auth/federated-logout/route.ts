import { auth } from "auth";

/**
 * Federated logout route handler. This route is used to log the user out of the IDP session.
 */
export const POST = async () => {
  try {
    const session = await auth();

    if (session) {
      await fetch(
        `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: new URLSearchParams({
            client_id: process.env.AUTH_KEYCLOAK_ID!,
            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
            refresh_token: session.refreshToken,
          }),
        }
      );
    }

    return Response.json(
      { message: "Successfully logged out of IDP" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Error logging out of IDP" },
      { status: 500 }
    );
  }
};

import { encode, getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import type { JWT } from "next-auth/jwt";
import type { NextMiddleware, NextRequest } from "next/server";

interface UpdatedProfileClaims {
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
}

interface UpdatedTokens {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

const sessionCookie = process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https://")
  ? "__Secure-authjs.session-token"
  : "authjs.session-token";

/**
 * Sign out handler. This helper function is used to sign out the user from the application.
 * TODO: verify / test this (need to wait for refresh token to expire, or pick up misc flaky errors which hopefully aren't happening)
 */
const signOut = async (request: NextRequest) => {
  try {
    const federatedLogoutResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/federated-logout`
    );

    if (federatedLogoutResponse.ok) {
      const { url } = await federatedLogoutResponse.json();

      const response = NextResponse.redirect(url as string);

      const requestCookies = request.cookies.getAll();

      // Delete all authjs cookies
      for (const cookie of requestCookies) {
        if (cookie.name.includes("authjs.session-token"))
          response.cookies.delete(cookie.name);
      }

      return response;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.next();
  }
};

/**
 * Get updated profile claims handler. This helper function is used to get updated profile claims for the user.
 */
const getUpdatedProfileClaims = async (sessionToken: JWT) => {
  try {
    const response = await fetch(
      `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${sessionToken.access_token}`,
        },
      }
    );

    const { preferred_username, given_name, family_name } =
      (await response.json()) as UpdatedProfileClaims;

    const userClaimsHaveChanged =
      preferred_username !== sessionToken.preferred_username ||
      given_name !== sessionToken.given_name ||
      family_name !== sessionToken.family_name;

    if (!userClaimsHaveChanged) return null;

    return {
      preferred_username: preferred_username as string,
      given_name: given_name as string,
      family_name: family_name as string,
    };
  } catch (error) {
    throw new Error(`Failed to get updated profile claims: ${error}`);
  }
};

/**
 * Refresh access token handler. This helper function is used to refresh the access token for the user, and update the authjs session accordingly.
 */
const refreshAccessToken = async (
  sessionToken: JWT,
  request: NextRequest,
  updatedClaims?: UpdatedProfileClaims
) => {
  try {
    const refreshTokenResponse = await fetch(
      `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.AUTH_KEYCLOAK_ID!,
          client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
          grant_type: "refresh_token",
          refresh_token: sessionToken.refresh_token,
        }),
      }
    );

    const { access_token, expires_in, refresh_token } =
      (await refreshTokenResponse.json()) as UpdatedTokens;

    const newSessionToken = await encode({
      token: {
        ...sessionToken,
        access_token: access_token,
        expires_at: Math.floor(Date.now() / 1000 + expires_in),
        refresh_token: refresh_token,
        ...updatedClaims,
      },
      secret: process.env.AUTH_SECRET!,
      salt: "authjs.session-token", // TODO: create secure salt?
    });

    // There is typically a limit of around 4096 bytes per cookie, though the exact limit varies between browsers. See: https://authjs.dev/concepts/session-strategies#disadvantages
    const size = 3958;
    const regex = new RegExp(`.{1,${size}}`, "g");

    const tokenChunks = newSessionToken.match(regex);

    if (tokenChunks) {
      for (const chunk of tokenChunks) {
        request.cookies.set(
          `${sessionCookie}.${tokenChunks.indexOf(chunk)}`,
          chunk
        );
      }
    }

    // Return the response with the updated cookies within the request headers
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Set the updated cookies within the response headers
    if (tokenChunks) {
      for (const chunk of tokenChunks) {
        response.cookies.set(
          `${sessionCookie}.${tokenChunks.indexOf(chunk)}`,
          chunk
        );
      }
    }

    return response;
  } catch (error) {
    throw new Error(`Failed to refresh access token: ${error}`);
  }
};

/**
 * Middleware function for handling authentication flows on designated routes.
 */
export const middleware: NextMiddleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  try {
    const sessionToken = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
      salt: "authjs.session-token", // TODO: create secure salt?
    });

    // If no session token is found, return the response, indicating that the user is not authenticated
    if (!sessionToken) return response;

    // If the access token has expired, fetching the updated claims will throw an error, so we need to refresh the access token anyways. This should also provide the updated claims set by the user to the backend through the updated access token.
    if (Date.now() >= sessionToken.expires_at * 1000) {
      const refreshResponse = await refreshAccessToken(sessionToken, request);

      return refreshResponse;
    }

    const updatedClaims = await getUpdatedProfileClaims(sessionToken);

    // If the access token has expired or the claims have changed, refresh the access token and update the session token
    if (updatedClaims) {
      const updatedClaimsResponse = await refreshAccessToken(
        sessionToken,
        request,
        updatedClaims
      );

      return updatedClaimsResponse;
    }

    return response;
  } catch (error) {
    console.error(error);

    // If there is an error, sign out the user
    return await signOut(request);
  }
};

export const config = {
  // See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

import ms from "ms";
import { encode, getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { auth } from "auth";
import { isProdEnv } from "lib/config";
import { getSdk } from "lib/graphql";

import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { NextRequest } from "next/server";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

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

// TODO: update this to sign in route when custom auth pages are implemented
const REDIRECT_PATH = "/";

const SESSION_COOKIE_PREFIX = "authjs.session-token";

const sessionCookie = process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https://")
  ? `__Secure-${SESSION_COOKIE_PREFIX}`
  : SESSION_COOKIE_PREFIX;

/**
 * Redirect helper function. This helper function is used to redirect the user's request.
 * NB: need to use rewrite instead of redirect to avoid infinite redirect loop if the user is already on the redirect path
 */
const redirect = (request: NextAuthRequest, init?: ResponseInit) => {
  if (request.nextUrl.pathname !== REDIRECT_PATH) {
    return NextResponse.redirect(
      new URL(REDIRECT_PATH, request.nextUrl.origin),
      init
    );
  }

  return NextResponse.rewrite(
    new URL(REDIRECT_PATH, request.nextUrl.origin),
    init
  );
};

/**
 * Sign out handler. This helper function is used to sign out the user from the application.
 */
const signOut = async (request: NextAuthRequest) => {
  // Delete session cookie on request as server-side auth will read from the request headers
  request.cookies.delete(sessionCookie);

  const response = redirect(request, {
    headers: request.headers,
  });

  // Delete session cookie on response which will be sent to the browser
  response.cookies.delete(sessionCookie);

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/federated-logout`, {
    method: "POST",
  });

  return response;
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

    const sdk = await getSdk();

    const { userByHidraId: user } = await sdk.User({
      hidraId: sessionToken.sub!,
    });

    const userClaimsHaveChanged =
      preferred_username !== sessionToken.preferred_username ||
      given_name !== sessionToken.given_name ||
      family_name !== sessionToken.family_name ||
      user?.customerId !== sessionToken.customer_id ||
      user?.productId !== sessionToken.product_id;

    if (!userClaimsHaveChanged) return null;

    return {
      preferred_username: preferred_username as string,
      given_name: given_name as string,
      family_name: family_name as string,
      customer_id: user?.customerId ?? null,
      product_id: user?.productId ?? null,
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
  request: NextAuthRequest,
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
      // See: https://github.com/nextauthjs/next-auth/discussions/9133#discussioncomment-9732602
      salt: sessionCookie,
    });

    // Set the session cookie on request as server-side auth will read from the request headers
    request.cookies.set(sessionCookie, newSessionToken);

    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Set the session cookie on response which will be sent to the browser
    response.cookies.set({
      name: sessionCookie,
      value: newSessionToken,
      httpOnly: true,
      secure: isProdEnv,
      sameSite: "lax", // default for authjs session cookies
      path: "/",
    });

    return response;
  } catch (error) {
    throw new Error(`Failed to refresh access token: ${error}`);
  }
};

/**
 * Middleware function for handling authentication flows on designated routes.
 * TODO: handle subscription changes. Cancels, revokes, etc.
 */
export const middleware = auth(async (request) => {
  if (!request.auth) {
    if (request.nextUrl.pathname === "/pricing") {
      return NextResponse.next();
    }

    return redirect(request);
  }

  if (
    request.nextUrl.pathname.startsWith("/payment") &&
    !!request.auth.user.customerId
  ) {
    return redirect(request);
  }

  try {
    const sessionToken = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
      // See: https://github.com/nextauthjs/next-auth/discussions/9133#discussioncomment-9732602
      salt: sessionCookie,
    });

    // Difference between access token and refresh token expiry times
    const REFRESH_TOKEN_DIFFERENCE = ms("25m");

    const ACCESS_TOKEN_EXPIRES_AT = sessionToken?.expires_at! * ms("1s");
    const REFRESH_TOKEN_EXPIRES_AT =
      ACCESS_TOKEN_EXPIRES_AT + REFRESH_TOKEN_DIFFERENCE;

    // If the refresh token has expired, sign out the user
    if (Date.now() >= REFRESH_TOKEN_EXPIRES_AT) {
      return await signOut(request);
    }

    // If the access token has expired, fetching the updated claims will throw an error, so we need to refresh the access token anyways. This should also provide the updated claims set by the user to the backend through the updated access token.
    if (Date.now() >= ACCESS_TOKEN_EXPIRES_AT) {
      const refreshResponse = await refreshAccessToken(sessionToken!, request);

      if (refreshResponse.ok) {
        return refreshResponse;
      }

      throw new Error("Failed to refresh access token");
    }

    const updatedClaims = await getUpdatedProfileClaims(sessionToken!);

    // If the user's profile claims have changed, refresh the access token and update the session accordingly
    if (updatedClaims) {
      const updatedClaimsResponse = await refreshAccessToken(
        sessionToken!,
        request,
        updatedClaims
      );

      if (updatedClaimsResponse.ok) {
        return updatedClaimsResponse;
      }

      throw new Error("Failed to update profile claims");
    }

    // If the access token has not expired and the user's profile claims have not changed, return the response
    return NextResponse.next();
  } catch (error) {
    console.error(error);

    // If there is an error, sign out the user
    return await signOut(request);
  }
});

export const config = {
  // See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - img, favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|img|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

import { encode, getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import type { JWT } from "next-auth/jwt";
import type { NextMiddleware, NextRequest } from "next/server";

const sessionCookie = process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https://")
  ? "__Secure-authjs.session-token"
  : "authjs.session-token";

const signOut = (request: NextRequest) => {
  // TODO: update to use federated-logout handler here?
  const response = NextResponse.redirect(new URL("/", request.url));

  const requestCookies = request.cookies.getAll();

  for (const cookie of requestCookies) {
    if (cookie.name.includes("authjs.session-token"))
      response.cookies.delete(cookie.name);
  }

  return response;
};

const refreshAccessToken = async (sessionToken: JWT) => {
  try {
    const response = await fetch(
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

    const { access_token, expires_in, refresh_token } = await response.json();

    return {
      access_token,
      expires_at: Math.floor(Date.now() / 1000 + expires_in),
      refresh_token,
    };
  } catch (error) {
    throw new Error(`Failed to refresh access token: ${error}`);
  }
};

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
      await response.json();

    const userClaimsHaveChanged =
      preferred_username !== sessionToken.preferred_username ||
      given_name !== sessionToken.given_name ||
      family_name !== sessionToken.family_name;

    if (!userClaimsHaveChanged) return null;

    return {
      preferred_username,
      given_name,
      family_name,
    };
  } catch (error) {
    throw new Error(`Failed to get updated profile claims: ${error}`);
  }
};

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  try {
    const sessionToken = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
      salt: "authjs.session-token", // TODO: create secure salt?
    });

    if (!sessionToken) return response;

    const updatedClaims = await getUpdatedProfileClaims(sessionToken);

    if (updatedClaims || Date.now() >= sessionToken.expires_at * 1000) {
      const updatedTokens = await refreshAccessToken(sessionToken);

      const newSessionToken = await encode({
        token: {
          ...sessionToken,
          ...updatedTokens,
          ...updatedClaims,
        },
        secret: process.env.AUTH_SECRET!,
        salt: "authjs.session-token", // TODO: create secure salt?
      });

      const size = 3933;
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

      const response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });

      if (tokenChunks) {
        for (const chunk of tokenChunks) {
          response.cookies.set(
            `${sessionCookie}.${tokenChunks.indexOf(chunk)}`,
            chunk
          );
        }
      }

      return response;
    }

    return response;
  } catch (error) {
    console.error(error);

    return signOut(request);
  }
};

import { NextResponse } from "next/server";

import { auth } from "auth";

import type { Session } from "next-auth";
import type { NextRequest } from "next/server";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

// TODO: update this to sign in route when custom auth pages are implemented
const REDIRECT_PATH = "/";

const SESSION_COOKIE_PREFIX = "authjs.session-token";

const sessionCookie = process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https://")
  ? `__Secure-${SESSION_COOKIE_PREFIX}`
  : SESSION_COOKIE_PREFIX;

/**
 * Redirect the user's request.
 * NB: need to use rewrite instead of redirect to avoid infinite redirect loop if the user is already on the redirect path
 */
const redirect = (request: NextAuthRequest, init?: ResponseInit) => {
  if (request.nextUrl.pathname !== REDIRECT_PATH) {
    return NextResponse.redirect(
      new URL(REDIRECT_PATH, request.nextUrl.origin),
      init,
    );
  }

  return NextResponse.rewrite(
    new URL(REDIRECT_PATH, request.nextUrl.origin),
    init,
  );
};

/**
 * Sign out handler used to sign out the user from the application.
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
 * Middleware function for handling authentication flows on designated routes.
 */
export const middleware = auth(async (request) => {
  // NB: Used to bypass preflight checks. See: https://github.com/vercel/next.js/discussions/75668
  // TODO: look into the security of this as this is a temporary workaround to allow for sign in / sign up flows to work properly in Safari
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { status: 200 });
  }

  // If there is an error from the refresh token rotation, sign out the user (i.e. refresh token was expired)
  if (request.auth?.error) {
    return await signOut(request);
  }

  // Redirect user to their profile page upon successful checkout (or force redirect when trying to access confirmation route)
  if (request.nextUrl.pathname.startsWith("/confirmation")) {
    if (!request.auth) {
      return redirect(request);
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${request.auth?.user?.hidraId}/subscription`,
    );
  }

  // If the access token is not expired and there was no error refreshing the token, return the response
  return NextResponse.next();
});

export const config = {
  // See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - pricing (not authenticated routes)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - img, favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!pricing|api|_next/static|_next/image|img|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

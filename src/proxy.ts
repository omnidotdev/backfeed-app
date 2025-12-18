import { NextResponse } from "next/server";

import auth from "lib/auth/auth";

import type { NextRequest } from "next/server";

// TODO: update this to sign in route when custom auth pages are implemented
const REDIRECT_PATH = "/";

const SESSION_COOKIE_PREFIX = "better-auth.session_token";

const sessionCookie = process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https://")
  ? `__Secure-${SESSION_COOKIE_PREFIX}`
  : SESSION_COOKIE_PREFIX;

/**
 * Redirect the user's request.
 * NB: need to use rewrite instead of redirect to avoid infinite redirect loop if the user is already on the redirect path
 */
const redirect = (request: NextRequest, init?: ResponseInit) => {
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
const _signOut = async (request: NextRequest) => {
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
 * Proxy function for handling authentication flows on designated routes.
 */
export const proxy = async (request: NextRequest) => {
  // NB: Used to bypass preflight checks. See: https://github.com/vercel/next.js/discussions/75668
  // TODO: look into the security of this as this is a temporary workaround to allow for sign in / sign up flows to work properly in Safari
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { status: 200 });
  }

  // get the session using Better Auth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If the user is not authenticated, redirect to the landing page
  if (!session) {
    return redirect(request);
  }

  // redirect user to their profile page upon successful checkout (or force redirect when trying to access confirmation route)
  if (request.nextUrl.pathname.startsWith("/confirmation")) {
    // get access token to extract identityProviderId from the id token
    try {
      const tokenResult = await auth.api.getAccessToken({
        body: { providerId: "omni" },
        headers: request.headers,
      });

      if (tokenResult?.idToken) {
        const payloadBase64 = tokenResult.idToken.split(".")[1];
        const payloadJson = Buffer.from(payloadBase64, "base64").toString(
          "utf-8",
        );
        const payload = JSON.parse(payloadJson);
        const identityProviderId = payload.sub;

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${identityProviderId}/organizations`,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return NextResponse.next();
};

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

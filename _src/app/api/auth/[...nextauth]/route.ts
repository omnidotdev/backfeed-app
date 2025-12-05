/**
 * @file Auth route handlers.
 * This workaround is necessary to properly set up callback URLs and other configuration. This solution is from https://github.com/nextauthjs/next-auth/issues/10928#issuecomment-2144241314
 */

import { NextRequest } from "next/server";

import { handlers } from "auth";

const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
  if (process.env.AUTH_TRUST_HOST !== "true") return req;

  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("x-forwarded-host");

  if (!proto || !host) {
    console.warn("Missing x-forwarded-proto or x-forwarded-host headers.");
    return req;
  }

  const envOrigin = `${proto}://${host}`;

  const { href, origin } = req.nextUrl;

  return new NextRequest(href.replace(origin, envOrigin), req);
};

export const GET = (req: NextRequest) =>
  handlers.GET(reqWithTrustedOrigin(req));

export const POST = (req: NextRequest) =>
  handlers.POST(reqWithTrustedOrigin(req));

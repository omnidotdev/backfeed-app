/**
 * @file Auth route handlers.
 * This workaround is necessary to properly set up callback URLs and other configuration. This solution is from https://github.com/nextauthjs/next-auth/issues/10928#issuecomment-2144241314
 */

import { handlers } from "auth";
import { NextRequest } from "next/server";

const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
  if (process.env.AUTH_TRUST_HOST !== "true") return req;

  const proto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("x-forwarded-host");

  if (!proto || !host) {
    console.warn("Missing x-forwarded-proto or x-forwarded-host headers.");
    return req;
  }

  const envOrigin = `${proto}://${host}`;

  const { href, origin, search } = req.nextUrl;

  console.info("Search params:", req.nextUrl.search);

  const newHref = href.replace(origin, envOrigin) + (search ?? "");

  console.info("New HREF:", newHref);

  return new NextRequest(newHref, {
    headers: req.headers,
    method: req.method,
    body: req.body,
  });
};

export const GET = (req: NextRequest) =>
  handlers.GET(reqWithTrustedOrigin(req));

export const POST = (req: NextRequest) =>
  handlers.POST(reqWithTrustedOrigin(req));

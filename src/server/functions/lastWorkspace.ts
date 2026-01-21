import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "backfeed:lastWorkspaceSlug";
const COOKIE_TTL = 60 * 60 * 24 * 7; // 7 days

export const getLastWorkspaceCookie = createServerFn({ method: "GET" }).handler(
  async () => getCookie(COOKIE_NAME) ?? null,
);

export const setLastWorkspaceCookie = createServerFn({ method: "POST" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: slug }) => {
    setCookie(COOKIE_NAME, slug, {
      maxAge: COOKIE_TTL,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });
  });

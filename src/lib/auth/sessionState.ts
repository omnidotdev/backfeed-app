/**
 * A session is "degraded" when it is authenticated but carries no access token.
 *
 * `getAuth` deliberately serves a still-valid session without a fresh access
 * token when the refresh-token grant fails (a benign rotation race, or a dead
 * refresh-token family). In that state userinfo org hydration is skipped, so
 * `organizations` comes back empty. A degraded session therefore renders
 * identically to a genuinely workspace-less user; callers use this predicate to
 * tell the two apart and prompt a re-login instead of showing a silent empty
 * state (a dead session never self-heals on a page that makes no API call, so
 * no 401 -> re-auth redirect ever fires).
 */
export const isSessionDegraded = (
  session: { accessToken?: string | null } | null | undefined,
): boolean => !!session && !session.accessToken;

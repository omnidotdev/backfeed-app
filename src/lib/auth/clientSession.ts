import type { GetAuthSession } from "@/lib/auth/getAuth";

/**
 * Project a resolved auth session onto the fields the browser reads.
 *
 * Whatever a server function returns is serialized into the SSR HTML and the
 * server function response, so it is readable by client JavaScript. The raw
 * Better Auth result carries the session token (the value of the httpOnly
 * session cookie), the client IP address, and the user agent; spreading it
 * would hand the session cookie to any script on the page. Whitelist instead
 */
export const toClientSession = (session: GetAuthSession | null) => {
  if (!session) return null;

  const { user } = session;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      identityProviderId: user.identityProviderId,
      rowId: user.rowId,
      username: user.username as string | undefined,
    },
    accessToken: session.accessToken,
    organizations: session.organizations,
  };
};

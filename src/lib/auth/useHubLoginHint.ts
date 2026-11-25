import { useRouteContext } from "@tanstack/react-router";

/**
 * The signed-in account's subject, passed as `loginHint` on links to the
 * account hub so the hub opens as the same account. Only the subject, never an
 * email or token. Undefined while signed out
 */
const useHubLoginHint = (): string | undefined => {
  const { session } = useRouteContext({ from: "__root__" });

  return session?.user?.identityProviderId ?? undefined;
};

export default useHubLoginHint;

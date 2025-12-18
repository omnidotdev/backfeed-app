import authClient from "lib/auth/authClient";

import type { AuthUser } from "lib/util/getAuthSession/getAuthSession";

/**
 * Access authentication state and user data.
 */
const useAuth = () => {
  const { data, isPending, error } = authClient.useSession();

  const user = data?.user as AuthUser | undefined;

  return {
    isAuthenticated: !!data?.session && !error,
    isLoading: isPending,
    user,
    session: data?.session,
  };
};

export default useAuth;

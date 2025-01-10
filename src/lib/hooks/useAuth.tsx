import { useSession } from "next-auth/react";

import { MOCK_USER_ID } from "lib/config";

/**
 * Access authentication state and user data.
 */
const useAuth = () => {
  const { data, status, update } = useSession();

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    // ! NB: mock user ID from seeded database until we sync completely with hidra authentication flow
    user: { ...data?.user, id: MOCK_USER_ID },
    expiresAt: data?.expires,
    update,
  };
};

export default useAuth;

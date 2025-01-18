import { useSession } from "next-auth/react";

/**
 * Access authentication state and user data.
 */
const useAuth = () => {
  const { data, status, update } = useSession();

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    user: data?.user,
    expiresAt: data?.expires,
    accessToken: data?.accessToken,
    error: data?.error,
    update,
  };
};

export default useAuth;

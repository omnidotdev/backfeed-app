import { useSession } from "next-auth/react";

/**
 * Access authentication state and user data.
 */
const useAuth = () => {
  const { data, status, update } = useSession();

  return {
    // ! NB: The error property is defined when there is an issue with refreshing the session (refresh token is expired). In some instances, the status with still return "authenticated" even though this error is present. This extra check will prevent unintended rendering for client components that rely on `isAuthenticated`.
    isAuthenticated: status === "authenticated" && !data?.error,
    isLoading: status === "loading",
    user: data?.user,
    expiresAt: data?.expires,
    accessToken: data?.accessToken,
    update,
  };
};

export default useAuth;

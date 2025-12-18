import authClient from "lib/auth/authClient";

/**
 * Access authentication state and user data.
 */
const useAuth = () => {
  const { data, isPending, error } = authClient.useSession();

  return {
    isAuthenticated: !!data?.session && !error,
    isLoading: isPending,
    user: data?.user,
    session: data?.session,
  };
};

export default useAuth;

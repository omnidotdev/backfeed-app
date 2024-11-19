/**
 * Access authentication state and user data.
 * NB: this is only used for mock and development purposes. To simulate logging in/out, manually switch `isAuthenticated` to `true` or `false`.
 */
const useAuth = () => ({
  isAuthenticated: false,
  firstName: "Back",
  lastName: "Feed",
});

export default useAuth;

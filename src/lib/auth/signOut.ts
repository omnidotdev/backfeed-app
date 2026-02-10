import { signOutLocal } from "@/server/functions/auth";

/**
 * Sign out from the application with federated logout
 *
 * Clears local session then redirects to IDP end_session_endpoint
 * to also clear the identity provider session
 */
const signOut = async () => {
  const { idpLogoutUrl } = await signOutLocal();

  // Redirect to IDP for federated logout, or fallback to home
  window.location.href = idpLogoutUrl ?? "/";
};

export default signOut;

import authClient from "@/lib/auth/authClient";

/**
 * Sign out from the application.
 *
 * TODO: Implement federated logout to also sign out from the IDP session.
 */
const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/";
      },
    },
  });
};

export default signOut;

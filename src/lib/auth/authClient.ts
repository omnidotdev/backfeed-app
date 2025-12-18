import { genericOAuthClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

/**
 * Auth browser client.
 */
const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
});

export default authClient;

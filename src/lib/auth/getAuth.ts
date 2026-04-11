import { createGetAuth } from "@omnidotdev/providers/auth";
import { setCookie } from "@tanstack/react-start/server";

import auth from "@/lib/auth/auth";
import { authCache, oidc } from "@/lib/auth/authCache";

export type {
  GetAuthSession,
  OrganizationClaim,
} from "@omnidotdev/providers/auth";

const getAuth = createGetAuth({
  authApi: auth.api,
  oidc,
  authCache,
  setCookie,
});

export { getAuth };

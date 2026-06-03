import { createGetAuth } from "@omnidotdev/providers/auth";
import { setCookie } from "@tanstack/react-start/server";
import { GraphQLClient } from "graphql-request";

import { getSdk } from "@/generated/graphql.sdk";
import auth from "@/lib/auth/auth";
import { authCache, oidc } from "@/lib/auth/authCache";
import { API_INTERNAL_GRAPHQL_URL } from "@/lib/config/env.config";

import type { ResolveRowIdFn } from "@omnidotdev/providers/auth";

export type {
  GetAuthSession,
  OrganizationClaim,
} from "@omnidotdev/providers/auth";

/**
 * Resolve the app's user-row UUID from the GraphQL API by identity provider ID.
 * Populates `session.user.rowId`, which gates the dashboard redirect and is used
 * as the current user identity throughout the app (votes, comments, profile).
 */
export const resolveRowId: ResolveRowIdFn = async ({
  accessToken,
  identityProviderId,
}) => {
  try {
    const graphqlClient = new GraphQLClient(API_INTERNAL_GRAPHQL_URL!, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const sdk = getSdk(graphqlClient);
    const { userByIdentityProviderId } = await sdk.User({ identityProviderId });

    return userByIdentityProviderId?.rowId ?? null;
  } catch (error) {
    console.error("[getAuth] Failed to resolve rowId:", error);
    return null;
  }
};

const getAuth = createGetAuth({
  authApi: auth.api,
  oidc,
  authCache,
  setCookie,
  resolveRowId,
});

export { getAuth };

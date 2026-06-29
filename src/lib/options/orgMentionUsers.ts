import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";
import { fetchOrganizationMembers } from "@/lib/idp";

import type { MentionableUser } from "@/lib/hooks/useMentionableUsers";

interface OrgMentionUsersData {
  users: {
    nodes: Array<{
      rowId: string;
      username: string | null;
      identityProviderId: string;
    }>;
  } | null;
}

// resolve the org roster's IDP identities to their backfeed accounts; the
// mention link must carry the backfeed user rowId so the server-side parser can
// resolve and notify the mentioned user. `identityProviderId` is the OIDC `sub`,
// which equals the IDP member's `userId`
const ORG_MENTION_USERS_QUERY = `
  query OrgMentionUsers($ids: [UUID!]!) {
    users(
      filter: { identityProviderId: { in: $ids } }
      orderBy: USERNAME_ASC
      first: 500
    ) {
      nodes {
        rowId
        username
        identityProviderId
      }
    }
  }
`;

/** Query key for an organization's `@`-mention roster. */
export const orgMentionUsersQueryKey = (organizationId: string) =>
  ["orgMentionUsers", organizationId] as const;

/**
 * The organization's full member roster (the IDP source of truth), resolved to
 * the backfeed accounts that back them and shaped for the `@`-mention builder.
 * Mirrors GitHub: any org member is mentionable, not just prior participants.
 * Members without a backfeed account (never signed in) are dropped, since a
 * mention can only resolve and notify an existing backfeed user. Falls back to
 * the IDP display name when a member has no backfeed username.
 */
export const orgMentionUsersOptions = (params: {
  organizationId?: string;
  accessToken?: string;
}) =>
  queryOptions({
    queryKey: orgMentionUsersQueryKey(params.organizationId ?? ""),
    queryFn: async (): Promise<MentionableUser[]> => {
      const { data: members } = await fetchOrganizationMembers(
        params.organizationId!,
        params.accessToken!,
      );

      // IDP `userId` is the OIDC `sub`, mapped to backfeed `identityProviderId`
      const nameBySub = new Map<string, string>();
      for (const member of members) {
        nameBySub.set(member.userId, member.user?.name ?? member.user?.email);
      }

      const ids = [...nameBySub.keys()];
      if (!ids.length) return [];

      const data = await graphqlFetch<OrgMentionUsersData, { ids: string[] }>(
        ORG_MENTION_USERS_QUERY,
        { ids },
      )();

      return (data.users?.nodes ?? []).map((user) => ({
        rowId: user.rowId,
        username: user.username ?? nameBySub.get(user.identityProviderId),
      }));
    },
    enabled: Boolean(params.organizationId) && Boolean(params.accessToken),
  });

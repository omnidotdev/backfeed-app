import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

import type { MentionableUser } from "@/lib/hooks/useMentionableUsers";

interface ProjectParticipantsData {
  users: {
    nodes: Array<{ rowId: string; username: string | null }>;
  } | null;
}

interface ProjectParticipantsVars {
  projectId: string;
}

// raw document (no codegen needed); the project's post authors, offered as
// `@`-mention candidates in the post composer (a new post has no comment thread
// to source participants from)
const PROJECT_PARTICIPANTS_QUERY = `
  query ProjectParticipants($projectId: UUID!) {
    users(
      filter: { posts: { some: { projectId: { equalTo: $projectId } } } }
      orderBy: USERNAME_ASC
      first: 200
    ) {
      nodes {
        rowId
        username
      }
    }
  }
`;

/** Query key for a project's `@`-mention candidates. */
export const projectParticipantsQueryKey = (projectId: string) =>
  ["ProjectParticipants", projectId] as const;

/**
 * Backfeed users who have authored a post in the project, shaped for the
 * shared `@`-mention builder. Keyed on the backfeed user rowId so the mention
 * link matches the comment-thread participant source.
 */
export const projectParticipantsOptions = (params: { projectId?: string }) =>
  queryOptions({
    queryKey: projectParticipantsQueryKey(params.projectId ?? ""),
    queryFn: graphqlFetch<ProjectParticipantsData, ProjectParticipantsVars>(
      PROJECT_PARTICIPANTS_QUERY,
      { projectId: params.projectId ?? "" },
    ),
    enabled: Boolean(params.projectId),
    select: (data): MentionableUser[] => data.users?.nodes ?? [],
  });

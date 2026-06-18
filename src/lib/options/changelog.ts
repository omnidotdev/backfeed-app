import { infiniteQueryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

/** A shipped post, as shown in the public changelog. */
export interface ChangelogEntry {
  rowId: string;
  number: number | null;
  title: string | null;
  description: string | null;
  shippedAt: string | null;
  statusTemplate: {
    displayName: string;
    color: string | null;
  } | null;
}

interface ChangelogData {
  posts: {
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
    nodes: ChangelogEntry[];
  };
}

// raw document (no codegen needed); shipped posts newest first, the public
// "what we shipped" feed. `shippedAt` is stamped once when a post first ships.
const CHANGELOG_QUERY = `
  query Changelog($projectId: UUID!, $after: Cursor, $pageSize: Int = 20) {
    posts(
      first: $pageSize
      after: $after
      orderBy: [SHIPPED_AT_DESC]
      filter: {
        projectId: { equalTo: $projectId }
        shippedAt: { isNull: false }
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        rowId
        number
        title
        description
        shippedAt
        statusTemplate {
          displayName
          color
        }
      }
    }
  }
`;

/** Query key for a project's changelog, exported for consistent invalidation. */
export const changelogQueryKey = (projectId: string) =>
  ["Changelog", projectId] as const;

/** A project's shipped-post changelog, newest first, paginated. */
export const changelogOptions = (projectId: string) =>
  infiniteQueryOptions({
    queryKey: changelogQueryKey(projectId),
    queryFn: ({ pageParam }) =>
      graphqlFetch<ChangelogData, { projectId: string; after?: string }>(
        CHANGELOG_QUERY,
        { projectId, after: pageParam },
      )(),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.posts.pageInfo.hasNextPage
        ? (lastPage.posts.pageInfo.endCursor ?? undefined)
        : undefined,
    enabled: Boolean(projectId),
  });

import { queryOptions } from "@tanstack/react-query";

import {
  PostReferencesDocument,
  PostsByRowIdsDocument,
} from "@/generated/graphql";
import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

import type {
  PostReferencesQuery,
  PostReferencesQueryVariables,
  PostsByRowIdsQuery,
  PostsByRowIdsQueryVariables,
} from "@/generated/graphql";

/** A post that references the target post (an inbound `#number` reference). */
export interface BackReference {
  rowId: string;
  number: number;
  title: string | null;
}

/** Query key for a post's inbound references. */
export const backReferencesQueryKey = (projectId: string, number: number) =>
  ["PostBackReferences", projectId, number] as const;

/**
 * Posts that reference the target post, read from the authoritative
 * `post_reference` edges. Fetches the edges whose `targetPostId` is this post
 * (restricted to `post` sources, since the panel links to posts), then resolves
 * those source ids back to posts in a second query. The edge is authoritative,
 * so no client-side text scan or word-boundary check is needed.
 */
export const backReferencesOptions = (params: {
  projectId: string;
  rowId: string;
  number: number;
}) =>
  queryOptions({
    queryKey: backReferencesQueryKey(params.projectId, params.number),
    queryFn: async (): Promise<BackReference[]> => {
      const { postReferences } = await graphqlFetch<
        PostReferencesQuery,
        PostReferencesQueryVariables
      >(PostReferencesDocument, { targetPostId: params.rowId })();

      const sourceIds = [
        ...new Set(
          (postReferences?.nodes ?? [])
            .filter((node): node is NonNullable<typeof node> => node != null)
            .map((node) => node.sourceId),
        ),
      ].filter((sourceId) => sourceId !== params.rowId);

      if (!sourceIds.length) return [];

      const { posts } = await graphqlFetch<
        PostsByRowIdsQuery,
        PostsByRowIdsQueryVariables
      >(PostsByRowIdsDocument, { rowIds: sourceIds })();

      return (posts?.nodes ?? [])
        .filter((post): post is NonNullable<typeof post> => post != null)
        .map((post) => ({
          rowId: post.rowId,
          number: post.number ?? 0,
          title: post.title ?? null,
        }));
    },
    enabled: Boolean(params.projectId && params.rowId),
  });

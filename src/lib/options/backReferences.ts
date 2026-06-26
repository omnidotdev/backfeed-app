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
 * Distinct source-post ids from the reference edges, excluding the post's own
 * id (a self-reference is never shown as an inbound reference).
 */
export const referenceSourceIds = (
  nodes: ReadonlyArray<{ sourceId: string } | null> | null | undefined,
  selfRowId: string,
): string[] =>
  [
    ...new Set(
      (nodes ?? [])
        .filter((node): node is NonNullable<typeof node> => node != null)
        .map((node) => node.sourceId),
    ),
  ].filter((sourceId) => sourceId !== selfRowId);

/** Map resolved source posts into the `BackReference` shape the panel renders. */
export const toBackReferences = (
  nodes:
    | ReadonlyArray<{
        rowId: string;
        number?: number | null;
        title?: string | null;
      } | null>
    | null
    | undefined,
): BackReference[] =>
  (nodes ?? [])
    .filter((node): node is NonNullable<typeof node> => node != null)
    .map((node) => ({
      rowId: node.rowId,
      number: node.number ?? 0,
      title: node.title ?? null,
    }));

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

      const sourceIds = referenceSourceIds(postReferences?.nodes, params.rowId);

      if (!sourceIds.length) return [];

      const { posts } = await graphqlFetch<
        PostsByRowIdsQuery,
        PostsByRowIdsQueryVariables
      >(PostsByRowIdsDocument, { rowIds: sourceIds })();

      return toBackReferences(posts?.nodes);
    },
    enabled: Boolean(params.projectId && params.rowId),
  });

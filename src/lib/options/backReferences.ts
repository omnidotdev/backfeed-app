import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";
import { splitIssueRefs } from "@/lib/util/issueRefs";

/** A post that references the target post (an inbound `#number` reference). */
export interface BackReference {
  rowId: string;
  number: number;
  title: string | null;
}

interface BackReferenceNode {
  rowId: string;
  number: number;
  title: string | null;
  description: string | null;
}

interface BackReferencesData {
  posts: { nodes: BackReferenceNode[] };
}

// posts in the same project whose body contains the `#<number>` token. The
// `includes` prefilter is cheap but loose (`#42` also matches `#420`), so the
// real word-boundary check happens client-side via splitIssueRefs.
const BACK_REFERENCES_QUERY = `
  query PostBackReferences($projectId: UUID!, $needle: String!) {
    posts(
      first: 50
      orderBy: [NUMBER_DESC]
      filter: {
        projectId: { equalTo: $projectId }
        description: { includesInsensitive: $needle }
      }
    ) {
      nodes {
        rowId
        number
        title
        description
      }
    }
  }
`;

/** Query key for a post's inbound references. */
export const backReferencesQueryKey = (projectId: string, number: number) =>
  ["PostBackReferences", projectId, number] as const;

/**
 * Posts that reference the target post by `#<number>`. Prefilters on the raw
 * token server-side, then confirms each is a genuine word-boundary reference to
 * exactly this number (not a longer one) and drops the post's self-references.
 */
export const backReferencesOptions = (params: {
  projectId: string;
  rowId: string;
  number: number;
}) =>
  queryOptions({
    queryKey: backReferencesQueryKey(params.projectId, params.number),
    queryFn: graphqlFetch<
      BackReferencesData,
      { projectId: string; needle: string }
    >(BACK_REFERENCES_QUERY, {
      projectId: params.projectId,
      needle: `#${params.number}`,
    }),
    enabled: Boolean(params.projectId && params.number),
    select: (data): BackReference[] =>
      data.posts.nodes
        .filter(
          (post) =>
            post.rowId !== params.rowId &&
            splitIssueRefs(post.description ?? "").some(
              (segment) =>
                segment.type === "ref" && segment.number === params.number,
            ),
        )
        .map((post) => ({
          rowId: post.rowId,
          number: post.number,
          title: post.title,
        })),
  });

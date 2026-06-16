import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

export interface SimilarPost {
  id: string;
  number: number | null;
  title: string | null;
  score: number;
}

interface SimilarPostsData {
  similarPosts: SimilarPost[];
}

interface SimilarPostsVariables {
  projectId: string;
  content: string;
}

// raw query (no codegen needed); the API exposes similarPosts(projectId, content)
const SIMILAR_POSTS_QUERY = `
  query SimilarPosts($projectId: UUID!, $content: String!) {
    similarPosts(projectId: $projectId, content: $content) {
      id
      number
      title
      score
    }
  }
`;

/** Minimum draft length before we bother checking for possible duplicates. */
export const SIMILAR_POSTS_MIN_LENGTH = 4;

/**
 * Possible-duplicate posts for a draft, surfaced while a user writes a new post
 * ("looks like #12 already covers this"). Advisory only.
 */
export const similarPostsOptions = (projectId: string, content: string) =>
  queryOptions({
    queryKey: ["SimilarPosts", projectId, content],
    queryFn: graphqlFetch<SimilarPostsData, SimilarPostsVariables>(
      SIMILAR_POSTS_QUERY,
      { projectId, content },
    ),
    enabled:
      Boolean(projectId) && content.trim().length >= SIMILAR_POSTS_MIN_LENGTH,
    select: (data) => data.similarPosts,
    staleTime: 30_000,
  });

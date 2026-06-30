import { PostOrderBy } from "@/generated/graphql";

/**
 * URL-facing feed sort slugs mapped to their GraphQL order. Slugs are kept
 * lowercase per the URL convention (the URL carries `top`/`newest`, not the
 * SCREAMING_CASE enum).
 */
export const FEED_SORT = {
  top: PostOrderBy.VotesSumWeightDesc,
  newest: PostOrderBy.CreatedAtDesc,
} as const;

export type FeedSortSlug = keyof typeof FEED_SORT;

/** Full GraphQL order array for a sort slug (primary order + stable tiebreaker). */
export const feedOrderBy = (slug: FeedSortSlug): PostOrderBy[] => [
  FEED_SORT[slug],
  PostOrderBy.CreatedAtDesc,
];

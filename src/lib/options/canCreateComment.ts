/**
 * Decide whether a user may comment, given the resolved limit data.
 *
 * Fails open: when the limit cannot be determined (null data from a fetch error
 * or while loading), allow it -- the server enforces the real limit on create, so
 * a transient client-side gap must NOT surface as "maximum reached". A negative
 * limit means unlimited (paid tiers use -1).
 *
 * Kept dependency-free (no server/auth imports) so it is unit-testable in
 * isolation; `comments.ts` re-exports and uses it.
 */
export const canCreateCommentFromData = (
  data: { totalComments: number; commentLimit: number } | null,
): boolean => {
  if (!data) return true;
  if (data.commentLimit < 0) return true;
  return data.totalComments < data.commentLimit;
};

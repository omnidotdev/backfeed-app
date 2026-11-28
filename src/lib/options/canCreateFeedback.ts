/**
 * Decide whether a user may submit feedback, given the resolved limit data.
 *
 * Fails open: when the limit cannot be determined (null data from a fetch error
 * or while loading), allow it -- the server enforces the real limit on create, so
 * a transient client-side gap must NOT hide the feedback form. A negative limit
 * means unlimited (the catalog sets `max_feedback_users` to -1 on every tier).
 * A user who has already submitted feedback is never blocked.
 *
 * Kept dependency-free (no server/auth imports) so it is unit-testable in
 * isolation; `feedback.ts` uses it.
 */
export const canCreateFeedbackFromData = (
  data: {
    activeUserCount: number;
    hasUserSubmittedFeedback: boolean;
    userLimit: number;
  } | null,
): boolean => {
  if (!data) return true;
  if (data.hasUserSubmittedFeedback) return true;
  if (data.userLimit < 0) return true;
  return data.activeUserCount < data.userLimit;
};

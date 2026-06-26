import { useMemo } from "react";

import type { MentionItem } from "@/components/ui/rich-text-editor";

/** A user that can be offered in the `@`-mention typeahead. */
export interface MentionableUser {
  /** Backfeed user rowId; becomes the mention link's profile id. */
  rowId?: string | null;
  /** Display label shown after the `@`. */
  username?: string | null;
}

/**
 * Map users to deduped {@link MentionItem}s linking to `/profile/<rowId>/account`.
 * The server-side mention parser keys on that `/profile/<uuid>` link to resolve
 * the mentioned user, so the url shape is load-bearing and must stay in sync
 * with it. Users missing a rowId or username are skipped.
 */
export const toMentionItems = (
  users: ReadonlyArray<MentionableUser | null | undefined> | null | undefined,
): MentionItem[] => {
  const byId = new Map<string, MentionItem>();
  for (const user of users ?? []) {
    if (user?.rowId && user?.username && !byId.has(user.rowId)) {
      byId.set(user.rowId, {
        id: user.rowId,
        label: user.username,
        url: `/profile/${user.rowId}/account`,
      });
    }
  }
  return [...byId.values()];
};

/**
 * Shared `@`-mention typeahead builder hook. Memoizes {@link toMentionItems}
 * over the provided user list.
 */
const useMentionableUsers = (
  users: ReadonlyArray<MentionableUser | null | undefined> | null | undefined,
): MentionItem[] => useMemo(() => toMentionItems(users), [users]);

export default useMentionableUsers;

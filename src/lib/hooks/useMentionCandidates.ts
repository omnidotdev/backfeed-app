import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import useMentionableUsers from "@/lib/hooks/useMentionableUsers";
import { orgMentionUsersOptions } from "@/lib/options/orgMentionUsers";

import type { MentionItem } from "@omnidotdev/thornberry/rich-text-editor";
import type { MentionableUser } from "@/lib/hooks/useMentionableUsers";

/**
 * Build the `@`-mention typeahead candidates for a composer: the organization's
 * full member roster unioned with any context-specific participants (e.g. a
 * thread's commenters or a project's posters, who may not be org members). The
 * roster makes every teammate mentionable like GitHub; participants keep
 * external reporters mentionable too. Deduped by rowId (roster wins).
 *
 * The roster is a cross-service read (Gatekeeper members via
 * `ORG_SYNC_SERVICE_TOKEN`), so it can fail independently of the app. When it
 * does, the typeahead degrades to `participants` rather than going empty, and
 * the failure is logged instead of swallowed so an empty roster is diagnosable
 * (the editor renders no menu at all when there are zero candidates).
 */
const useMentionCandidates = ({
  organizationId,
  enabled = true,
  participants,
}: {
  /** Organization whose roster seeds the candidates. */
  organizationId?: string;
  /** Auth-presence gate: skip the roster read for anonymous callers. */
  enabled?: boolean;
  /** Extra context-specific candidates (thread/project participants). */
  participants?: ReadonlyArray<MentionableUser | null | undefined>;
}): MentionItem[] => {
  const { data: orgUsers, error: rosterError } = useQuery(
    orgMentionUsersOptions({ organizationId, enabled }),
  );

  useEffect(() => {
    if (rosterError) {
      console.error(
        "[mentions] organization roster unavailable; falling back to participants only",
        rosterError,
      );
    }
  }, [rosterError]);

  const combined = useMemo(
    () => [...(orgUsers ?? []), ...(participants ?? [])],
    [orgUsers, participants],
  );

  return useMentionableUsers(combined);
};

export default useMentionCandidates;

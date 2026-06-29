import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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
 */
const useMentionCandidates = ({
  organizationId,
  accessToken,
  participants,
}: {
  /** Organization whose roster seeds the candidates. */
  organizationId?: string;
  /** Access token used to read the IDP roster. */
  accessToken?: string;
  /** Extra context-specific candidates (thread/project participants). */
  participants?: ReadonlyArray<MentionableUser | null | undefined>;
}): MentionItem[] => {
  const { data: orgUsers } = useQuery(
    orgMentionUsersOptions({ organizationId, accessToken }),
  );

  const combined = useMemo(
    () => [...(orgUsers ?? []), ...(participants ?? [])],
    [orgUsers, participants],
  );

  return useMentionableUsers(combined);
};

export default useMentionCandidates;

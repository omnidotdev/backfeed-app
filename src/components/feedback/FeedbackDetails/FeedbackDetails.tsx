"use client";

import { FeedbackCard } from "components/feedback";
import {
  useFeedbackByIdQuery,
  useProjectStatusesQuery,
} from "generated/graphql";
import { useOrganizationMembership } from "lib/hooks";

import type { HstackProps } from "@omnidev/sigil";
import type { Post } from "generated/graphql";
import type { AuthUser } from "lib/util";

interface Props extends HstackProps {
  /** Authenticated user. */
  user: AuthUser;
  /** Feedback ID. Used to fetch feedback details. */
  feedbackId: Post["rowId"];
}

/**
 * Feedback details section.
 */
const FeedbackDetails = ({ user, feedbackId, ...rest }: Props) => {
  const { data: feedback } = useFeedbackByIdQuery(
    {
      rowId: feedbackId,
      userId: user?.rowId,
    },
    {
      select: (data) => data?.post,
    },
  );

  const { isAdmin } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: feedback?.project?.organization?.rowId,
  });

  const { data: projectStatuses } = useProjectStatusesQuery(
    {
      projectId: feedback?.project?.rowId!,
    },
    {
      enabled: isAdmin,
      select: (data) =>
        data?.postStatuses?.nodes.map((status) => ({
          rowId: status?.rowId,
          status: status?.status,
          color: status?.color,
        })),
    },
  );

  return (
    <FeedbackCard
      user={user}
      canManageFeedback={isAdmin}
      feedback={feedback!}
      projectStatuses={projectStatuses}
      boxShadow="card"
      {...rest}
    />
  );
};
export default FeedbackDetails;

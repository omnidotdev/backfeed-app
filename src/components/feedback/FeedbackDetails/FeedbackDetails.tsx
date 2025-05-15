"use client";
import { useQuery } from "@tanstack/react-query";

import { FeedbackCard } from "components/feedback";
import { useProjectStatusesQuery } from "generated/graphql";
import { useOrganizationMembership } from "lib/hooks";
import { feedbackByIdOptions } from "lib/options";

import type { HstackProps } from "@omnidev/sigil";
import type { Post } from "generated/graphql";
import type { Session } from "next-auth";

interface Props extends HstackProps {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Feedback ID. Used to fetch feedback details. */
  feedbackId: Post["rowId"];
}

/**
 * Feedback details section.
 */
const FeedbackDetails = ({ user, feedbackId, ...rest }: Props) => {
  const { data: feedback } = useQuery(
    feedbackByIdOptions({ rowId: feedbackId, userId: user?.rowId }),
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

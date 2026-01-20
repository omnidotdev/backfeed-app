import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Comments from "@/components/feedback/Comments";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import Page from "@/components/layout/Page";
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
} from "@/lib/options/comments";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import { projectStatusesOptions } from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
)({
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { projectSlug, feedbackId },
  }) => {
    await Promise.all([
      queryClient.ensureQueryData({
        ...feedbackByIdOptions({
          rowId: feedbackId,
          userId: session?.user?.rowId,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureInfiniteQueryData({
        ...infiniteCommentsOptions({ feedbackId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...freeTierCommentsOptions({
          organizationId,
          projectSlug,
          feedbackId,
        }),
        revalidateIfStale: true,
      }),
    ]);
  },
  head: () => ({ meta: createMetaTags({ title: "Feedback" }) }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const {
    session,
    hasAdminPrivileges,

    organizationId,
  } = Route.useRouteContext();
  const { feedbackId } = Route.useParams();

  const { data: feedback } = useQuery({
    ...feedbackByIdOptions({ rowId: feedbackId, userId: session?.user?.rowId }),
    select: (data) => data?.post,
  });

  const { data: projectStatuses } = useQuery({
    ...projectStatusesOptions({
      organizationId,
    }),
    enabled: !!hasAdminPrivileges,
    select: (data) =>
      data?.statusTemplates?.nodes.map((status) => ({
        rowId: status?.rowId,
        name: status?.name,
        displayName: status?.displayName,
        color: status?.color,
      })),
  });

  return (
    <Page>
      <FeedbackCard
        canManageFeedback={hasAdminPrivileges}
        feedback={feedback!}
        projectStatuses={projectStatuses}
        disableHover
      />

      <Comments />
    </Page>
  );
}

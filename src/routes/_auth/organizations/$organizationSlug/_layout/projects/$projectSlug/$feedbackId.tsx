import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import Comments from "@/components/feedback/Comments";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import Page from "@/components/layout/Page";
import app from "@/lib/config/app.config";
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
} from "@/lib/options/comments";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import { projectStatusesOptions } from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/$feedbackId",
)({
  loader: async ({
    context: { session, queryClient },
    params: { organizationSlug, projectSlug, feedbackId },
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
          organizationSlug,
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
  const { session, hasAdminPrivileges } = Route.useRouteContext();
  const { organizationSlug, projectSlug, feedbackId } = Route.useParams();

  const { data: feedback } = useQuery({
    ...feedbackByIdOptions({ rowId: feedbackId, userId: session?.user?.rowId }),
    select: (data) => data?.post,
  });

  const { data: projectStatuses } = useQuery({
    ...projectStatusesOptions({ projectId: feedback?.project?.rowId! }),
    enabled: !!hasAdminPrivileges && !!feedback?.project?.rowId,
    select: (data) =>
      data?.postStatuses?.nodes.map((status) => ({
        rowId: status?.rowId,
        status: status?.status,
        color: status?.color,
      })),
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      to: "/organizations",
    },
    {
      label: feedback?.project?.organization?.name!,
      to: "/organizations/$organizationSlug",
      params: { organizationSlug },
    },
    {
      label: app.projectsPage.breadcrumb,
      to: "/organizations/$organizationSlug/projects",
      params: { organizationSlug },
    },
    {
      label: feedback?.project?.name!,
      to: "/organizations/$organizationSlug/projects/$projectSlug",
      params: { organizationSlug, projectSlug },
    },
    {
      label: app.feedbackPage.breadcrumb,
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <FeedbackCard
        canManageFeedback={hasAdminPrivileges}
        feedback={feedback!}
        projectStatuses={projectStatuses}
        boxShadow="card"
      />

      <Comments />
    </Page>
  );
}

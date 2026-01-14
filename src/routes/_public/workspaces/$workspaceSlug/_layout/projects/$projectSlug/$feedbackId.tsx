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
    isAuthenticated,
    workspaceName,
    organizationId,
  } = Route.useRouteContext();
  const { workspaceSlug, projectSlug, feedbackId } = Route.useParams();

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

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/workspaces",
    },
    {
      label: workspaceName,
      to: "/workspaces/$workspaceSlug",
      params: { workspaceSlug },
    },
    {
      label: app.projectsPage.breadcrumb,
      to: "/workspaces/$workspaceSlug/projects",
      params: { workspaceSlug },
    },
    {
      label: feedback?.project?.name!,
      to: "/workspaces/$workspaceSlug/projects/$projectSlug",
      params: { workspaceSlug, projectSlug },
    },
    {
      label: app.feedbackPage.breadcrumb,
    },
  ];

  return (
    <Page breadcrumbs={isAuthenticated ? breadcrumbs : undefined}>
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

import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

import Comments from "@/components/feedback/Comments";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import Page from "@/components/layout/Page";
import {
  freeTierCommentsOptions,
  infiniteCommentsOptions,
} from "@/lib/options/comments";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import { projectOptions, projectStatusesOptions } from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
)({
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { projectSlug, feedbackId },
  }) => {
    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({
        organizationId,
        projectSlug,
      }),
      revalidateIfStale: true,
    });

    if (!projects?.nodes.length) throw notFound();

    const project = projects.nodes[0]!;

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

    return { projectName: project.name };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: loaderData?.projectName }),
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const {
    session,
    hasAdminPrivileges,

    organizationId,
  } = Route.useRouteContext();
  const { workspaceSlug, projectSlug, feedbackId } = Route.useParams();
  const { projectName } = Route.useLoaderData();

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
    <Page
      header={{
        title: projectName,
        backLink: {
          label: `Back to ${projectName}`,
          to: "/workspaces/$workspaceSlug/projects/$projectSlug",
          params: { workspaceSlug, projectSlug },
        },
      }}
    >
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

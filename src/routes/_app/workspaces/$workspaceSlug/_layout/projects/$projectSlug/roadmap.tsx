import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import Page from "@/components/layout/Page";
import RoadmapBoard from "@/components/project/RoadmapBoard";
import { PostOrderBy } from "@/generated/graphql";
import { BASE_URL } from "@/lib/config/env.config";
import { isStatusOnRoadmap } from "@/lib/constants/roadmap.constant";
import { infiniteFeedbackOptions } from "@/lib/options/feedback";
import { projectOptions, projectStatusesOptions } from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";
import { buildFeedbackKey } from "@/lib/util/feedbackUrl";

import type { FeedbackFragment } from "@/generated/graphql";

/** Posts ordered by demand (top-voted first), the public roadmap ranking. */
const ROADMAP_ORDER = [PostOrderBy.VotesCountDesc, PostOrderBy.CreatedAtDesc];

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/roadmap",
)({
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { projectSlug },
  }) => {
    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({ organizationId, projectSlug }),
      revalidateIfStale: true,
    });

    if (!projects?.nodes.length) throw notFound();

    const project = projects.nodes[0]!;

    // gate private boards for unauthenticated visitors (public boards are shareable)
    if (!project.isPublic && !session?.user) throw notFound();

    await Promise.all([
      queryClient.ensureQueryData({
        ...projectStatusesOptions({ organizationId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureInfiniteQueryData({
        ...infiniteFeedbackOptions({
          projectId: project.rowId,
          search: "",
          excludedStatuses: [],
          orderBy: ROADMAP_ORDER,
          userId: session?.user?.rowId,
        }),
        revalidateIfStale: true,
      }),
    ]);

    return { projectName: project.name, projectId: project.rowId };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? createMetaTags({
          title: `${loaderData.projectName} Roadmap`,
          url: `${BASE_URL}/workspaces/${params.workspaceSlug}/projects/${params.projectSlug}/roadmap`,
          image: `${BASE_URL}/api/og/project/${params.workspaceSlug}/${params.projectSlug}`,
        })
      : undefined,
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const { workspaceSlug, projectSlug } = Route.useParams();
  const { projectId, projectName } = Route.useLoaderData();
  const { session, organizationId, workspaceName, workspaceLogo } =
    Route.useRouteContext();
  const navigate = useNavigate();

  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...infiniteFeedbackOptions({
      projectId,
      search: "",
      excludedStatuses: [],
      orderBy: ROADMAP_ORDER,
      userId: session?.user?.rowId,
    }),
    select: (data) => data?.pages?.flatMap((page) => page?.posts?.nodes ?? []),
  });

  // eager-load every page so each status column is complete
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: roadmapStatuses } = useQuery({
    ...projectStatusesOptions({ organizationId }),
    select: (data) =>
      data?.statusTemplates?.nodes
        // curate the roadmap (explicit flag overrides the default heuristic)
        .filter((status) =>
          isStatusOnRoadmap({
            name: status?.name,
            showOnRoadmap: status?.showOnRoadmap,
          }),
        )
        .map((status) => ({
          rowId: status?.rowId,
          displayName: status?.displayName,
          color: status?.color,
        })),
  });

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: workspaceName,
            image: workspaceLogo,
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
          },
          {
            label: projectName,
            to: "/workspaces/$workspaceSlug/projects/$projectSlug",
            params: { workspaceSlug, projectSlug },
          },
          { label: "Roadmap" },
        ],
        title: `${projectName} Roadmap`,
        description: "What we're building, ranked by what users want most.",
      }}
    >
      {roadmapStatuses?.length ? (
        <RoadmapBoard
          posts={(posts ?? []).filter(
            (post): post is FeedbackFragment =>
              !!post && post.rowId !== "pending",
          )}
          statuses={roadmapStatuses}
          canManageFeedback={false}
          onSelectPost={(post) =>
            navigate({
              to: "/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
              params: {
                workspaceSlug,
                projectSlug,
                feedbackId: buildFeedbackKey({
                  number: post.number!,
                  title: post.title,
                }),
              },
            })
          }
        />
      ) : null}
    </Page>
  );
}

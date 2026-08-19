import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import Page from "@/components/layout/Page";
import ProjectLinks from "@/components/project/ProjectLinks";
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
const ROADMAP_ORDER = [
  PostOrderBy.VotesSumWeightDesc,
  PostOrderBy.CreatedAtDesc,
];

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

    // the roadmap is a per-project toggle; a hidden roadmap 404s for everyone
    if (project.showRoadmap === false) throw notFound();

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

  // already prefetched in the loader; read from cache for the project logo/links
  const { data: project } = useQuery({
    ...projectOptions({ organizationId, projectSlug }),
    select: (data) => data.projects?.nodes?.[0],
  });

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
        title: (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {project?.image && (
              <img
                src={project.image}
                alt=""
                className="size-9 shrink-0 rounded-lg border border-border-subtle object-cover md:size-10"
              />
            )}
            <h1 className="font-bold text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
              {projectName} Roadmap
            </h1>
            <ProjectLinks
              organizationId={organizationId}
              projectSlug={projectSlug}
            />
          </div>
        ),
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

import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  notFound,
  stripSearchParams,
} from "@tanstack/react-router";
import {
  HiBolt,
  HiFolder,
  HiOutlineFolder,
  HiUserGroup,
} from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import { z } from "zod";

import Aggregate from "@/components/dashboard/Aggregate";
import Page from "@/components/layout/Page";
import ProjectFeedback from "@/components/project/ProjectFeedback";
import ProjectLinks from "@/components/project/ProjectLinks";
import { PostOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import {
  freeTierFeedbackOptions,
  infiniteFeedbackOptions,
} from "@/lib/options/feedback";
import {
  projectMetricsOptions,
  projectOptions,
  projectStatusesOptions,
  statusBreakdownOptions,
} from "@/lib/options/projects";
import createMetaTags from "@/lib/util/createMetaTags";

import type { ActionButton } from "@/components/core/CallToAction";

const projectSearchSchema = z.object({
  excludedStatuses: z.array(z.string()).default([]),
  search: z.string().default(""),
  orderBy: z
    .enum([PostOrderBy.CreatedAtDesc, PostOrderBy.VotesCountDesc])
    .default(PostOrderBy.VotesCountDesc),
});

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
)({
  validateSearch: projectSearchSchema,
  // NB: filters are intentionally NOT in loaderDeps. Re-running the loader on every
  // filter change would block the URL navigation (and thus the pill/sort highlight)
  // on a network round-trip. Instead the loader prefetches the initial/SSR list from
  // location.search once, and the component's useInfiniteQuery (with keepPreviousData)
  // owns refetching on filter changes, so filter clicks reflect immediately.
  search: {
    middlewares: [
      stripSearchParams({
        search: "",
        excludedStatuses: [],
        orderBy: PostOrderBy.VotesCountDesc,
      }),
    ],
  },
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { projectSlug },
    location,
  }) => {
    const { search, excludedStatuses, orderBy } = projectSearchSchema.parse(
      location.search,
    );

    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({
        organizationId,
        projectSlug,
      }),
      revalidateIfStale: true,
    });

    if (!projects?.nodes.length) throw notFound();

    const project = projects.nodes[0]!;

    // Gate private boards for unauthenticated users
    if (!project.isPublic && !session?.user) {
      throw notFound();
    }

    const projectId = project.rowId;
    const projectName = project.name;

    await Promise.all([
      queryClient.ensureQueryData({
        ...statusBreakdownOptions({ projectId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...projectStatusesOptions({ organizationId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData(projectMetricsOptions({ projectId })),
      queryClient.ensureQueryData({
        ...freeTierFeedbackOptions({
          organizationId,
          projectSlug,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureInfiniteQueryData({
        ...infiniteFeedbackOptions({
          projectId,
          search,
          excludedStatuses,
          orderBy: [orderBy, PostOrderBy.CreatedAtDesc],
          userId: session?.user?.rowId,
        }),
        revalidateIfStale: true,
      }),
    ]);

    return { projectId, projectName };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? createMetaTags({
          title: loaderData.projectName,
          url: `${BASE_URL}/workspaces/${params.workspaceSlug}/projects/${params.projectSlug}`,
          image: `${BASE_URL}/api/og/project/${params.workspaceSlug}/${params.projectSlug}`,
        })
      : undefined,
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { workspaceSlug, projectSlug } = Route.useParams();
  const { projectId } = Route.useLoaderData();
  const { hasAdminPrivileges, isAuthenticated, organizationId, workspaceName } =
    Route.useRouteContext();

  const { data: project } = useQuery({
    ...projectOptions({ organizationId, projectSlug }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const {
    data: projectMetrics,
    isLoading: isMetricsLoading,
    isError: isMetricsError,
  } = useQuery({
    ...projectMetricsOptions({ projectId }),
    select: (data) => ({
      totalPosts: data?.project?.posts.totalCount ?? 0,
      activeUsers: Number(
        data?.project?.posts.aggregates?.distinctCount?.userId ?? 0,
      ),
      totalEngagement:
        (data?.upvotes?.totalCount ?? 0) + (data?.downvotes?.totalCount ?? 0),
    }),
  });

  return (
    <Page
      header={{
        breadcrumbs: [
          {
            label: workspaceName,
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
          },
          { label: project?.name },
        ],
        title: (
          <div className="flex items-center gap-3">
            {project?.image && (
              <img
                src={project.image}
                alt=""
                className="size-9 shrink-0 rounded-lg border border-border-subtle object-cover md:size-10"
              />
            )}
            <h1 className="font-bold text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
              {project?.name}
            </h1>
            <ProjectLinks />
          </div>
        ),
        description: project?.description!,
        cta: isAuthenticated
          ? [
              {
                label: app.projectPage.header.cta.viewAllProjects.label,
                icon: <HiOutlineFolder />,
                variant: "outline",
                linkOptions: {
                  to: "/workspaces/$workspaceSlug/projects",
                  params: { workspaceSlug },
                },
              },
              ...(hasAdminPrivileges
                ? [
                    {
                      label: app.projectPage.header.cta.settings.label,
                      icon: <LuSettings />,
                      variant: "outline",
                      linkOptions: {
                        to: "/workspaces/$workspaceSlug/projects/$projectSlug/settings",
                        params: { workspaceSlug, projectSlug },
                      },
                    } satisfies ActionButton,
                  ]
                : []),
            ]
          : [],
      }}
    >
      <div className="flex flex-col gap-6">
        {/* KPI stat strip: one compact, inline, divided bar so the feed stays above the fold */}
        <div className="grid grid-cols-3 divide-x divide-border-subtle overflow-hidden rounded-xl border border-border-subtle bg-background">
          <Aggregate
            title={app.projectPage.feedbackMetrics.totalPosts}
            value={projectMetrics?.totalPosts ?? 0}
            icon={HiFolder}
            accentColor="amber"
            isLoaded={!isMetricsLoading}
            isError={isMetricsError}
          />

          <Aggregate
            title="Active Users"
            value={projectMetrics?.activeUsers ?? 0}
            icon={HiUserGroup}
            accentColor="sky"
            isLoaded={!isMetricsLoading}
            isError={isMetricsError}
          />

          <Aggregate
            title="Total Engagement"
            value={projectMetrics?.totalEngagement ?? 0}
            icon={HiBolt}
            accentColor="emerald"
            isLoaded={!isMetricsLoading}
            isError={isMetricsError}
          />
        </div>

        {/* Feedback List (full width) */}
        <ProjectFeedback />
      </div>
    </Page>
  );
}

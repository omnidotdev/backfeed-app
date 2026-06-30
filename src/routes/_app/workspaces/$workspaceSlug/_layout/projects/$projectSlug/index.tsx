import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  notFound,
  redirect,
  stripSearchParams,
} from "@tanstack/react-router";
import { HiBolt, HiFolder, HiOutlineFolder } from "react-icons/hi2";
import { LuMap, LuRocket, LuSettings } from "react-icons/lu";
import { z } from "zod";

import Aggregate from "@/components/dashboard/Aggregate";
import Page from "@/components/layout/Page";
import ProjectFeedback from "@/components/project/ProjectFeedback";
import ProjectLinks from "@/components/project/ProjectLinks";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import { isStatusOnBoard } from "@/lib/constants/board.constant";
import { feedOrderBy } from "@/lib/constants/sort.constant";
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
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

import type { ActionButton } from "@/components/core/CallToAction";

const projectSearchSchema = z.object({
  excludedStatuses: z.array(z.string()).default([]),
  // selected tag rowIds to filter the feed by (any-of)
  tags: z.array(z.string()).default([]),
  search: z.string().default(""),
  orderBy: z.enum(["top", "newest"]).default("top"),
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
        tags: [],
        orderBy: "top",
      }),
    ],
  },
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { workspaceSlug, projectSlug },
    location,
  }) => {
    const { search, excludedStatuses, tags, orderBy } =
      projectSearchSchema.parse(location.search);

    // project gates the page; statuses seed the board's default status filter.
    // Both are independent, so fetch them together.
    const [{ projects }, statusData] = await Promise.all([
      queryClient.ensureQueryData({
        ...projectOptions({ organizationId, projectSlug }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...projectStatusesOptions({ organizationId }),
        revalidateIfStale: true,
      }),
    ]);

    if (!projects?.nodes.length) throw notFound();

    const project = projects.nodes[0]!;

    // Gate private boards for unauthenticated users
    if (!project.isPublic && !session?.user) {
      throw notFound();
    }

    const projectId = project.rowId;
    const projectName = project.name;

    // On first entry (no explicit status filter), hide terminal statuses
    // (Completed / Closed) by default so resolved items don't bury open
    // feedback. Seeding the URL keeps every consumer (list query key, pills,
    // optimistic updates) in sync; since filters aren't loader deps, in-session
    // toggles (including "show all") are preserved.
    if (!excludedStatuses.length) {
      const defaultHidden = (statusData?.statusTemplates?.nodes ?? [])
        .filter(
          (status): status is NonNullable<typeof status> =>
            !!status &&
            !isStatusOnBoard({
              name: status.name,
              showOnBoard: status.showOnBoard,
            }),
        )
        .map((status) => status.name)
        .sort();

      if (defaultHidden.length) {
        throw redirect({
          to: "/workspaces/$workspaceSlug/projects/$projectSlug",
          params: { workspaceSlug, projectSlug },
          search: { search, tags, orderBy, excludedStatuses: defaultHidden },
        });
      }
    }

    await Promise.all([
      queryClient.ensureQueryData({
        ...statusBreakdownOptions({ projectId }),
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
          orderBy: feedOrderBy(orderBy),
          userId: session?.user?.rowId,
          tagFilter: tags.length
            ? { some: { tagId: { in: tags } } }
            : undefined,
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
  const {
    hasAdminPrivileges,
    isAuthenticated,
    organizationId,
    workspaceName,
    workspaceLogo,
  } = Route.useRouteContext();

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
            image: workspaceLogo,
            to: "/workspaces/$workspaceSlug",
            params: { workspaceSlug },
          },
          { label: project?.name },
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
              {project?.name}
            </h1>
            <ProjectLinks
              organizationId={organizationId}
              projectSlug={projectSlug}
            />
          </div>
        ),
        description: project?.description!,
        cta: [
          // public, shareable roadmap (visible to everyone, incl. anonymous),
          // unless the project hid it
          ...(project?.showRoadmap !== false
            ? [
                {
                  label: "Roadmap",
                  icon: <LuMap />,
                  variant: "outline",
                  linkOptions: {
                    to: "/workspaces/$workspaceSlug/projects/$projectSlug/roadmap",
                    params: { workspaceSlug, projectSlug },
                  },
                } satisfies ActionButton,
              ]
            : []),
          // public, shareable changelog of shipped feedback, unless hidden
          ...(project?.showChangelog !== false
            ? [
                {
                  label: "Changelog",
                  icon: <LuRocket />,
                  variant: "outline",
                  linkOptions: {
                    to: "/workspaces/$workspaceSlug/projects/$projectSlug/changelog",
                    params: { workspaceSlug, projectSlug },
                  },
                } satisfies ActionButton,
              ]
            : []),
          ...(isAuthenticated
            ? [
                {
                  label: app.projectPage.header.cta.viewAllProjects.label,
                  icon: <HiOutlineFolder />,
                  variant: "outline",
                  linkOptions: {
                    to: "/workspaces/$workspaceSlug/projects",
                    params: { workspaceSlug },
                  },
                } satisfies ActionButton,
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
            : []),
        ],
      }}
    >
      <div className="flex flex-col gap-6">
        {/* KPI stat strip: one compact, inline, divided bar so the feed stays above the fold */}
        <div className="grid grid-cols-2 divide-x divide-border-subtle overflow-hidden rounded-xl border border-border-subtle bg-background">
          <Aggregate
            title={setSingularOrPlural({
              value: projectMetrics?.totalPosts ?? 0,
              label: "Post",
            })}
            value={projectMetrics?.totalPosts ?? 0}
            icon={HiFolder}
            accentColor="amber"
            isLoaded={!isMetricsLoading}
            isError={isMetricsError}
          />

          <Aggregate
            title={setSingularOrPlural({
              value: projectMetrics?.totalEngagement ?? 0,
              label: "Vote",
            })}
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

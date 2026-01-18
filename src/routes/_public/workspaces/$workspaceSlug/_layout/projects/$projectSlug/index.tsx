import { Grid, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  notFound,
  stripSearchParams,
} from "@tanstack/react-router";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import { TbHeartbeat } from "react-icons/tb";
import { z } from "zod";

import Aggregate from "@/components/dashboard/Aggregate";
import Page from "@/components/layout/Page";
import ProjectFeedback from "@/components/project/ProjectFeedback";
import ProjectLinks from "@/components/project/ProjectLinks";
import { PostOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
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

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";
import type { ActionButton } from "@/components/core/CallToAction";

const projectSearchSchema = z.object({
  excludedStatuses: z.array(z.string()).default([]),
  search: z.string().default(""),
  orderBy: z
    .enum([PostOrderBy.CreatedAtDesc, PostOrderBy.VotesCountDesc])
    .default(PostOrderBy.CreatedAtDesc),
});

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
)({
  validateSearch: projectSearchSchema,
  loaderDeps: ({ search }) => search,
  search: {
    middlewares: [
      stripSearchParams({
        search: "",
        excludedStatuses: [],
        orderBy: PostOrderBy.CreatedAtDesc,
      }),
    ],
  },
  loader: async ({
    context: { session, queryClient, organizationId },
    params: { projectSlug },
    deps: { search, excludedStatuses, orderBy },
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
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: loaderData?.projectName }),
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
      totalFeedback: data?.project?.posts.totalCount ?? 0,
      activeUsers: Number(
        data?.project?.posts.aggregates?.distinctCount?.userId ?? 0,
      ),
      totalEngagement:
        (data?.upvotes?.totalCount ?? 0) + (data?.downvotes?.totalCount ?? 0),
    }),
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/dashboard",
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
      label: project?.name!,
    },
  ];

  return (
    <Page
      breadcrumbs={isAuthenticated ? breadcrumbs : undefined}
      header={{
        title: (
          <HStack gap={3} alignItems="center">
            <Text
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              lineHeight={1.2}
              letterSpacing="-0.02em"
            >
              {project?.name}
            </Text>
            <ProjectLinks />
          </HStack>
        ),
        description: project?.description!,
        cta: isAuthenticated
          ? [
              {
                label: app.projectPage.header.cta.viewAllProjects.label,
                icon: <Icon src={HiOutlineFolder} />,
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
                      icon: <Icon src={LuSettings} />,
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
      <Stack gap={6}>
        {/* KPI Metrics Row */}
        <Grid gap={4} columns={{ base: 1, sm: 3 }}>
          <Aggregate
            title="Total Feedback"
            value={projectMetrics?.totalFeedback ?? 0}
            icon={HiOutlineFolder}
            accentColor="amber"
            isLoaded={!isMetricsLoading}
            isError={isMetricsError}
          />

          <Aggregate
            title="Active Users"
            value={projectMetrics?.activeUsers ?? 0}
            icon={HiOutlineUserGroup}
            accentColor="sky"
            isLoaded={!isMetricsLoading}
            isError={isMetricsError}
          />

          <Aggregate
            title="Total Engagement"
            value={projectMetrics?.totalEngagement ?? 0}
            icon={TbHeartbeat}
            accentColor="emerald"
            isLoaded={!isMetricsLoading}
            isError={isMetricsError}
          />
        </Grid>

        {/* Feedback List (full width) */}
        <ProjectFeedback />
      </Stack>
    </Page>
  );
}

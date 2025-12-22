import { Grid, GridItem, Icon, Stack } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  notFound,
  stripSearchParams,
} from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import { z } from "zod";

import Page from "@/components/layout/Page";
import FeedbackMetrics from "@/components/project/FeedbackMetrics";
import ProjectFeedback from "@/components/project/ProjectFeedback";
import ProjectInformation from "@/components/project/ProjectInformation";
import ProjectLinks from "@/components/project/ProjectLinks";
import StatusBreakdown from "@/components/project/StatusBreakdown";
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
import seo from "@/lib/util/seo";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";
import type { ActionButton } from "@/components/core/CallToAction";

const projectSearchSchema = z.object({
  excludedStatuses: z.array(z.string()).default([]),
  search: z.string().default(""),
  orderBy: z
    .enum([
      PostOrderBy.CreatedAtDesc,
      PostOrderBy.UpvotesCountDesc,
      PostOrderBy.DownvotesCountDesc,
    ])
    .default(PostOrderBy.CreatedAtDesc),
});

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/",
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
    context: { session, queryClient },
    params: { organizationSlug, projectSlug },
    deps: { search, excludedStatuses, orderBy },
  }) => {
    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({ organizationSlug, projectSlug }),
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
        ...projectStatusesOptions({ projectId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData(projectMetricsOptions({ projectId })),
      queryClient.ensureQueryData({
        ...freeTierFeedbackOptions({ organizationSlug, projectSlug }),
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
  head: ({ loaderData }) => ({ meta: seo({ title: loaderData?.projectName }) }),
  component: ProjectPage,
});

function ProjectPage() {
  const { organizationSlug, projectSlug } = Route.useParams();
  const { hasAdminPrivileges } = Route.useRouteContext();

  const { data: project } = useQuery({
    ...projectOptions({ organizationSlug, projectSlug }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      to: "/organizations",
    },
    {
      label: project?.organization?.name!,
      to: "/organizations/$organizationSlug",
      params: { organizationSlug },
    },
    {
      label: app.projectsPage.breadcrumb,
      to: "/organizations/$organizationSlug/projects",
      params: { organizationSlug },
    },
    {
      label: project?.name!,
    },
  ];

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: project?.name!,
        description: project?.description!,
        headerProps: {
          children: <ProjectLinks />,
        },
        cta: [
          {
            label: app.projectPage.header.cta.viewAllProjects.label,
            // `className` used to apply default recipe styles as `Icon` is not compatible in RSCs
            icon: <Icon src={HiOutlineFolder} />,
            variant: "outline",
            linkOptions: {
              to: "/organizations/$organizationSlug/projects",
              params: { organizationSlug },
            },
          },
          ...(hasAdminPrivileges
            ? [
                {
                  label: app.projectPage.header.cta.settings.label,
                  icon: <Icon src={LuSettings} />,
                  linkOptions: {
                    to: "/organizations/$organizationSlug/projects/$projectSlug/settings",
                    params: { organizationSlug, projectSlug },
                  },
                  // NB: required because of the spread. The type inference of `to` is not narrowed to the required union otherwise
                } satisfies ActionButton,
              ]
            : []),
        ],
      }}
    >
      <Grid columns={{ lg: 8 }} gap={6}>
        <GridItem colSpan={{ lg: 6 }}>
          <ProjectFeedback />
        </GridItem>

        <GridItem colSpan={{ lg: 2 }}>
          <Stack gap={6}>
            <ProjectInformation />

            <FeedbackMetrics />

            <StatusBreakdown />
          </Stack>
        </GridItem>
      </Grid>
    </Page>
  );
}

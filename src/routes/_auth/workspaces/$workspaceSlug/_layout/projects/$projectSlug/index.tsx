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
  "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
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
    params: { workspaceSlug, projectSlug },
    deps: { search, excludedStatuses, orderBy },
  }) => {
    const { projects } = await queryClient.ensureQueryData({
      ...projectOptions({ workspaceSlug, projectSlug }),
      revalidateIfStale: true,
    });

    if (!projects?.nodes.length) throw notFound();

    const project = projects.nodes[0]!;
    const projectId = project.rowId;
    const projectName = project.name;
    const workspaceId = project.workspace?.rowId!;

    await Promise.all([
      queryClient.ensureQueryData({
        ...statusBreakdownOptions({ projectId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...projectStatusesOptions({ workspaceId }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData(projectMetricsOptions({ projectId })),
      queryClient.ensureQueryData({
        ...freeTierFeedbackOptions({ workspaceSlug, projectSlug }),
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

    return { projectId, projectName, workspaceId };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: loaderData?.projectName }),
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { workspaceSlug, projectSlug } = Route.useParams();
  const { hasAdminPrivileges } = Route.useRouteContext();

  const { data: project } = useQuery({
    ...projectOptions({ workspaceSlug, projectSlug }),
    select: (data) => data?.projects?.nodes?.[0],
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/workspaces",
    },
    {
      label: project?.workspace?.name!,
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
              to: "/workspaces/$workspaceSlug/projects",
              params: { workspaceSlug },
            },
          },
          ...(hasAdminPrivileges
            ? [
                {
                  label: app.projectPage.header.cta.settings.label,
                  icon: <Icon src={LuSettings} />,
                  linkOptions: {
                    to: "/workspaces/$workspaceSlug/projects/$projectSlug/settings",
                    params: { workspaceSlug, projectSlug },
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

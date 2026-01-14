import { Icon } from "@omnidev/sigil";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";
import { z } from "zod";

import Page from "@/components/layout/Page";
import CreateProject from "@/components/project/CreateProject";
import ProjectFilters from "@/components/project/ProjectFilters";
import ProjectList from "@/components/project/ProjectList";
import app from "@/lib/config/app.config";
import MAX_NUMBER_OF_PROJECTS from "@/lib/constants/numberOfProjects.constant";
import { projectsOptions } from "@/lib/options/projects";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";
import { getSubscription } from "@/server/functions/subscriptions";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

const subscriptionOptions = (organizationId: string) =>
  queryOptions({
    queryKey: ["subscription", organizationId],
    queryFn: () => getSubscription({ data: { organizationId } }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

const projectSearchSchema = z.object({
  page: z.number().nonnegative().default(1),
  pageSize: z.number().nonnegative().default(10),
  search: z.string().default(""),
});

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/projects/",
)({
  validateSearch: projectSearchSchema,
  search: {
    middlewares: [stripSearchParams({ page: 1, pageSize: 10, search: "" })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    context: { queryClient, workspaceName, organizationId },
    deps: { page, pageSize, search },
  }) => {
    await queryClient.ensureQueryData({
      ...projectsOptions({
        pageSize,
        offset: (page - 1) * pageSize,
        search,
        organizationId,
      }),
      revalidateIfStale: true,
    });

    return { workspaceName };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: `${loaderData?.workspaceName} Projects` }),
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { workspaceSlug } = Route.useParams();
  const { hasAdminPrivileges, isAuthenticated, organizationId, workspaceName } =
    Route.useRouteContext();

  const { data: workspaceMetrics } = useQuery({
    ...workspaceMetricsOptions({ organizationId }),
  });

  // Query subscription status from billing service
  const { data: subscription } = useQuery({
    ...subscriptionOptions(organizationId),
    enabled: isAuthenticated,
  });

  // Tier is determined by subscription status
  const hasPaidSubscription = !!subscription?.id;
  const projectCount = workspaceMetrics?.projects?.totalCount ?? 0;

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
    },
  ];

  // To create projects, user must have administrative privileges
  // Free tier: only 1 project, Paid tier: limited by MAX_NUMBER_OF_PROJECTS
  const canCreateProjects =
    hasAdminPrivileges &&
    (hasPaidSubscription
      ? projectCount < MAX_NUMBER_OF_PROJECTS
      : projectCount === 0);

  return (
    <Page
      breadcrumbs={isAuthenticated ? breadcrumbs : undefined}
      header={{
        title: app.projectsPage.header.title,
        cta:
          isAuthenticated && hasAdminPrivileges
            ? [
                {
                  label: app.projectsPage.header.cta.newProject.label,
                  icon: <Icon src={LuCirclePlus} />,
                  disabled: !canCreateProjects,
                  dialogType: DialogType.CreateProject,
                  tooltip: app.projectsPage.header.cta.newProject.tooltip,
                },
              ]
            : undefined,
      }}
    >
      <ProjectFilters />

      <ProjectList canCreateProjects={canCreateProjects} />

      {/* dialogs */}
      {canCreateProjects && <CreateProject workspaceSlug={workspaceSlug} />}
    </Page>
  );
}

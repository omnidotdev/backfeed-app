import { Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
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
import { workspaceOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

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
        workspaceOrganizationId: organizationId,
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
  const {
    hasAdminPrivileges,
    subscriptionId,
    isAuthenticated,
    organizationId,
    workspaceName,
  } = Route.useRouteContext();

  const { data: workspace } = useQuery({
    ...workspaceOptions({ organizationId }),
    select: (data) => data.workspaces?.nodes?.[0],
  });

  // Tier is determined by subscription status
  const hasPaidSubscription = !!subscriptionId;

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
      ? (workspace?.projects.totalCount ?? 0) < MAX_NUMBER_OF_PROJECTS
      : !workspace?.projects.totalCount);

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

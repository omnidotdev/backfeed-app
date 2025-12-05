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
import { organizationOptions } from "@/lib/options/organizations";
import { projectsOptions } from "@/lib/options/projects";
import { DialogType } from "@/lib/store/useDialogStore";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

const projectSearchSchema = z.object({
  page: z.number().nonnegative().default(1),
  pageSize: z.number().nonnegative().default(10),
  search: z.string().default(""),
});

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/projects/",
)({
  validateSearch: projectSearchSchema,
  search: {
    middlewares: [stripSearchParams({ page: 1, pageSize: 10, search: "" })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    context: { queryClient },
    deps: { page, pageSize, search },
    params: { organizationSlug },
  }) => {
    await queryClient.ensureQueryData(
      projectsOptions({
        pageSize,
        offset: (page - 1) * pageSize,
        search,
        organizationSlug,
      }),
    );
  },
  component: ProjectsPage,
});

function ProjectsPage() {
  const { organizationSlug } = Route.useParams();
  const { hasAdminPrivileges, hasBasicTierPrivileges, hasTeamTierPrivileges } =
    Route.useRouteContext();

  const { data: organization } = useQuery({
    ...organizationOptions({ slug: organizationSlug }),
    select: (data) => data.organizationBySlug,
  });

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      to: "/organizations",
    },
    {
      label: organization?.name!,
      to: "/organizations/$organizationSlug",
      params: { organizationSlug },
    },
    {
      label: app.projectsPage.breadcrumb,
    },
  ];

  // NB: To create projects, user must have administrative privileges. If so, we validate that the owner of the organization is subscribed and validate tier based checks
  // We do not want to derive this from loader data as the permissions are dynamic upon project creation(s). We want to use invalidation patterns for the organization query
  const canCreateProjects =
    hasAdminPrivileges &&
    (hasBasicTierPrivileges
      ? hasTeamTierPrivileges ||
        (organization?.projects.totalCount ?? 0) < MAX_NUMBER_OF_PROJECTS
      : !organization?.projects.totalCount);

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: app.projectsPage.header.title,
        cta: hasAdminPrivileges
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
      {canCreateProjects && (
        <CreateProject organizationSlug={organizationSlug} />
      )}
    </Page>
  );
}

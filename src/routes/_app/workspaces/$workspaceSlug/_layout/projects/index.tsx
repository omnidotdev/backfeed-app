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
import { checkLimitOptions } from "@/lib/options/entitlements";
import { projectsOptions } from "@/lib/options/projects";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";
import { FeatureKey } from "@/server/functions/entitlements";

const projectSearchSchema = z.object({
  page: z.number().nonnegative().default(1),
  pageSize: z.number().nonnegative().default(10),
  search: z.string().default(""),
});

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/projects/",
)({
  validateSearch: projectSearchSchema,
  search: {
    middlewares: [stripSearchParams({ page: 1, pageSize: 10, search: "" })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    context: { queryClient, organizationId, workspaceName },
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
  const { hasAdminPrivileges, isAuthenticated, organizationId } =
    Route.useRouteContext();

  const { data: workspaceMetrics } = useQuery({
    ...workspaceMetricsOptions({ organizationId }),
  });

  const projectCount = workspaceMetrics?.projects?.totalCount ?? 0;

  const { data: projectLimit } = useQuery({
    ...checkLimitOptions({
      organizationId,
      featureKey: FeatureKey.MaxProjects,
      currentCount: projectCount,
    }),
    enabled: isAuthenticated,
  });

  // Entitlement-based project creation check (falls back to hardcoded limits)
  const canCreateProjects =
    hasAdminPrivileges && (projectLimit?.allowed ?? false);

  return (
    <Page
      header={{
        title: app.projectsPage.header.title,
        backLink: {
          label: "Workspace",
          to: "/workspaces/$workspaceSlug",
          params: { workspaceSlug },
        },
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

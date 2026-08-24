import { Badge } from "@omnidotdev/thornberry/badge";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";
import { z } from "zod";

import Page from "@/components/layout/Page";
import CreateProject from "@/components/project/CreateProject";
import ProjectFilters from "@/components/project/ProjectFilters";
import ProjectList from "@/components/project/ProjectList";
import WorkspaceManagement from "@/components/workspace/WorkspaceManagement";
import WorkspaceMetrics from "@/components/workspace/WorkspaceMetrics";
import app from "@/lib/config/app.config";
import { checkLimitOptions } from "@/lib/options/entitlements";
import { projectsOptions } from "@/lib/options/projects";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import createMetaTags from "@/lib/util/createMetaTags";
import { FeatureKey } from "@/server/functions/entitlements";
import { getSubscription } from "@/server/functions/subscriptions";

const subscriptionOptions = (organizationId: string) =>
  queryOptions({
    queryKey: ["subscription", organizationId],
    queryFn: () => getSubscription({ data: { organizationId } }),
    staleTime: 5 * 60 * 1000,
  });

// The handle home is the primary project-browse surface (golden/URL-GRAMMAR.md:
// resources are flat under the handle), so it carries the project search and
// pagination the dedicated list page used to own.
const projectSearchSchema = z.object({
  page: z.number().nonnegative().default(1),
  pageSize: z.number().nonnegative().default(10),
  search: z.string().default(""),
});

export const Route = createFileRoute("/_app/@$workspaceSlug/_layout/")({
  validateSearch: projectSearchSchema,
  search: {
    middlewares: [stripSearchParams({ page: 1, pageSize: 10, search: "" })],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({
    context: { queryClient, organizationId, workspaceName },
    deps: { page, pageSize, search },
  }) => {
    await Promise.all([
      queryClient.ensureQueryData({
        ...workspaceMetricsOptions({
          organizationId,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...projectsOptions({
          pageSize,
          offset: (page - 1) * pageSize,
          search,
          organizationId,
        }),
        revalidateIfStale: true,
      }),
    ]);

    return { workspaceName };
  },
  head: ({ loaderData }) => ({
    meta: createMetaTags({ title: loaderData?.workspaceName }),
  }),
  component: WorkspacePage,
});

function WorkspacePage() {
  const { workspaceSlug } = Route.useParams();
  const {
    hasAdminPrivileges,
    isAuthenticated,
    organizationId,
    workspaceName,
    workspaceLogo,
  } = Route.useRouteContext();

  const { data: metrics } = useQuery({
    ...workspaceMetricsOptions({ organizationId }),
  });

  const projectCount = metrics?.projects?.totalCount ?? 0;

  const { data: subscription } = useQuery({
    ...subscriptionOptions(organizationId),
    enabled: isAuthenticated,
  });

  const hasPaidSubscription = !!subscription?.id;

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
        title: (
          <div className="flex items-center gap-4">
            {workspaceLogo && (
              <img
                src={workspaceLogo}
                alt=""
                className="size-10 shrink-0 rounded-lg border border-border-subtle object-cover"
              />
            )}
            <h1 className="font-semibold text-3xl leading-[1.3]">
              {workspaceName}
            </h1>
            <Badge className="rounded-lg">
              {capitalizeFirstLetter(hasPaidSubscription ? "paid" : "free")}
            </Badge>
          </div>
        ),
        backLink: {
          label: "Dashboard",
          to: "/",
        },
        cta:
          isAuthenticated && hasAdminPrivileges
            ? [
                {
                  label: app.workspacePage.header.cta.newProject.label,
                  icon: <LuCirclePlus />,
                  disabled: !canCreateProjects,
                  dialogType: DialogType.CreateProject,
                  tooltip: app.workspacePage.header.cta.newProject.tooltip,
                },
              ]
            : [],
      }}
    >
      <ProjectFilters />

      <ProjectList canCreateProjects={canCreateProjects} />

      {isAuthenticated && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <WorkspaceMetrics />

          <WorkspaceManagement />
        </div>
      )}

      {/* dialogs */}
      {canCreateProjects && <CreateProject workspaceSlug={workspaceSlug} />}
    </Page>
  );
}

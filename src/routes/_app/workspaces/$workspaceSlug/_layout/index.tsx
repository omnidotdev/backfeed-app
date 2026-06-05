import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import Page from "@/components/layout/Page";
import CreateProject from "@/components/project/CreateProject";
import { Badge } from "@/components/ui/badge";
import WorkspaceManagement from "@/components/workspace/WorkspaceManagement";
import WorkspaceMetrics from "@/components/workspace/WorkspaceMetrics";
import WorkspaceProjects from "@/components/workspace/WorkspaceProjects";
import app from "@/lib/config/app.config";
import { checkLimitOptions } from "@/lib/options/entitlements";
import {
  workspaceMetricsOptions,
  workspaceOptions,
} from "@/lib/options/workspaces";
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

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/",
)({
  loader: async ({
    context: { queryClient, organizationId, workspaceName },
  }) => {
    await Promise.all([
      queryClient.ensureQueryData({
        ...workspaceMetricsOptions({
          organizationId,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData(workspaceOptions({ organizationId })),
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
  const { hasAdminPrivileges, isAuthenticated, organizationId, workspaceName } =
    Route.useRouteContext();

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
        cta: isAuthenticated
          ? [
              {
                label: app.workspacePage.header.cta.viewProjects.label,
                variant: "outline",
                icon: <HiOutlineFolder />,
                linkOptions: {
                  to: "/workspaces/$workspaceSlug/projects",
                  params: { workspaceSlug },
                },
                disabled: !projectCount,
                tooltip: app.workspacePage.header.cta.viewProjects.tooltip,
              },
              ...(hasAdminPrivileges
                ? [
                    {
                      label: app.workspacePage.header.cta.newProject.label,
                      icon: <LuCirclePlus />,
                      disabled: !canCreateProjects,
                      dialogType: DialogType.CreateProject,
                      tooltip: app.workspacePage.header.cta.newProject.tooltip,
                    },
                  ]
                : []),
            ]
          : [],
      }}
    >
      <WorkspaceProjects canCreateProjects={canCreateProjects} />

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

import { Badge, HStack, Icon, Text } from "@omnidev/sigil";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import Page from "@/components/layout/Page";
import CreateProject from "@/components/project/CreateProject";
import WorkspaceManagement from "@/components/workspace/WorkspaceManagement";
import WorkspaceMetrics from "@/components/workspace/WorkspaceMetrics";
import WorkspaceProjects from "@/components/workspace/WorkspaceProjects";
import { Grid } from "@/generated/panda/jsx";
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
          <HStack gap={4}>
            <Text as="h1" fontSize="3xl" fontWeight="semibold" lineHeight={1.3}>
              {workspaceName}
            </Text>
            <Badge rounded="lg">
              {capitalizeFirstLetter(hasPaidSubscription ? "paid" : "free")}
            </Badge>
          </HStack>
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
                icon: <Icon src={HiOutlineFolder} />,
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
                      icon: <Icon src={LuCirclePlus} />,
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
        <Grid columns={{ base: 1, md: 2 }} gap={6}>
          <WorkspaceMetrics />

          <WorkspaceManagement />
        </Grid>
      )}

      {/* dialogs */}
      {canCreateProjects && <CreateProject workspaceSlug={workspaceSlug} />}
    </Page>
  );
}

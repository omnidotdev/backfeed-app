import { Badge, HStack, Icon, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
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
import MAX_NUMBER_OF_PROJECTS from "@/lib/constants/numberOfProjects.constant";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import createMetaTags from "@/lib/util/createMetaTags";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

export const Route = createFileRoute(
  "/_public/workspaces/$workspaceSlug/_layout/",
)({
  loader: async ({
    context: { queryClient, organizationId, workspaceName },
  }) => {
    await queryClient.ensureQueryData({
      ...workspaceMetricsOptions({
        organizationId,
      }),
      revalidateIfStale: true,
    });

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

  // TODO: Get subscription status from Aether billing API instead of local DB
  // For now, assume free tier until billing integration is updated
  const hasPaidSubscription = false;

  // To create projects, user must have administrative privileges
  // Free tier: only 1 project, Paid tier: limited by MAX_NUMBER_OF_PROJECTS
  const canCreateProjects =
    hasAdminPrivileges &&
    (hasPaidSubscription
      ? projectCount < MAX_NUMBER_OF_PROJECTS
      : projectCount === 0);

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/workspaces",
    },
    {
      label: workspaceName,
    },
  ];

  return (
    <Page
      breadcrumbs={isAuthenticated ? breadcrumbs : undefined}
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

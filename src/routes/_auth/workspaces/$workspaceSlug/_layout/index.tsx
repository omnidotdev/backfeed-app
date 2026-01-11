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
import {
  workspaceMetricsOptions,
  workspaceOptions,
} from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import createMetaTags from "@/lib/util/createMetaTags";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

export const Route = createFileRoute(
  "/_auth/workspaces/$workspaceSlug/_layout/",
)({
  loader: async ({ context: { queryClient, workspaceId, workspaceName } }) => {
    await queryClient.ensureQueryData({
      ...workspaceMetricsOptions({
        workspaceId,
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
  const { hasAdminPrivileges, hasBasicTierPrivileges, hasTeamTierPrivileges } =
    Route.useRouteContext();

  const { data: workspace } = useQuery({
    ...workspaceOptions({ name: workspaceSlug }),
    select: (data) => data.workspaceByName,
  });

  // NB: To create projects, user must have administrative privileges. If so, we validate that the owner of the workspace is subscribed and validate tier based checks
  // We do not want to derive this from loader data as the permissions are dynamic upon project creation(s). We want to use invalidation patterns for the workspace query
  const canCreateProjects =
    hasAdminPrivileges &&
    (hasBasicTierPrivileges
      ? hasTeamTierPrivileges ||
        (workspace?.projects.totalCount ?? 0) < MAX_NUMBER_OF_PROJECTS
      : !workspace?.projects.totalCount);

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.workspacesPage.breadcrumb,
      to: "/workspaces",
    },
    {
      label: workspace?.name!,
    },
  ];

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: (
          <HStack gap={4}>
            <Text as="h1" fontSize="3xl" fontWeight="semibold" lineHeight={1.3}>
              {workspace?.name}
            </Text>
            <Badge rounded="lg">{capitalizeFirstLetter(workspace?.tier)}</Badge>
          </HStack>
        ),
        cta: [
          {
            label: app.workspacePage.header.cta.viewProjects.label,
            variant: "outline",
            icon: <Icon src={HiOutlineFolder} />,
            linkOptions: {
              to: "/workspaces/$workspaceSlug/projects",
              params: { workspaceSlug },
            },
            disabled: !workspace?.projects.totalCount,
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
        ],
      }}
    >
      <WorkspaceProjects canCreateProjects={canCreateProjects} />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        <WorkspaceMetrics />

        <WorkspaceManagement />
      </Grid>

      {/* dialogs */}
      {canCreateProjects && <CreateProject workspaceSlug={workspaceSlug} />}
    </Page>
  );
}

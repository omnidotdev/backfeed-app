import { Badge, HStack, Icon, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import Page from "@/components/layout/Page";
import OrganizationManagement from "@/components/organization/OrganizationManagement";
import OrganizationMetrics from "@/components/organization/OrganizationMetrics";
import OrganizationProjects from "@/components/organization/OrganizationProjects";
import CreateProject from "@/components/project/CreateProject";
import { Grid } from "@/generated/panda/jsx";
import app from "@/lib/config/app.config";
import MAX_NUMBER_OF_PROJECTS from "@/lib/constants/numberOfProjects.constant";
import {
  organizationMetricsOptions,
  organizationOptions,
} from "@/lib/options/organizations";
import { DialogType } from "@/lib/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import seo from "@/lib/util/seo";

import type { BreadcrumbRecord } from "@/components/core/Breadcrumb";

export const Route = createFileRoute(
  "/_auth/organizations/$organizationSlug/_layout/",
)({
  loader: async ({
    context: { queryClient, organizationId, organizationName },
  }) => {
    await queryClient.ensureQueryData(
      organizationMetricsOptions({
        organizationId,
      }),
    );

    return { organizationName };
  },
  head: ({ loaderData }) => ({
    meta: seo({ title: loaderData?.organizationName }),
  }),
  component: OrganizationPage,
});

function OrganizationPage() {
  const { organizationSlug } = Route.useParams();
  const { hasAdminPrivileges, hasBasicTierPrivileges, hasTeamTierPrivileges } =
    Route.useRouteContext();

  const { data: organization } = useQuery({
    ...organizationOptions({ slug: organizationSlug }),
    select: (data) => data.organizationBySlug,
  });

  // NB: To create projects, user must have administrative privileges. If so, we validate that the owner of the organization is subscribed and validate tier based checks
  // We do not want to derive this from loader data as the permissions are dynamic upon project creation(s). We want to use invalidation patterns for the organization query
  const canCreateProjects =
    hasAdminPrivileges &&
    (hasBasicTierPrivileges
      ? hasTeamTierPrivileges ||
        (organization?.projects.totalCount ?? 0) < MAX_NUMBER_OF_PROJECTS
      : !organization?.projects.totalCount);

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      to: "/organizations",
    },
    {
      label: organization?.name!,
    },
  ];

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: (
          <HStack gap={4}>
            <Text as="h1" fontSize="3xl" fontWeight="semibold" lineHeight={1.3}>
              {organization?.name}
            </Text>
            <Badge rounded="lg">
              {capitalizeFirstLetter(organization?.tier)}
            </Badge>
          </HStack>
        ),
        cta: [
          {
            label: app.organizationPage.header.cta.viewProjects.label,
            variant: "outline",
            icon: <Icon src={HiOutlineFolder} />,
            linkOptions: {
              to: "/organizations/$organizationSlug/projects",
              params: { organizationSlug },
            },
            disabled: !organization?.projects.totalCount,
            tooltip: app.organizationPage.header.cta.viewProjects.tooltip,
          },
          ...(hasAdminPrivileges
            ? [
                {
                  label: app.organizationPage.header.cta.newProject.label,
                  icon: <Icon src={LuCirclePlus} />,
                  disabled: !canCreateProjects,
                  dialogType: DialogType.CreateProject,
                  tooltip: app.organizationPage.header.cta.newProject.tooltip,
                },
              ]
            : []),
        ],
      }}
    >
      <OrganizationProjects canCreateProjects={canCreateProjects} />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        <OrganizationMetrics />

        <OrganizationManagement />
      </Grid>

      {/* dialogs */}
      {canCreateProjects && (
        <CreateProject organizationSlug={organizationSlug} />
      )}
    </Page>
  );
}

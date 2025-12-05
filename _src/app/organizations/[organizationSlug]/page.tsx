import { Badge, HStack, Text } from "@omnidev/sigil";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import {
  OrganizationManagement,
  OrganizationMetrics,
  OrganizationProjects,
} from "components/organization";
import { CreateProject } from "components/project";
import {
  Role,
  Tier,
  useOrganizationMetricsQuery,
  useOrganizationQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { Grid } from "generated/panda/jsx";
import { icon } from "generated/panda/recipes";
import { getOrganization } from "lib/actions";
import { app } from "lib/config";
import { MAX_NUMBER_OF_PROJECTS } from "lib/constants";
import { getSdk } from "lib/graphql";
import { capitalizeFirstLetter, getQueryClient } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]">): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name}`,
  };
};

/**
 * Organization overview page.
 */
const OrganizationPage = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]">) => {
  const { organizationSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const [organization] = await Promise.all([
    getOrganization({ organizationSlug }),
  ]);

  if (!organization) notFound();

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId: member } =
    await sdk.OrganizationRole({
      userId: session.user.rowId!,
      organizationId: organization.rowId,
    });

  const hasAdminPrivileges =
    member?.role === Role.Admin || member?.role === Role.Owner;

  const hasBasicTierPrivileges = organization.tier !== Tier.Free;
  const hasTeamTierPrivileges =
    hasBasicTierPrivileges && organization.tier !== Tier.Basic;

  // NB: To create projects, user must have administrative privileges. If so, we validate that the owner of the organization is subscribed and validate tier based checks
  const canCreateProjects =
    hasAdminPrivileges &&
    (hasBasicTierPrivileges
      ? hasTeamTierPrivileges ||
        organization.projects.totalCount < MAX_NUMBER_OF_PROJECTS
      : !organization.projects.totalCount);

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization.name ?? organizationSlug,
    },
  ];

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useOrganizationQuery.getKey({ slug: organizationSlug }),
      queryFn: useOrganizationQuery.fetcher({ slug: organizationSlug }),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationMetricsQuery.getKey({
        organizationId: organization.rowId,
      }),
      queryFn: useOrganizationMetricsQuery.fetcher({
        organizationId: organization.rowId,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationRoleQuery.getKey({
        organizationId: organization.rowId,
        userId: session.user.rowId!,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        organizationId: organization.rowId,
        userId: session.user.rowId!,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: (
            <HStack gap={4}>
              <Text
                as="h1"
                fontSize="3xl"
                fontWeight="semibold"
                lineHeight={1.3}
              >
                {organization.name!}
              </Text>
              <Badge rounded="lg">
                {capitalizeFirstLetter(organization.tier)}
              </Badge>
            </HStack>
          ),
          cta: [
            {
              label: app.organizationPage.header.cta.viewProjects.label,
              variant: "outline",
              // `className` used to apply default recipe styles as `Icon` is not compatible in RSCs
              icon: <HiOutlineFolder className={icon()} />,
              href: `/organizations/${organizationSlug}/projects`,
              disabled: !organization.projects.totalCount,
              tooltip: app.organizationPage.header.cta.viewProjects.tooltip,
            },
            ...(hasAdminPrivileges
              ? [
                  {
                    label: app.organizationPage.header.cta.newProject.label,
                    // `className` used to apply default recipe styles as `Icon` is not compatible in RSCs
                    icon: <LuCirclePlus className={icon()} />,
                    disabled: !canCreateProjects,
                    dialogType: DialogType.CreateProject,
                    tooltip: app.organizationPage.header.cta.newProject.tooltip,
                  },
                ]
              : []),
          ],
        }}
      >
        <OrganizationProjects
          hasAdminPrivileges={hasAdminPrivileges}
          canCreateProjects={canCreateProjects}
          organizationSlug={organizationSlug}
        />

        <Grid columns={{ base: 1, md: 2 }} gap={6}>
          <OrganizationMetrics organizationId={organization.rowId} />

          <OrganizationManagement
            user={session.user}
            organizationId={organization.rowId}
            hasAdminPrivileges={hasAdminPrivileges}
          />
        </Grid>

        {/* dialogs */}
        {canCreateProjects && (
          <CreateProject organizationSlug={organizationSlug} />
        )}
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationPage;

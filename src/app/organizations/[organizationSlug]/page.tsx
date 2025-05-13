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
  useOrganizationMetricsQuery,
  useOrganizationQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { Grid } from "generated/panda/jsx";
import { getOrganization, getOwnerTier } from "lib/actions";
import { app } from "lib/config";
import { MAX_NUMBER_OF_PROJECTS } from "lib/constants";
import { getSdk } from "lib/graphql";
import { getQueryClient } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";

export const generateMetadata = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name}`,
  };
};

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationSlug: string }>;
}

/**
 * Organization overview page.
 */
const OrganizationPage = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const [
    organization,
    { isOwnerSubscribed, hasBasicTierPrivileges, hasTeamTierPrivileges },
  ] = await Promise.all([
    getOrganization({ organizationSlug }),
    getOwnerTier({ organizationSlug }),
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

  // NB: To create projects, user must have administrative privileges. If so, we validate that the owner of the organization is subscribed and has appropriate tier to create an additional project
  const canCreateProjects =
    hasAdminPrivileges &&
    isOwnerSubscribed &&
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
          title: organization.name!,
          cta: [
            {
              label: app.organizationPage.header.cta.viewProjects.label,
              variant: "outline",
              // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
              icon: <HiOutlineFolder />,
              href: `/organizations/${organizationSlug}/projects`,
              disabled: !organization.projects.totalCount,
              tooltip: app.organizationPage.header.cta.viewProjects.tooltip,
            },
            ...(hasAdminPrivileges
              ? [
                  {
                    label: app.organizationPage.header.cta.newProject.label,
                    // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
                    icon: <LuCirclePlus />,
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
          <CreateProject
            canCreateProjects={canCreateProjects}
            organizationSlug={organizationSlug}
          />
        )}
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationPage;

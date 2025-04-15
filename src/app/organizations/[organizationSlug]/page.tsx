import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";

import { auth } from "auth";
import { Page } from "components/layout";
import {
  OrganizationActions,
  OrganizationMetrics,
  OrganizationProjects,
} from "components/organization";
import { CreateProject } from "components/project";
import {
  Role,
  useOrganizationMetricsQuery,
  useOrganizationQuery,
} from "generated/graphql";
import { Grid } from "generated/panda/jsx";
import { app } from "lib/config";
import { MAX_NUMBER_OF_PROJECTS } from "lib/constants";
import { hasBasicTierPrivileges, hasTeamTierPrivileges } from "lib/flags";
import { getSdk } from "lib/graphql";
import { getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";

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

  const sdk = getSdk({ session });

  const [{ organizationBySlug: organization }, isBasicTier, isTeamTier] =
    await Promise.all([
      sdk.Organization({
        slug: organizationSlug,
      }),
      hasBasicTierPrivileges(),
      hasTeamTierPrivileges(),
    ]);

  if (!organization) notFound();

  const { memberByUserIdAndOrganizationId: member } =
    await sdk.OrganizationRole({
      userId: session.user.rowId!,
      organizationId: organization.rowId,
    });

  const hasAdminPrivileges =
    member?.role === Role.Admin || member?.role === Role.Owner;

  // NB: To create projects, user must be subscribed and have administrative privileges. If so, we validate that they are either on the team tier subscription (unlimited projects) or the current number of projects for the organization has not reached its limit
  const canCreateProjects =
    isBasicTier &&
    hasAdminPrivileges &&
    (isTeamTier || organization.projects.nodes.length < MAX_NUMBER_OF_PROJECTS);

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
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        metadata={{
          title: organization.name!,
        }}
        breadcrumbs={breadcrumbs}
        header={{
          title: organization.name!,
          description: app.organizationPage.header.description,
          cta: [
            {
              label: app.organizationPage.header.cta.viewAllProjects.label,
              // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
              icon: <HiOutlineFolder />,
              href: `/organizations/${organizationSlug}/projects`,
              disabled: !organization.projects.nodes.length,
            },
          ],
        }}
      >
        <OrganizationProjects organizationSlug={organizationSlug} />

        <Grid columns={{ base: 1, md: 2 }} gap={6}>
          <OrganizationMetrics organizationId={organization.rowId} />

          <OrganizationActions
            hasAdminPrivileges={hasAdminPrivileges}
            canCreateProjects={canCreateProjects}
          />
        </Grid>

        {/* dialogs */}
        {canCreateProjects && (
          <CreateProject
            isBasicTier={isBasicTier}
            isTeamTier={isTeamTier}
            organizationSlug={organizationSlug}
          />
        )}
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationPage;

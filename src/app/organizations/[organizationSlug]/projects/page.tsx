import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { CreateProject, ProjectFilters, ProjectList } from "components/project";
import {
  Role,
  useOrganizationRoleQuery,
  useProjectsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { MAX_NUMBER_OF_PROJECTS } from "lib/constants";
import { hasBasicTierPrivileges, hasTeamTierPrivileges } from "lib/flags";
import { getSdk } from "lib/graphql";
import { getQueryClient, getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
import type { ProjectsQueryVariables } from "generated/graphql";
import type { SearchParams } from "nuqs/server";

interface Props {
  /** Projects page params. */
  params: Promise<{ organizationSlug: string }>;
  /** Projects page search params. */
  searchParams: Promise<SearchParams>;
}

/**
 * Projects overview page.
 */
const ProjectsPage = async ({ params, searchParams }: Props) => {
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
      label: organization?.name ?? organizationSlug,
      href: `/organizations/${organizationSlug}`,
    },
    {
      label: app.projectsPage.breadcrumb,
    },
  ];

  const queryClient = getQueryClient();

  const { page, pageSize, search } = await getSearchParams.parse(searchParams);

  const variables: ProjectsQueryVariables = {
    pageSize: pageSize,
    offset: (page - 1) * pageSize,
    organizationSlug,
    search,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useProjectsQuery.getKey(variables),
      queryFn: useProjectsQuery.fetcher(variables),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationRoleQuery.getKey({
        userId: session.user.rowId!,
        organizationId: organization.rowId,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        userId: session.user.rowId!,
        organizationId: organization.rowId,
      }),
    }),
  ]);

  return (
    <Page
      metadata={{
        title: `${organization.name} ${app.projectsPage.breadcrumb}`,
      }}
      breadcrumbs={breadcrumbs}
      header={{
        title: app.projectsPage.header.title,
        description: app.projectsPage.header.description,
        cta: [
          {
            label: app.projectsPage.header.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuCirclePlus />,
            disabled: !canCreateProjects,
            dialogType: DialogType.CreateProject,
          },
        ],
      }}
    >
      <ProjectFilters />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectList organizationId={organization.rowId} />
      </HydrationBoundary>

      {/* dialogs */}
      {canCreateProjects && (
        <CreateProject
          isBasicTier={isBasicTier}
          isTeamTier={isTeamTier}
          organizationSlug={organizationSlug}
        />
      )}
    </Page>
  );
};

export default ProjectsPage;

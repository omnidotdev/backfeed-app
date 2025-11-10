import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { CreateProject, ProjectFilters, ProjectList } from "components/project";
import { Role, Tier, useProjectsQuery } from "generated/graphql";
import { getOrganization } from "lib/actions";
import { app } from "lib/config";
import { MAX_NUMBER_OF_PROJECTS } from "lib/constants";
import { getSdk } from "lib/graphql";
import { getQueryClient, getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
import type { ProjectsQueryVariables } from "generated/graphql";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/projects">): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.projectsPage.breadcrumb}`,
  };
};

/**
 * Projects overview page.
 */
const ProjectsPage = async ({
  params,
  searchParams,
}: PageProps<"/organizations/[organizationSlug]/projects">) => {
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

  // NB: To create projects, user must have administrative privileges. If so, we validate that the owner of the organization is subscribed and has appropriate tier to create an additional project
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
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: app.projectsPage.header.title,
          cta: hasAdminPrivileges
            ? [
                {
                  label: app.projectsPage.header.cta.newProject.label,
                  // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
                  icon: <LuCirclePlus />,
                  disabled: !canCreateProjects,
                  dialogType: DialogType.CreateProject,
                  tooltip: app.projectsPage.header.cta.newProject.tooltip,
                },
              ]
            : undefined,
        }}
      >
        <ProjectFilters />

        <ProjectList
          user={session.user}
          canCreateProjects={canCreateProjects}
        />

        {/* dialogs */}
        {canCreateProjects && (
          <CreateProject organizationSlug={organizationSlug} />
        )}
      </Page>
    </HydrationBoundary>
  );
};

export default ProjectsPage;

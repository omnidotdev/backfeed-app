import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { CreateProject, ProjectFilters, ProjectList } from "components/project";
import { Role } from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { projectsQueryOptions } from "lib/react-query/options";
import { getQueryClient, getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { BreadcrumbRecord } from "components/core";
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

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  if (!organization) notFound();

  const { memberByUserIdAndOrganizationId: member } =
    await sdk.OrganizationRole({
      userId: session.user.rowId!,
      organizationId: organization.rowId,
    });

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

  // NB: due to the need to refetch (update) this query frequently from the client, we should avoid suspense and to prevent loading indicators just await the prefetch here
  await queryClient.prefetchQuery(
    projectsQueryOptions({
      pageSize: pageSize,
      offset: (page - 1) * pageSize,
      organizationSlug,
      search,
    })
  );

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
            disabled: !member || member.role === Role.Member,
            dialogType: DialogType.CreateProject,
          },
        ],
      }}
    >
      <ProjectFilters />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectList organizationId={organization.rowId} />

        {/* dialogs */}
        <CreateProject
          organizationSlug={organizationSlug}
          userId={session.user.rowId!}
        />
      </HydrationBoundary>
    </Page>
  );
};

export default ProjectsPage;

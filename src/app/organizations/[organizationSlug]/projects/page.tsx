import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { Page } from "components/layout";
import { ProjectFilters, ProjectList } from "components/project";
import { useProjectsQuery } from "generated/graphql";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession, getQueryClient, getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { ProjectsQueryVariables } from "generated/graphql";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.projectsPage.breadcrumb} | ${app.name}`,
  };
};

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

  const [session, { organizationBySlug: organization }] = await Promise.all([
    getAuthSession(),
    sdk.Organization({ slug: organizationSlug }),
  ]);

  if (!session || !organization) notFound();

  const breadcrumbs = [
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

  await queryClient.prefetchQuery({
    queryKey: useProjectsQuery.getKey(variables),
    queryFn: useProjectsQuery.fetcher(variables),
  });

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: app.projectsPage.header.title,
        description: app.projectsPage.header.description,
        cta: [
          {
            label: app.projectsPage.header.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuCirclePlus />,
            dialogType: DialogType.CreateProject,
          },
        ],
      }}
    >
      <ProjectFilters />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectList />
      </HydrationBoundary>
    </Page>
  );
};

export default ProjectsPage;

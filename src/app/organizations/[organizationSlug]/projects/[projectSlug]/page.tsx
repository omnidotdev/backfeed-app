import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { ProjectOverview } from "components/project";
import {
  Role,
  useInfinitePostsQuery,
  useOrganizationRoleQuery,
  usePostsQuery,
  useProjectMetricsQuery,
  useProjectQuery,
  useProjectStatusesQuery,
  useStatusBreakdownQuery,
} from "generated/graphql";
import { getProject } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getQueryClient, getSearchParams } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import type { PostOrderBy } from "generated/graphql";
import type { SearchParams } from "nuqs/server";

export const generateMetadata = async ({ params }: Props) => {
  const { organizationSlug, projectSlug } = await params;

  const project = await getProject({
    organizationSlug,
    projectSlug,
  });

  return {
    title: `${project?.name}`,
  };
};

interface Props {
  /** Project page params. */
  params: Promise<{ organizationSlug: string; projectSlug: string }>;
  /** Projects page search params. */
  searchParams: Promise<SearchParams>;
}

/**
 * Project overview page.
 */
const ProjectPage = async ({ params, searchParams }: Props) => {
  const { organizationSlug, projectSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const project = await getProject({ organizationSlug, projectSlug });

  if (!project) notFound();

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user?.rowId!,
    organizationId: project.organization?.rowId!,
  });

  const { excludedStatuses, orderBy, search } =
    await getSearchParams.parse(searchParams);

  const queryClient = getQueryClient();

  const breadcrumbs: BreadcrumbRecord[] = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: project.organization?.name ?? organizationSlug,
      href: `/organizations/${organizationSlug}`,
    },
    {
      label: app.projectsPage.breadcrumb,
      href: `/organizations/${organizationSlug}/projects`,
    },
    {
      label: project.name ?? projectSlug,
    },
  ];

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useProjectQuery.getKey({
        projectSlug,
        organizationSlug,
      }),
      queryFn: useProjectQuery.fetcher({
        projectSlug,
        organizationSlug,
      }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: useInfinitePostsQuery.getKey({
        pageSize: 5,
        projectId: project.rowId,
        excludedStatuses,
        orderBy: orderBy ? (orderBy as PostOrderBy) : undefined,
        search,
      }),
      queryFn: usePostsQuery.fetcher({
        pageSize: 5,
        projectId: project.rowId,
        excludedStatuses,
        orderBy: orderBy ? (orderBy as PostOrderBy) : undefined,
        search,
      }),
      initialPageParam: undefined,
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationRoleQuery.getKey({
        userId: session.user.rowId!,
        organizationId: project.organization?.rowId!,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        userId: session.user.rowId!,
        organizationId: project.organization?.rowId!,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useProjectMetricsQuery.getKey({ projectId: project.rowId }),
      queryFn: useProjectMetricsQuery.fetcher({ projectId: project.rowId }),
    }),
    queryClient.prefetchQuery({
      queryKey: useProjectStatusesQuery.getKey({ projectId: project.rowId }),
      queryFn: useProjectStatusesQuery.fetcher({ projectId: project.rowId }),
    }),
    queryClient.prefetchQuery({
      queryKey: useStatusBreakdownQuery.getKey({ projectId: project.rowId }),
      queryFn: useStatusBreakdownQuery.fetcher({ projectId: project.rowId }),
    }),
  ]);

  const hasAdminPrivileges =
    memberByUserIdAndOrganizationId &&
    memberByUserIdAndOrganizationId.role !== Role.Member;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: project.name!,
          description: project.description!,
          cta: [
            {
              label: app.projectPage.header.cta.viewAllProjects.label,
              // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
              icon: <HiOutlineFolder />,
              variant: "outline",
              href: `/organizations/${organizationSlug}/projects`,
            },
            ...(hasAdminPrivileges
              ? [
                  {
                    label: app.projectPage.header.cta.settings.label,
                    // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
                    icon: <LuSettings />,
                    href: `/organizations/${organizationSlug}/projects/${projectSlug}/settings`,
                  },
                ]
              : []),
          ],
        }}
      >
        <ProjectOverview user={session.user} projectId={project.rowId} />
      </Page>
    </HydrationBoundary>
  );
};

export default ProjectPage;

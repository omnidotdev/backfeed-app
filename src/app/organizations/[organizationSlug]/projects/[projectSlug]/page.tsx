import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { ProjectLinks, ProjectOverview } from "components/project";
import {
  PostOrderBy,
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
import { freeTierFeedbackOptions } from "lib/options";
import { getQueryClient, getSearchParams } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/projects/[projectSlug]">): Promise<Metadata> => {
  const { organizationSlug, projectSlug } = await params;

  const project = await getProject({
    organizationSlug,
    projectSlug,
  });

  return {
    title: `${project?.name}`,
  };
};

/**
 * Project overview page.
 */
const ProjectPage = async ({
  params,
  searchParams,
}: PageProps<"/organizations/[organizationSlug]/projects/[projectSlug]">) => {
  const { organizationSlug, projectSlug } = await params;

  const session = await auth();

  const project = await getProject({ organizationSlug, projectSlug });

  if (!project) notFound();

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId } = session
    ? await sdk.OrganizationRole({
        userId: session.user?.rowId!,
        organizationId: project.organization?.rowId!,
      })
    : { memberByUserIdAndOrganizationId: null };

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
    queryClient.prefetchQuery(
      freeTierFeedbackOptions({ organizationSlug, projectSlug }),
    ),
    queryClient.prefetchInfiniteQuery({
      queryKey: useInfinitePostsQuery.getKey({
        projectId: project.rowId,
        excludedStatuses,
        orderBy: orderBy
          ? [orderBy as PostOrderBy, PostOrderBy.CreatedAtDesc]
          : undefined,
        search,
        userId: session?.user.rowId,
      }),
      queryFn: usePostsQuery.fetcher({
        projectId: project.rowId,
        excludedStatuses,
        orderBy: orderBy
          ? [orderBy as PostOrderBy, PostOrderBy.CreatedAtDesc]
          : undefined,
        search,
        userId: session?.user.rowId,
      }),
      initialPageParam: undefined,
    }),
    ...(session
      ? [
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
        ]
      : []),
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
          headerProps: {
            children: <ProjectLinks project={project} />,
          },
          cta: [
            {
              label: app.projectPage.header.cta.viewAllProjects.label,
              icon: <HiOutlineFolder />,
              variant: "outline",
              href: `/organizations/${organizationSlug}/projects`,
            },
            ...(hasAdminPrivileges
              ? [
                  {
                    label: app.projectPage.header.cta.settings.label,
                    icon: <LuSettings />,
                    href: `/organizations/${organizationSlug}/projects/${projectSlug}/settings`,
                  },
                ]
              : []),
          ],
        }}
      >
        <ProjectOverview user={session?.user} projectId={project.rowId} />
      </Page>
    </HydrationBoundary>
  );
};

export default ProjectPage;

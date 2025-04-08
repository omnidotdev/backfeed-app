import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import { ProjectOverview } from "components/project";
import { Role, useInfinitePostsQuery, usePostsQuery } from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import {
  projectMetricsQueryOptions,
  projectQueryOptions,
  projectStatusesQueryOptions,
  statusBreakdownQueryOptions,
} from "lib/react-query/options";
import { getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";

interface Props {
  /** Project page params. */
  params: Promise<{ organizationSlug: string; projectSlug: string }>;
}

/**
 * Project overview page.
 */
const ProjectPage = async ({ params }: Props) => {
  const { organizationSlug, projectSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const sdk = getSdk({ session });

  const { projects } = await sdk.Project({ projectSlug, organizationSlug });

  const project = projects?.nodes?.[0];

  if (!project) notFound();

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user?.rowId!,
    organizationId: project.organization?.rowId!,
  });

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

  Promise.all([
    queryClient.prefetchQuery(
      projectQueryOptions({
        projectSlug,
        organizationSlug,
      })
    ),
    // TODO: determine if it is best to stream this or not
    queryClient.prefetchInfiniteQuery({
      queryKey: useInfinitePostsQuery.getKey({
        pageSize: 5,
        projectId: project.rowId,
      }),
      queryFn: usePostsQuery.fetcher({
        pageSize: 5,
        projectId: project.rowId,
      }),
      initialPageParam: undefined,
    }),
    queryClient.prefetchQuery(
      projectMetricsQueryOptions({ projectId: project.rowId })
    ),
    queryClient.prefetchQuery(
      projectStatusesQueryOptions({ projectId: project.rowId })
    ),
    queryClient.prefetchQuery(
      statusBreakdownQueryOptions({ projectId: project.rowId })
    ),
  ]);

  return (
    <Page
      metadata={{
        title: project.name!,
      }}
      breadcrumbs={breadcrumbs}
      header={{
        title: project.name!,
        description: project.description!,
        cta: [
          {
            label: app.projectPage.header.cta.settings.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuSettings />,
            disabled:
              !memberByUserIdAndOrganizationId ||
              memberByUserIdAndOrganizationId.role === Role.Member,
            href: `/organizations/${organizationSlug}/projects/${projectSlug}/settings`,
          },
          {
            label: app.projectPage.header.cta.viewAllProjects.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <HiOutlineFolder />,
            variant: "outline",
            href: `/organizations/${organizationSlug}/projects`,
          },
        ],
      }}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectOverview projectId={project.rowId} />
      </HydrationBoundary>
    </Page>
  );
};

export default ProjectPage;

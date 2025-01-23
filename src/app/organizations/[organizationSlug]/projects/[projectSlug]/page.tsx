import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { Page } from "components/layout";
import { ProjectOverview } from "components/project";
import {
  useInfinitePostsQuery,
  usePostsQuery,
  useProjectMetricsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { sdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug, projectSlug } = await params;

  const { projects } = await sdk.Project({ projectSlug, organizationSlug });

  const project = projects?.nodes?.[0];

  return {
    title: `${project?.name} | ${app.name}`,
  };
};

interface Props {
  /** Project page params. */
  params: Promise<{ organizationSlug: string; projectSlug: string }>;
}

/**
 * Project overview page.
 */
const ProjectPage = async ({ params }: Props) => {
  const { organizationSlug, projectSlug } = await params;

  const [session, { projects }] = await Promise.all([
    getAuthSession(),
    sdk.Project({ projectSlug, organizationSlug }),
  ]);

  const project = projects?.nodes?.[0];

  if (!session || !project) notFound();

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
    queryClient.prefetchQuery({
      queryKey: useProjectMetricsQuery.getKey({ projectId: project.rowId }),
      queryFn: useProjectMetricsQuery.fetcher({ projectId: project.rowId }),
    }),
  ]);

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: project.name!,
        description: project.description!,
        // TODO: add button actions
        cta: [
          {
            label: app.projectPage.header.cta.settings.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuSettings />,
            disabled: true,
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

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { ProjectSettings } from "components/project";
import { Role, useProjectStatusesQuery } from "generated/graphql";
import { getProject } from "lib/actions";
import { app, isDevEnv } from "lib/config";
import { getSdk } from "lib/graphql";
import { projectOptions } from "lib/options";
import { getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";

export const generateMetadata = async ({ params }: Props) => {
  const { organizationSlug, projectSlug } = await params;

  const project = await getProject({
    organizationSlug,
    projectSlug,
  });

  return {
    title: `${project?.name} ${app.projectSettingsPage.breadcrumb}`,
  };
};

interface Props {
  /** Project settings page params. */
  params: Promise<{ organizationSlug: string; projectSlug: string }>;
}

/**
 * Project settings page.
 */
const ProjectSettingsPage = async ({ params }: Props) => {
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

  const isAdmin =
    memberByUserIdAndOrganizationId?.role === Role.Admin ||
    memberByUserIdAndOrganizationId?.role === Role.Owner;

  if (!isAdmin) notFound();

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
      href: `/organizations/${organizationSlug}/projects/${projectSlug}`,
    },
    {
      label: app.projectSettingsPage.breadcrumb,
    },
  ];

  await Promise.all([
    queryClient.prefetchQuery(
      projectOptions({
        projectSlug,
        organizationSlug,
        userId: session?.user.rowId,
      }),
    ),
    // TODO: when ready to implement for production, remove the development environment check
    ...(isDevEnv
      ? [
          queryClient.prefetchQuery({
            queryKey: useProjectStatusesQuery.getKey({
              projectId: project.rowId,
            }),
            queryFn: useProjectStatusesQuery.fetcher({
              projectId: project.rowId,
            }),
          }),
        ]
      : []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: `${project.name!} Settings`,
        }}
      >
        <ProjectSettings
          user={session.user}
          projectId={project.rowId}
          organizationSlug={organizationSlug}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default ProjectSettingsPage;

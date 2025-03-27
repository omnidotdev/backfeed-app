import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { ProjectSettings } from "components/project";
import {
  Role,
  useProjectQuery,
  useProjectStatusesQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { hasTeamSubscription, isDevelopment } from "lib/flags";
import { getSdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";

interface Props {
  /** Project settings page params. */
  params: Promise<{ organizationSlug: string; projectSlug: string }>;
}

/**
 * Project settings page.
 */
const ProjectSettingsPage = async ({ params }: Props) => {
  const { organizationSlug, projectSlug } = await params;

  const [session, sdk] = await Promise.all([getAuthSession(), getSdk()]);

  if (!session || !sdk) notFound();

  const { projects } = await sdk.Project({ projectSlug, organizationSlug });

  const project = projects?.nodes?.[0];

  if (!project) notFound();

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user?.rowId!,
    organizationId: project.organization?.rowId!,
  });

  const isAdmin =
    memberByUserIdAndOrganizationId?.role === Role.Admin ||
    memberByUserIdAndOrganizationId?.role === Role.Owner;

  if (!isAdmin) notFound();

  const development = await isDevelopment();

  // ! NB: At this point, we know that the user has access to edit the project through the settings page. This feature flag validates that the user has the necessary subscription to customize the project's statuses.
  // TODO: when ready to implement for production, remove the development check
  const canEditStatuses = development && (await hasTeamSubscription());

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
    queryClient.prefetchQuery({
      queryKey: useProjectQuery.getKey({ projectSlug, organizationSlug }),
      queryFn: useProjectQuery.fetcher({ projectSlug, organizationSlug }),
    }),
    // ! NB: only prefetch the project statuses if the user can edit statuses
    ...(canEditStatuses
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
    <Page
      metadata={{
        title: `${project?.name} ${app.projectSettingsPage.breadcrumb} | ${app.name}`,
      }}
      breadcrumbs={breadcrumbs}
      header={{
        title: `${project.name!} Settings`,
        description:
          "Handle project settings and manage feedback for your project.",
      }}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectSettings
          projectId={project.rowId}
          organizationSlug={organizationSlug}
          canEditStatuses={canEditStatuses}
        />
      </HydrationBoundary>
    </Page>
  );
};

export default ProjectSettingsPage;

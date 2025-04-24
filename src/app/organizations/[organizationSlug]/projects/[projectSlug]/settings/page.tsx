import { notFound } from "next/navigation";

import { auth } from "auth";
import { Await } from "components/core";
import { Page } from "components/layout";
import { ProjectSettings } from "components/project";
import { Role } from "generated/graphql";
import { getProject } from "lib/actions";
import { app, isDevEnv } from "lib/config";
import { enableTeamTierPrivilegesFlag } from "lib/flags";
import { getSdk } from "lib/graphql";

import type { BreadcrumbRecord } from "components/core";
import { projectOptions, projectStatusesOptions } from "lib/options";

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

  // ! NB: At this point, we know that the user has access to edit the project through the settings page. This feature flag validates that the user has the necessary subscription to customize the project's statuses.
  // TODO: when ready to implement for production, remove the development check
  const canEditStatuses = isDevEnv && (await enableTeamTierPrivilegesFlag());

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

  return (
    <Await
      // TODO: separate concerns for prefetching for loading / error state management
      prefetch={[
        projectOptions({ projectSlug, organizationSlug }),
        // ! NB: only prefetch the project statuses if the user can edit statuses
        ...(canEditStatuses
          ? [
              projectStatusesOptions({
                projectId: project.rowId,
              }),
            ]
          : []),
      ]}
    >
      <Page
        breadcrumbs={breadcrumbs}
        header={{
          title: `${project.name!} Settings`,
          description:
            "Handle project settings and manage feedback for your project.",
        }}
      >
        <ProjectSettings
          projectId={project.rowId}
          organizationSlug={organizationSlug}
          canEditStatuses={canEditStatuses}
        />
      </Page>
    </Await>
  );
};

export default ProjectSettingsPage;

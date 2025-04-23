import { notFound } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { auth } from "auth";
import { Await } from "components/core";
import { Page } from "components/layout";
import { ProjectOverview } from "components/project";
import { Role } from "generated/graphql";
import { getProject } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import {
  infinitePostsOptions,
  projectMetricsOptions,
  projectOptions,
  projectStatusesOptions,
  statusBreakdownOptions,
} from "lib/options";

import type { BreadcrumbRecord } from "components/core";

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
}

/**
 * Project overview page.
 */
const ProjectPage = async ({ params }: Props) => {
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

  const commonVariables = { projectId: project.rowId };

  return (
    // TODO: separate concerns for prefetching for loading / error state management
    <Await
      prefetch={[
        projectOptions({
          projectSlug,
          organizationSlug,
        }),
        projectMetricsOptions(commonVariables),
        projectStatusesOptions(commonVariables),
        statusBreakdownOptions(commonVariables),
      ]}
      infinitePrefetch={[
        infinitePostsOptions({
          pageSize: 5,
          projectId: project.rowId,
        }),
      ]}
    >
      <Page
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
        <ProjectOverview projectId={project.rowId} />
      </Page>
    </Await>
  );
};

export default ProjectPage;

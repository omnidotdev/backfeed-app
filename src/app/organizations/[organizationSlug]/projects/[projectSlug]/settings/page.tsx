import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { BreadcrumbRecord } from "components/core";
import { Role } from "generated/graphql";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { organizationSlug, projectSlug } = await params;

  const sdk = await getSdk();

  const { projects } = await sdk.Project({ projectSlug, organizationSlug });

  const project = projects?.nodes?.[0];

  return {
    title: `${project?.name} Settings | ${app.name}`,
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

  const [session, sdk] = await Promise.all([getAuthSession(), getSdk()]);

  if (!session || !sdk) notFound();

  const { projects } = await sdk.Project({ projectSlug, organizationSlug });

  const project = projects?.nodes?.[0];

  if (!project) notFound();

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user?.rowId!,
    organizationId: project.organization?.rowId!,
  });

  if (
    !memberByUserIdAndOrganizationId ||
    memberByUserIdAndOrganizationId.role === Role.Member
  )
    notFound();

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
      label: "Settings",
    },
  ];

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: `${project.name!} Settings`,
        description:
          "Handle project settings and manage feedback for your project.",
      }}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        Settings
      </HydrationBoundary>
    </Page>
  );
};

export default ProjectSettingsPage;

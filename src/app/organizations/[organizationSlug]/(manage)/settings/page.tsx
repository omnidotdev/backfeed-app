import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { OrganizationSettings } from "components/organization";
import { Role } from "generated/graphql";
import { app } from "lib/config";
import { isDevelopment } from "lib/flags";
import { getSdk } from "lib/graphql";
import {
  membersQueryOptions,
  organizationRoleQueryOptions,
} from "lib/react-query/options";
import { getQueryClient } from "lib/util";

interface Props {
  /** Organization page params. */
  params: Promise<{ organizationSlug: string }>;
}

/**
 * Organization settings page.
 */
const OrganizationSettingsPage = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const developmentFlag = await isDevelopment();

  const session = await auth();

  if (!session) notFound();

  const sdk = getSdk({ session });

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  if (!organization) notFound();

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    organizationRoleQueryOptions({
      userId: session.user.rowId!,
      organizationId: organization.rowId,
    })
  );
  queryClient.prefetchQuery(
    membersQueryOptions({
      organizationId: organization.rowId,
      roles: [Role.Owner],
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        metadata={{
          title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
        }}
        header={{
          title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
          description: app.organizationSettingsPage.description,
        }}
        pt={0}
      >
        <OrganizationSettings
          organizationId={organization.rowId}
          developmentFlag={developmentFlag}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationSettingsPage;

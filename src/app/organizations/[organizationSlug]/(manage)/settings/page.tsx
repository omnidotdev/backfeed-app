import { notFound } from "next/navigation";

import { auth } from "auth";
import { Await } from "components/core";
import { Page } from "components/layout";
import { OrganizationSettings } from "components/organization";
import { Role } from "generated/graphql";
import { getOrganization } from "lib/actions";
import { app } from "lib/config";
import { isDevelopment } from "lib/flags";
import { membersOptions, organizationRoleOptions } from "lib/options";

export const generateMetadata = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.organizationSettingsPage.breadcrumb}`,
  };
};

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

  const organization = await getOrganization({ organizationSlug });

  if (!organization) notFound();

  return (
    // TODO: separate concerns for prefetching for loading / error state management
    <Await
      prefetch={[
        organizationRoleOptions({
          userId: session.user.rowId!,
          organizationId: organization.rowId,
        }),
        membersOptions({
          organizationId: organization.rowId,
          roles: [Role.Owner],
        }),
      ]}
    >
      <Page
        header={{
          title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
          description: app.organizationSettingsPage.description,
        }}
        pt={0}
      >
        <OrganizationSettings
          userId={session.user.rowId!}
          organizationId={organization.rowId}
          developmentFlag={developmentFlag}
        />
      </Page>
    </Await>
  );
};

export default OrganizationSettingsPage;

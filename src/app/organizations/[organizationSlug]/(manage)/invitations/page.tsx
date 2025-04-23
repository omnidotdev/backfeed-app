import { notFound } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";

import { auth } from "auth";
import { Await } from "components/core";
import { Page } from "components/layout";
import { Invitations, InviteMember } from "components/organization";
import { Role } from "generated/graphql";
import { getOrganization } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { invitationsOptions } from "lib/options";
import { DialogType } from "store";

export const generateMetadata = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.organizationInvitationsPage.breadcrumb}`,
  };
};

interface Props {
  /** Organization invitations page parameters. */
  params: Promise<{ organizationSlug: string }>;
}

/**
 * Organization invitations page.
 */
const OrganizationInvitationsPage = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const organization = await getOrganization({ organizationSlug });

  if (!organization) notFound();

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId: member } =
    await sdk.OrganizationRole({
      userId: session.user.rowId!,
      organizationId: organization.rowId,
    });

  const isAdmin = member?.role === Role.Admin || member?.role === Role.Owner;

  if (!isAdmin) notFound();

  return (
    // TODO: loading / error state management
    <Await
      prefetch={[
        invitationsOptions({
          organizationId: organization.rowId,
        }),
      ]}
    >
      <Page
        header={{
          title: `${organization.name} ${app.organizationInvitationsPage.breadcrumb}`,
          description: app.organizationInvitationsPage.description,
          cta: isAdmin
            ? [
                {
                  label: app.organizationInvitationsPage.cta.inviteMember.title,
                  // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
                  icon: <FiUserPlus />,
                  dialogType: DialogType.InviteMember,
                  variant: "outline",
                },
              ]
            : undefined,
        }}
        pt={0}
      >
        <Invitations organizationId={organization.rowId} />

        {/* dialogs */}
        <InviteMember
          organizationName={organization.name!}
          organizationId={organization.rowId}
        />
      </Page>
    </Await>
  );
};

export default OrganizationInvitationsPage;

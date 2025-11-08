import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";

import { auth } from "auth";
import { Page } from "components/layout";
import { Invitations, InviteMember } from "components/organization";
import { Role, useInvitationsQuery } from "generated/graphql";
import { getOrganization } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getQueryClient } from "lib/util";
import { DialogType } from "store";

import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/invitations">): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.organizationInvitationsPage.breadcrumb}`,
  };
};

/**
 * Organization invitations page.
 */
const OrganizationInvitationsPage = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/invitations">) => {
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

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: useInvitationsQuery.getKey({
      organizationId: organization.rowId,
    }),
    queryFn: useInvitationsQuery.fetcher({
      organizationId: organization.rowId,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
        <Invitations user={session.user} organizationId={organization.rowId} />

        {/* dialogs */}
        <InviteMember
          user={session.user}
          organizationName={organization.name!}
          organizationId={organization.rowId}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationInvitationsPage;

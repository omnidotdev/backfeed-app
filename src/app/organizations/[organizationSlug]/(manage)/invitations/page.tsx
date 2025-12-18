import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";

import { Page } from "components/layout";
import { Invitations, InviteMember } from "components/organization";
import { Role, useInvitationsQuery } from "generated/graphql";
import { icon } from "generated/panda/recipes";
import { getOrganization } from "lib/actions";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getAuthSession, getQueryClient } from "lib/util";
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

  const session = await getAuthSession();

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
                  // `className` used to apply default recipe styles as `Icon` is not compatible in RSCs
                  icon: <FiUserPlus className={icon()} />,
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

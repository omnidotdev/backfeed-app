import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";

import { auth } from "auth";
import { Page } from "components/layout";
import { Role, useInvitationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { getSdk } from "lib/graphql";
import { getQueryClient } from "lib/util";
import { DialogType } from "store";

import type { SearchParams } from "nuqs/server";
import { Invitations, InviteMember } from "components/organization";

interface Props {
  /** Organization members page parameters. */
  params: Promise<{ organizationSlug: string }>;
  /** Organization members page search parameters. */
  searchParams: Promise<SearchParams>;
}

/**
 * Organization invitations page.
 */
const OrganizationInvitationsPage = async ({ params }: Props) => {
  const { organizationSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const sdk = getSdk({ session });

  const { organizationBySlug: organization } = await sdk.Organization({
    slug: organizationSlug,
  });

  if (!organization) notFound();

  const { memberByUserIdAndOrganizationId: member } =
    await sdk.OrganizationRole({
      userId: session.user.rowId!,
      organizationId: organization.rowId,
    });

  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: useInvitationsQuery.getKey({
      // email: session?.user?.email,
      organizationId: organization.rowId,
    }),
    queryFn: useInvitationsQuery.fetcher({
      // email: session?.user?.email,
      organizationId: organization.rowId,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        metadata={{
          title: `${organization.name} ${app.organizationInvitationsPage.breadcrumb}`,
        }}
        header={{
          title: `${organization.name} ${app.organizationInvitationsPage.breadcrumb}`,
          description: app.organizationInvitationsPage.description,
          cta:
            member?.role === Role.Owner
              ? [
                  {
                    label: app.organizationMembersPage.cta.inviteMember.title,
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
    </HydrationBoundary>
  );
};

export default OrganizationInvitationsPage;

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { LuCirclePlus } from "react-icons/lu";

import { auth } from "auth";
import { Page } from "components/layout";
import {
  AddOwner,
  Members,
  MembershipFilters,
  Owners,
} from "components/organization";
import {
  Role,
  useMembersQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { getOrganization } from "lib/actions";
import { app, isDevEnv } from "lib/config";
import { getSdk } from "lib/graphql";
import { getQueryClient, getSearchParams } from "lib/util";
import { DialogType } from "store";

import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: PageProps<"/organizations/[organizationSlug]/members">): Promise<Metadata> => {
  const { organizationSlug } = await params;

  const organization = await getOrganization({
    organizationSlug,
  });

  return {
    title: `${organization?.name} ${app.organizationMembersPage.breadcrumb}`,
  };
};

/**
 * Organization members page.
 */
const OrganizationMembersPage = async ({
  params,
  searchParams,
}: PageProps<"/organizations/[organizationSlug]/members">) => {
  const { organizationSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const organization = await getOrganization({
    organizationSlug,
  });

  if (!organization) notFound();

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId: member } =
    await sdk.OrganizationRole({
      userId: session.user.rowId!,
      organizationId: organization.rowId,
    });

  const queryClient = getQueryClient();

  const { search, roles } = await getSearchParams.parse(searchParams);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useMembersQuery.getKey({
        organizationId: organization.rowId,
        roles: [Role.Owner],
      }),
      queryFn: useMembersQuery.fetcher({
        organizationId: organization.rowId,
        roles: [Role.Owner],
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useMembersQuery.getKey({
        organizationId: organization.rowId,
        roles: roles ?? undefined,
        search,
        excludeRoles: [Role.Owner],
      }),
      queryFn: useMembersQuery.fetcher({
        organizationId: organization.rowId,
        roles: roles ?? undefined,
        search,
        excludeRoles: [Role.Owner],
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationRoleQuery.getKey({
        organizationId: organization.rowId,
        userId: session.user.rowId!,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        organizationId: organization.rowId,
        userId: session.user.rowId!,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: `${organization.name} ${app.organizationMembersPage.breadcrumb}`,
          description: app.organizationMembersPage.description,
          cta:
            // TODO: allow adding owners when transferring ownership is resolved. Restricting to single ownership for now.
            member?.role === Role.Owner && isDevEnv
              ? [
                  {
                    label: app.organizationMembersPage.cta.addOwner.label,
                    // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
                    icon: <LuCirclePlus />,
                    dialogType: DialogType.AddOwner,
                  },
                ]
              : undefined,
        }}
        pt={0}
      >
        <Owners organizationId={organization.rowId} />

        <MembershipFilters />

        <Members user={session.user} organizationId={organization.rowId} />

        {/* dialogs */}
        {/* TODO: allow adding owners when transferring ownership is resolved. Restricting to single ownership for now. */}
        {isDevEnv && <AddOwner organizationId={organization.rowId} />}
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationMembersPage;

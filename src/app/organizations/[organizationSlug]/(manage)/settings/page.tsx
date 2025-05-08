import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Page } from "components/layout";
import { OrganizationSettings } from "components/organization";
import {
  Role,
  useMembersQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { getOrganization } from "lib/actions";
import { app } from "lib/config";
import { enableOwnershipTransferFlag } from "lib/flags";
import { getSdk } from "lib/graphql";
import { getQueryClient } from "lib/util";

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

  const isOwnershipTransferEnabled = await enableOwnershipTransferFlag();

  const [session, organization] = await Promise.all([
    auth(),
    getOrganization({ organizationSlug }),
  ]);

  if (!session || !organization) notFound();

  const sdk = getSdk({ session });

  const { memberByUserIdAndOrganizationId } = await sdk.OrganizationRole({
    userId: session.user.rowId!,
    organizationId: organization.rowId,
  });

  if (!memberByUserIdAndOrganizationId) notFound();

  const queryClient = getQueryClient();

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
      queryKey: useOrganizationRoleQuery.getKey({
        userId: session.user.rowId!,
        organizationId: organization.rowId,
      }),
      queryFn: useOrganizationRoleQuery.fetcher({
        userId: session.user.rowId!,
        organizationId: organization.rowId,
      }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Page
        header={{
          title: `${organization.name} ${app.organizationSettingsPage.breadcrumb}`,
        }}
        pt={0}
      >
        <OrganizationSettings
          userId={session?.user.rowId}
          organizationId={organization.rowId}
          isOwnershipTransferEnabled={isOwnershipTransferEnabled}
        />
      </Page>
    </HydrationBoundary>
  );
};

export default OrganizationSettingsPage;

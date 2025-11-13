import { HStack } from "@omnidev/sigil";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { ManagementSidebar } from "components/organization";
import {
  useOrganizationQuery,
  useOrganizationRoleQuery,
} from "generated/graphql";
import { getOrganization } from "lib/actions";
import { getQueryClient } from "lib/util";

/**
 * Manage organization layout.
 */
const ManageOrganizationLayout = async ({
  params,
  children,
}: LayoutProps<"/organizations/[organizationSlug]">) => {
  const { organizationSlug } = await params;

  const session = await auth();

  if (!session) notFound();

  const organization = await getOrganization({ organizationSlug });

  if (!organization) notFound();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useOrganizationQuery.getKey({ slug: organizationSlug }),
      queryFn: useOrganizationQuery.fetcher({ slug: organizationSlug }),
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
      <HStack h="full" w="full" gap={0}>
        <ManagementSidebar user={session.user}>{children}</ManagementSidebar>
      </HStack>
    </HydrationBoundary>
  );
};

export default ManageOrganizationLayout;

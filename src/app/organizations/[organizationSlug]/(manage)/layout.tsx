import { HStack } from "@omnidev/sigil";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { ManagementSidebar } from "components/organization";
import { useOrganizationQuery } from "generated/graphql";
import { getQueryClient } from "lib/util";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  params: Promise<{ organizationSlug: string }>;
}

/**
 * Manage organization layout.
 */
const ManageOrganizationLayout = async ({ params, children }: Props) => {
  const { organizationSlug } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: useOrganizationQuery.getKey({ slug: organizationSlug }),
    queryFn: useOrganizationQuery.fetcher({ slug: organizationSlug }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HStack h="full" w="full" gap={0}>
        <ManagementSidebar>{children}</ManagementSidebar>
      </HStack>
    </HydrationBoundary>
  );
};

export default ManageOrganizationLayout;

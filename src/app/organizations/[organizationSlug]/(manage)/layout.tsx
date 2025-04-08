import { HStack } from "@omnidev/sigil";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { ManagementSidebar } from "components/organization";
import { organizationQueryOptions } from "lib/react-query/options";
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

  const session = await auth();

  if (!session) notFound();

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(
    organizationQueryOptions({ slug: organizationSlug })
  );

  return (
    <HStack h="full" w="full" gap={0}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ManagementSidebar>{children}</ManagementSidebar>
      </HydrationBoundary>
    </HStack>
  );
};

export default ManageOrganizationLayout;

import { HStack } from "@omnidev/sigil";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Await } from "components/core";
import { ManagementSidebar } from "components/organization";
import { organizationOptions } from "lib/options";

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

  return (
    // TODO: loading / error state management
    <Await prefetch={[organizationOptions({ slug: organizationSlug })]}>
      <HStack h="full" w="full" gap={0}>
        <ManagementSidebar>{children}</ManagementSidebar>
      </HStack>
    </Await>
  );
};

export default ManageOrganizationLayout;

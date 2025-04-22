import { HStack } from "@omnidev/sigil";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { ProfileSidebar } from "components/profile";
import { useInvitationsQuery, useUserQuery } from "generated/graphql";
import { getQueryClient } from "lib/util";

import type { PropsWithChildren } from "react";

/**
 * Manage profile layout.
 */
const ProfileLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  if (!session) notFound();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useUserQuery.getKey({
        hidraId: session?.user?.hidraId!,
      }),
      queryFn: useUserQuery.fetcher({
        hidraId: session?.user?.hidraId!,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useInvitationsQuery.getKey({
        email: session?.user?.email!,
      }),
      queryFn: useInvitationsQuery.fetcher({
        email: session?.user?.email!,
      }),
    }),
  ]);

  return (
    <HStack h="full" w="full" gap={0}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileSidebar>{children}</ProfileSidebar>
      </HydrationBoundary>
    </HStack>
  );
};

export default ProfileLayout;

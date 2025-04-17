import { HStack } from "@omnidev/sigil";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

import { auth } from "auth";
import { ProfileSidebar } from "components/profile";
import { useInvitationsQuery, useUserQuery } from "generated/graphql";
import { getSubscription } from "lib/actions";
import { getQueryClient } from "lib/util";
import { polar } from "lib/polar";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  params: Promise<{ userId: string }>;
}

/**
 * Manage profile layout.
 */
const ProfileLayout = async ({ children, params }: Props) => {
  const { userId } = await params;

  const [session, customer] = await Promise.allSettled([
    auth(),
    polar.customers.getStateExternal({
      externalId: userId,
    }),
  ]);

  if (session.status === "rejected") redirect("/");

  if (session?.value?.user?.rowId !== userId) notFound();

  const queryClient = getQueryClient();

  await Promise.all([
    // // If the customer exists (i.e. has an active subscription or has subscribed in the past), prefetch the subscription data.
    customer.status !== "rejected" &&
      queryClient.prefetchQuery({
        queryKey: ["Subscription", userId],
        queryFn: async () => await getSubscription(userId),
      }),
    queryClient.prefetchQuery({
      queryKey: useUserQuery.getKey({
        hidraId: session?.value?.user?.hidraId!,
      }),
      queryFn: useUserQuery.fetcher({
        hidraId: session?.value?.user?.hidraId!,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useInvitationsQuery.getKey({
        email: session?.value?.user?.email!,
      }),
      queryFn: useInvitationsQuery.fetcher({
        email: session?.value?.user?.email!,
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

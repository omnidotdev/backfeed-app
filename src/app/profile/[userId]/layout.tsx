import { HStack } from "@omnidev/sigil";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Await } from "components/core";
import { ProfileSidebar } from "components/profile";
import { invitationsOptions } from "lib/options";

import type { PropsWithChildren } from "react";

/**
 * Manage profile layout.
 */
const ProfileLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  if (!session) notFound();

  return (
    <HStack h="full" w="full" gap={0}>
      <Await
        prefetch={[
          invitationsOptions({
            email: session?.user?.email!,
          }),
        ]}
      >
        <ProfileSidebar user={session.user}>{children}</ProfileSidebar>
      </Await>
    </HStack>
  );
};

export default ProfileLayout;

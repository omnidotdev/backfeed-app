import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { userOptions } from "@/lib/options/users";

export const Route = createFileRoute("/_app/profile/$userId/_layout")({
  beforeLoad: async ({
    context: { session, queryClient },
    params: { userId },
    location,
  }) => {
    if (!session?.user?.rowId) {
      throw redirect({
        to: "/",
        search: { returnTo: location.href },
      });
    }

    const { userByIdentityProviderId } = await queryClient.ensureQueryData(
      userOptions({ identityProviderId: userId }),
    );

    if (
      !userByIdentityProviderId ||
      userByIdentityProviderId.rowId !== session?.user?.rowId
    )
      throw redirect({ to: "/" });

    return { user: userByIdentityProviderId };
  },
  component: ProfileLayout,
});

function ProfileLayout() {
  return (
    <ProfileSidebar>
      <Outlet />
    </ProfileSidebar>
  );
}

import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { userOptions } from "@/lib/options/users";

export const Route = createFileRoute("/_auth/profile/$userId/_layout")({
  beforeLoad: async ({
    context: { session, queryClient },
    params: { userId },
  }) => {
    const { userByHidraId } = await queryClient.ensureQueryData(
      userOptions({ hidraId: userId }),
    );

    if (!userByHidraId || userByHidraId.rowId !== session?.user?.rowId)
      throw redirect({ to: "/" });

    return { user: userByHidraId };
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

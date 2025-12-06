import { Outlet, createFileRoute } from "@tanstack/react-router";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { userOptions } from "@/lib/options/users";

export const Route = createFileRoute("/_auth/profile/$userId/_layout")({
  beforeLoad: async ({ context: { queryClient }, params: { userId } }) => {
    const { userByHidraId } = await queryClient.ensureQueryData(
      userOptions({ hidraId: userId }),
    );

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

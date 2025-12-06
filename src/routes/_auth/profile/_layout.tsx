import { Outlet, createFileRoute } from "@tanstack/react-router";

import ProfileSidebar from "@/components/profile/ProfileSidebar";

export const Route = createFileRoute("/_auth/profile/_layout")({
  component: ProfileLayout,
});

function ProfileLayout() {
  return (
    <ProfileSidebar>
      <Outlet />
    </ProfileSidebar>
  );
}

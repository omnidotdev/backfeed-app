import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile/_layout")({
  component: ProfileLayout,
});

function ProfileLayout() {
  return <Outlet />;
}

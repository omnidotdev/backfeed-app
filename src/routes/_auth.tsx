import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import NotFound from "@/components/layout/NotFound";
import OrganizationProvider from "@/providers/OrganizationProvider";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context: { session }, location }) => {
    if (!session?.user.rowId) {
      // Preserve the original URL so user can return after login
      throw redirect({
        to: "/",
        search: { returnTo: location.href },
      });
    }
  },
  notFoundComponent: NotFound,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { session } = Route.useRouteContext();

  return (
    <OrganizationProvider organizations={session?.organizations ?? []}>
      <Outlet />
    </OrganizationProvider>
  );
}

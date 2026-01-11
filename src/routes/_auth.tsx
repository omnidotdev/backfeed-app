import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import NotFound from "@/components/layout/NotFound";
import OrganizationProvider from "@/providers/OrganizationProvider";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context: { session } }) => {
    if (!session?.user.rowId) throw redirect({ to: "/" });
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

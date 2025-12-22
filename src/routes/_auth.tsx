import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import NotFound from "@/components/layout/NotFound";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context: { session } }) => {
    if (!session) throw redirect({ to: "/" });

    // detect stale session state where user may exist in the identity provider but not in the database
    if (!session.user.rowId) {
      throw redirect({ to: "/" });
    }
  },
  notFoundComponent: NotFound,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}

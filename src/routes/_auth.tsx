import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import NotFound from "@/components/layout/NotFound";
import { EventsProvider } from "@/providers/EventsProvider";
import OrganizationProvider from "@/providers/OrganizationProvider";

// Noop provider for client-side (main @omnidotdev/providers entry requires Node.js)
const eventsProvider = {
  async emit() {
    return {
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
  },
};

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
    <EventsProvider provider={eventsProvider}>
      <OrganizationProvider organizations={session?.organizations ?? []}>
        <Outlet />
      </OrganizationProvider>
    </EventsProvider>
  );
}

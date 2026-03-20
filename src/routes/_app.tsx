import { Outlet, createFileRoute } from "@tanstack/react-router";

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

/**
 * App route layout.
 *
 * This layout allows both authenticated and unauthenticated access.
 * Routes under this layout render differently based on auth state:
 * - Authenticated: Full features with EventsProvider and OrganizationProvider
 * - Unauthenticated: Read-only view with login prompts
 */
export const Route = createFileRoute("/_app")({
  // No beforeLoad auth check - accessible to all users
  notFoundComponent: () => <NotFound />,
  component: AppLayout,
});

function AppLayout() {
  const { session } = Route.useRouteContext();

  // Wrap with providers if authenticated
  if (session?.user?.rowId) {
    return (
      <EventsProvider provider={eventsProvider}>
        <OrganizationProvider organizations={session?.organizations ?? []}>
          <Outlet />
        </OrganizationProvider>
      </EventsProvider>
    );
  }

  return <Outlet />;
}

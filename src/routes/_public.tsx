import { Outlet, createFileRoute } from "@tanstack/react-router";

import OrganizationProvider from "@/providers/OrganizationProvider";

/**
 * Public route layout.
 *
 * This layout allows both authenticated and unauthenticated access.
 * Routes under this layout render differently based on auth state:
 * - Authenticated: Full features (voting, commenting, etc.)
 * - Unauthenticated: Read-only view with login prompts
 */
export const Route = createFileRoute("/_public")({
  // No beforeLoad auth check - accessible to all users
  component: PublicLayout,
});

function PublicLayout() {
  const { session } = Route.useRouteContext();

  // Wrap with OrganizationProvider if authenticated (for consistency)
  if (session?.user?.rowId) {
    return (
      <OrganizationProvider organizations={session?.organizations ?? []}>
        <Outlet />
      </OrganizationProvider>
    );
  }

  return <Outlet />;
}

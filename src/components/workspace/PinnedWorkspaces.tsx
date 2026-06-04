import { useQueries } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { LuBuilding2, LuPlus } from "react-icons/lu";

import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import app from "@/lib/config/app.config";
import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";

const dashboardRoute = getRouteApi("/_app/dashboard");

/**
 * Pinned workspaces section.
 *
 * Shows the user's organizations from JWT claims. Organizations are managed
 * by Gatekeeper (IDP), not the local database.
 */
const PinnedWorkspaces = () => {
  const { session } = dashboardRoute.useRouteContext();

  // Organizations come from JWT claims, not a local workspace table
  const organizations = session?.organizations ?? [];

  // Fetch project counts for each organization in parallel
  const metricsQueries = useQueries({
    queries: organizations.map((org) =>
      workspaceMetricsOptions({ organizationId: org.id }),
    ),
  });

  // Create a map of organization ID to project count
  const projectCountsByOrgId = organizations.reduce<Record<string, number>>(
    (acc, org, index) => {
      const data = metricsQueries[index]?.data;
      acc[org.id] = data?.projects?.totalCount ?? 0;
      return acc;
    },
    {},
  );

  // Take first 4 organizations to display in 2x2 grid
  const pinnedOrgs = organizations.slice(0, 4);

  if (!pinnedOrgs.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border-subtle border-dashed p-8 text-center">
        <LuBuilding2 className="size-8 text-foreground-subtle" />

        <p className="text-foreground-subtle text-sm">
          {app.dashboardPage.workspaces.emptyState.message}
        </p>

        <a href={AUTH_BASE_URL}>
          <span className="mt-1 flex items-center gap-1.5 font-medium text-foreground text-sm hover:underline">
            <LuPlus className="size-4" />
            Create Organization
          </span>
        </a>
      </div>
    );
  }

  const hasMore = organizations.length > 4;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pinnedOrgs.map((org) => (
          <Link
            key={org.id}
            to="/workspaces/$workspaceSlug"
            params={{ workspaceSlug: org.slug }}
            role="group"
          >
            <WorkspaceCard
              workspace={{
                rowId: org.id,
                name: org.name ?? org.slug,
                slug: org.slug,
                organizationId: org.id,
                type: org.type,
                projects: {
                  totalCount: projectCountsByOrgId[org.id],
                },
              }}
              minH={32}
            />
          </Link>
        ))}

        {pinnedOrgs.length < 4 && (
          <a href={AUTH_BASE_URL}>
            <div className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border border-border-subtle border-dashed p-5 text-center text-foreground-subtle transition-all hover:border-border hover:text-foreground">
              <LuPlus className="size-5" />
              <span className="font-medium text-sm">Add Workspace</span>
              <span className="text-muted-foreground text-xs">
                via Omni Organizations
              </span>
            </div>
          </a>
        )}
      </div>

      {hasMore && session?.user?.identityProviderId && (
        <Link
          to="/profile/$userId/workspaces"
          params={{ userId: session.user.identityProviderId }}
        >
          <span className="flex items-center justify-center gap-1.5 font-medium text-foreground-subtle text-sm hover:text-foreground">
            View all {organizations.length} workspaces
          </span>
        </Link>
      )}
    </div>
  );
};

export default PinnedWorkspaces;

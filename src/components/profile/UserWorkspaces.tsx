import { useQueries } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { LuExternalLink, LuInfo } from "react-icons/lu";

import EmptyState from "@/components/layout/EmptyState";
import WorkspaceListItem from "@/components/workspace/WorkspaceListItem";
import app from "@/lib/config/app.config";
import { AUTH_BASE_URL } from "@/lib/config/env.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";

/**
 * User workspaces list for profile page.
 * Shows workspaces (organizations) the user has access to from JWT claims.
 */
const UserWorkspaces = () => {
  const { session } = useRouteContext({ from: "__root__" });

  // Organizations come from JWT claims, not a database query
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

  if (!organizations.length) {
    return (
      <EmptyState
        message={app.profileWorkspacesPage.table.emptyState.label}
        className="min-h-48"
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {organizations.map((org) => (
        <WorkspaceListItem
          key={org.id}
          workspace={{
            rowId: org.id,
            name: org.name,
            slug: org.slug,
            logo: org.logo,
            projects: {
              totalCount: projectCountsByOrgId[org.id],
            },
          }}
        />
      ))}

      {/* TODO: Implement in-app organization creation once Gatekeeper API supports it */}
      <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-300 border-dashed bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-800">
        <LuInfo className="size-6 text-gray-500" />
        <div className="flex flex-col gap-2">
          <p className="text-gray-700 text-sm dark:text-gray-300">
            Workspaces are currently managed via Omni Organizations.
          </p>
          <p className="text-gray-500 text-xs">
            This experience will be improved soon.
          </p>
        </div>
        <a
          href={AUTH_BASE_URL}
          className="inline-flex items-center gap-2 text-blue-500 text-sm"
        >
          Manage Organizations
          <LuExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
};

export default UserWorkspaces;

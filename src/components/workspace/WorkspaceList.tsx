import { Pagination, Stack } from "@omnidev/sigil";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { useMemo } from "react";

import EmptyState from "@/components/layout/EmptyState";
import WorkspaceListItem from "@/components/workspace/WorkspaceListItem";
import app from "@/lib/config/app.config";

import type { StackProps } from "@omnidev/sigil";

/**
 * Workspace list.
 *
 * Shows organizations from JWT claims. Organizations are managed by
 * Gatekeeper (IDP), not a local workspace table.
 */
const WorkspaceList = (props: StackProps) => {
  const { page, pageSize, search } = useSearch({
    from: "/_public/workspaces/",
  });
  const navigate = useNavigate({ from: "/workspaces" });
  const { session } = useRouteContext({ from: "/_public/workspaces/" });

  // Organizations come from JWT claims
  const organizations = session?.organizations ?? [];

  // Filter by search term if provided
  const filteredOrgs = useMemo(() => {
    if (!search) return organizations;
    const searchLower = search.toLowerCase();
    return organizations.filter(
      (org) =>
        org.name?.toLowerCase().includes(searchLower) ||
        org.slug.toLowerCase().includes(searchLower),
    );
  }, [organizations, search]);

  // Paginate
  const paginatedOrgs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrgs.slice(start, start + pageSize);
  }, [filteredOrgs, page, pageSize]);

  if (!filteredOrgs.length)
    return (
      <EmptyState message={app.workspacesPage.emptyState.message} minH={64} />
    );

  return (
    <Stack align="center" justify="space-between" h="100%" {...props}>
      <Stack w="100%">
        {paginatedOrgs.map((org) => (
          <WorkspaceListItem
            key={org.id}
            workspace={{
              rowId: org.id,
              name: org.name ?? org.slug,
              slug: org.slug,
              organizationId: org.id,
            }}
          />
        ))}
      </Stack>

      <Pagination
        ellipsisProps={{
          display: { base: "none", sm: "flex" },
        }}
        itemProps={{
          display: { base: "none", sm: "flex" },
        }}
        count={filteredOrgs.length}
        pageSize={pageSize}
        defaultPage={page}
        onPageChange={({ page }) =>
          navigate({
            search: (prev) => ({
              ...prev,
              page,
            }),
          })
        }
        mt={4}
      />
    </Stack>
  );
};

export default WorkspaceList;

import { Button, Icon, Stack } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useRouteContext } from "@tanstack/react-router";
import { LuPlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import WorkspaceListItem from "@/components/workspace/WorkspaceListItem";
import { WorkspaceOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { workspacesOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { Workspace } from "@/generated/graphql";

/**
 * User workspaces list for profile page.
 * Shows workspaces the user has access to based on their organization memberships.
 */
const UserWorkspaces = () => {
  const { session } = useRouteContext({
    from: "/_auth/profile/$userId/_layout/workspaces",
  });
  const { organizationIds } = useLoaderData({
    from: "/_auth/profile/$userId/_layout/workspaces",
  });

  // Helper to get org info from session by organizationId
  const getOrgInfo = (organizationId: string) =>
    session?.organizations?.find((org) => org.id === organizationId);

  const { setIsOpen: setIsCreateWorkspaceDialogOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const {
    data: workspaces,
    isLoading,
    isError,
  } = useQuery({
    ...workspacesOptions({
      organizationIds,
      orderBy: [WorkspaceOrderBy.CreatedAtAsc],
    }),
    select: (data) => data.workspaces?.nodes ?? [],
  });

  if (isError) {
    return <ErrorBoundary message="Error fetching workspaces" minH={48} />;
  }

  if (isLoading) {
    return (
      <Stack>
        <SkeletonArray count={3} h={36} borderRadius="sm" />
      </Stack>
    );
  }

  if (!workspaces?.length) {
    return (
      <EmptyState
        message={app.profileWorkspacesPage.table.emptyState.label}
        action={{
          label: "Create Workspace",
          icon: LuPlus,
          onClick: () => setIsCreateWorkspaceDialogOpen(true),
        }}
        minH={48}
      />
    );
  }

  return (
    <Stack gap={4}>
      <Button
        size="sm"
        variant="outline"
        w="fit"
        onClick={() => setIsCreateWorkspaceDialogOpen(true)}
        alignSelf="flex-end"
      >
        <Icon src={LuPlus} /> Create Workspace
      </Button>

      <Stack w="100%">
        {workspaces.map((workspace) => {
          const org = getOrgInfo(workspace?.organizationId!);
          return (
            <WorkspaceListItem
              key={workspace?.rowId}
              workspace={workspace as Partial<Workspace>}
              workspaceName={org?.name}
              workspaceSlug={org?.slug}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default UserWorkspaces;

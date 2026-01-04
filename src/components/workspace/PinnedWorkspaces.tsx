import { Grid } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouteContext } from "@tanstack/react-router";
import { LuBuilding2, LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import SectionContainer from "@/components/layout/SectionContainer";
import { WorkspaceOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { workspacesOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { Workspace } from "@/generated/graphql";

/**
 * Pinned workspaces section.
 */
const PinnedWorkspaces = () => {
  const { session } = useRouteContext({ from: "/_auth/dashboard" });
  const { setIsOpen: setIsCreateWorkspaceDialogOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const {
    data: pinnedWorkspaces,
    isLoading,
    isError,
  } = useQuery({
    ...workspacesOptions({
      pageSize: 3,
      offset: 0,
      orderBy: [WorkspaceOrderBy.MembersCountDesc],
      userId: session?.user.rowId!,
      isMember: true,
    }),
    select: (data) => data?.workspaces?.nodes,
  });

  return (
    <SectionContainer
      title={app.dashboardPage.workspaces.title}
      description={app.dashboardPage.workspaces.description}
      icon={LuBuilding2}
    >
      {isError ? (
        <ErrorBoundary message="Error fetching workspaces" h={48} />
      ) : (
        <Grid
          gap={6}
          columns={{
            base: 1,
            md: isLoading
              ? 3
              : pinnedWorkspaces?.length
                ? Math.min(3, pinnedWorkspaces.length)
                : 1,
          }}
        >
          {isLoading ? (
            <SkeletonArray count={3} h={48} />
          ) : pinnedWorkspaces?.length ? (
            pinnedWorkspaces?.map((workspace) => (
              <Link
                key={workspace?.rowId}
                to="/workspaces/$workspaceSlug"
                params={{ workspaceSlug: workspace?.slug! }}
                role="group"
              >
                <WorkspaceCard workspace={workspace as Partial<Workspace>} />
              </Link>
            ))
          ) : (
            <EmptyState
              message={app.dashboardPage.workspaces.emptyState.message}
              action={{
                label: app.dashboardPage.workspaces.emptyState.cta.label,
                onClick: () => setIsCreateWorkspaceDialogOpen(true),
                icon: LuCirclePlus,
              }}
              h={48}
            />
          )}
        </Grid>
      )}
    </SectionContainer>
  );
};

export default PinnedWorkspaces;

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import WorkspaceListItem from "@/components/workspace/WorkspaceListItem";
import { WorkspaceOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { workspacesOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { StackProps } from "@omnidev/sigil";
import type { Workspace } from "@/generated/graphql";

/**
 * Workspace list.
 */
const WorkspaceList = (props: StackProps) => {
  const { session } = useRouteContext({ from: "__root__" });
  const { page, pageSize } = useSearch({
    from: "/_public/workspaces/",
  });
  const navigate = useNavigate({ from: "/workspaces" });

  // Helper to get org info from session by organizationId
  const getOrgInfo = (organizationId: string) =>
    session?.organizations?.find((org) => org.id === organizationId);

  const { setIsOpen: setIsCreateWorkspaceDialogOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const { data, isLoading, isError } = useQuery({
    ...workspacesOptions({
      pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [WorkspaceOrderBy.MembersCountDesc],
      isMember: false,
    }),
    placeholderData: keepPreviousData,
    select: (data) => ({
      totalCount: data?.workspaces?.totalCount,
      workspaces: data?.workspaces?.nodes,
    }),
  });

  const workspaces = data?.workspaces;

  if (isError)
    return <ErrorBoundary message="Error fetching workspaces" minH={48} />;

  if (isLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={36} borderRadius="sm" />
      </Stack>
    );

  if (!workspaces?.length)
    return (
      <EmptyState
        message={app.workspacesPage.emptyState.message}
        action={{
          label: app.workspacesPage.emptyState.cta.label,
          icon: LuCirclePlus,
          onClick: () => setIsCreateWorkspaceDialogOpen(true),
        }}
        minH={64}
      />
    );

  return (
    <Stack align="center" justify="space-between" h="100%" {...props}>
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

      <Pagination
        ellipsisProps={{
          display: { base: "none", sm: "flex" },
        }}
        itemProps={{
          display: { base: "none", sm: "flex" },
        }}
        count={data?.totalCount ?? 0}
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

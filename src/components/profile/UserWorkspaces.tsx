import { Box, Button, Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LuPlus } from "react-icons/lu";

import DataTable from "@/components/core/DataTable";
import SubscriptionActions from "@/components/profile/SubscriptionActions";
import { Role, Tier, WorkspaceOrderBy } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import { workspacesOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { WorkspaceFragment } from "@/generated/graphql";

export type WorkspaceRow = WorkspaceFragment & { workspaceName?: string };

const columnHelper = createColumnHelper<WorkspaceRow>();

const UserWorkspaces = () => {
  const { user, session } = useRouteContext({
    from: "/_auth/profile/$userId/_layout/workspaces",
  });

  // Helper to get org name from session by organizationId
  const getOrgName = (organizationId: string) =>
    session?.organizations?.find((org) => org.id === organizationId)?.name;

  const columns = [
    columnHelper.display({
      id: "workspace_actions",
      header: "Actions",
      cell: ({ row }) => <SubscriptionActions workspace={row.original} />,
      meta: {
        tableCellProps: {
          pr: 0,
          style: {
            width: token("sizes.20"),
          },
        },
        headerProps: {
          justify: "center",
        },
      },
    }),
    columnHelper.display({
      id: "name",
      header: "Name",
      cell: ({ row }) =>
        getOrgName(row.original.organizationId) ?? row.original.organizationId,
    }),
    columnHelper.accessor("tier", {
      header: "Tier",
      cell: (info) => capitalizeFirstLetter(info.getValue()),
    }),
    columnHelper.display({
      id: "subscription_status",
      header: "Status",
      cell: ({ row }) => {
        const isFreeTier = row.original.tier === Tier.Free;
        const hasSubscription = !!row.original.subscriptionId;

        if (isFreeTier) return "-";

        return (
          <HStack>
            <Box
              h={2}
              w={2}
              rounded="full"
              bgColor={hasSubscription ? "green" : "gray"}
            />
            <Text>{hasSubscription ? "Active" : "Inactive"}</Text>
          </HStack>
        );
      },
    }),
  ];

  const { data: workspaces } = useQuery({
    ...workspacesOptions({
      userId: user?.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: WorkspaceOrderBy.CreatedAtAsc,
    }),
    select: (data) =>
      data.workspaces?.nodes?.map((workspace) => workspace!) ?? [],
  });

  const { setIsOpen: setIsCreateWorkspaceDialogOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const table = useReactTable({
    columns,
    data: workspaces ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!workspaces?.length)
    return (
      <Stack gap={8}>
        {app.profileWorkspacesPage.table.emptyState.label}
        <Button w="fit" onClick={() => setIsCreateWorkspaceDialogOpen(true)}>
          <Icon src={LuPlus} /> Create Workspace
        </Button>
      </Stack>
    );

  return (
    <Stack>
      <Button
        size="sm"
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10"
        w="fit"
        onClick={() => setIsCreateWorkspaceDialogOpen(true)}
        alignSelf="flex-end"
      >
        <Icon src={LuPlus} /> Create Workspace
      </Button>
      <Flex w="100%" overflowX="auto">
        <DataTable table={table} />
      </Flex>
    </Stack>
  );
};

export default UserWorkspaces;

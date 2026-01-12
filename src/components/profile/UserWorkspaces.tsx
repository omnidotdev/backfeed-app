import { Box, Button, Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useRouteContext } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { LuPlus } from "react-icons/lu";
import { P, match } from "ts-pattern";

import DataTable from "@/components/core/DataTable";
import SubscriptionActions from "@/components/profile/SubscriptionActions";
import { Role, Tier, WorkspaceOrderBy } from "@/generated/graphql";
import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import { workspacesOptions } from "@/lib/options/workspaces";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type Stripe from "stripe";
import type { WorkspaceFragment } from "@/generated/graphql";

export interface WorkspaceRow extends WorkspaceFragment {
  subscription: {
    subscriptionStatus: Stripe.Subscription.Status;
    toBeCanceled: boolean;
    currentPeriodEnd: number | null | undefined;
  };
}

const columnHelper = createColumnHelper<WorkspaceRow>();

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
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tier", {
    header: "Tier",
    cell: (info) => capitalizeFirstLetter(info.getValue()),
  }),
  columnHelper.accessor("subscription.subscriptionStatus", {
    header: "Subscription Status",
    cell: (info) => {
      const isFreeTier = info.row.original.tier === Tier.Free;

      if (isFreeTier) return "-";

      const toBeCanceled = info.row.original.subscription.toBeCanceled;

      const color = match({
        status: info.getValue(),
        toBeCanceled,
      })
        .with({ status: "active", toBeCanceled: true }, () => "yellow")
        .with({ status: "active" }, () => "green")
        .with(
          {
            status: P.union("past_due", "unpaid", "canceled"),
          },
          () => "red",
        )
        .otherwise(() => "gray");

      return (
        <HStack>
          <Box h={2} w={2} rounded="full" bgColor={color} />
          <Text>
            {toBeCanceled
              ? "To Be Canceled"
              : info
                  .getValue()
                  .split("_")
                  .map((word) => capitalizeFirstLetter(word))
                  .join(" ")}
          </Text>
        </HStack>
      );
    },
  }),
  columnHelper.accessor("subscription.currentPeriodEnd", {
    header: "Renewal Date",
    cell: (info) =>
      info.getValue() && !info.row.original.subscription.toBeCanceled
        ? dayjs.unix(info.getValue()!).format("MM/DD/YYYY")
        : "-",
  }),
];

const UserWorkspaces = () => {
  const { user } = useRouteContext({
    from: "/_auth/profile/$userId/_layout/workspaces",
  });
  const { subscriptions } = useLoaderData({
    from: "/_auth/profile/$userId/_layout/workspaces",
  });

  const { data: workspaces } = useQuery({
    ...workspacesOptions({
      userId: user?.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: WorkspaceOrderBy.CreatedAtAsc,
    }),
    select: (data) =>
      data.workspaces?.nodes?.map((workspace) => {
        const currentSubscription = subscriptions?.find(
          (sub) => sub.id === workspace?.subscriptionId,
        );

        if (!currentSubscription) {
          return {
            ...workspace!,
            subscription: {
              subscriptionStatus: "incomplete" as Stripe.Subscription.Status,
              toBeCanceled: false,
              currentPeriodEnd: null,
            },
          };
        }

        return {
          ...workspace!,
          subscription: currentSubscription,
        };
      }) ?? [],
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

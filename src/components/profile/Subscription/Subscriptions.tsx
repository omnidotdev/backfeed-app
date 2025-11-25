"use client";

import { Box, Button, Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { LuPlus } from "react-icons/lu";
import { P, match } from "ts-pattern";

import DataTable from "components/core/DataTable/DataTable";
import { SubscriptionActions } from "components/profile";
import {
  OrganizationOrderBy,
  Role,
  Tier,
  useOrganizationsQuery,
} from "generated/graphql";
import { token } from "generated/panda/tokens";
import { app } from "lib/config";
import { useDialogStore } from "lib/hooks/store";
import { capitalizeFirstLetter } from "lib/util";
import { DialogType } from "store";

import type { OrganizationFragment } from "generated/graphql";
import type { Session } from "next-auth";
import type Stripe from "stripe";

export interface OrganizationRow extends OrganizationFragment {
  subscriptionStatus: Stripe.Subscription.Status;
  toBeCanceled: boolean;
  currentPeriodEnd: number | null | undefined;
}

const columnHelper = createColumnHelper<OrganizationRow>();

const columns = [
  columnHelper.display({
    id: "organization_actions",
    header: "Actions",
    cell: ({ row }) => <SubscriptionActions organization={row.original} />,
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
  columnHelper.accessor("subscriptionStatus", {
    header: "Subscription Status",
    cell: (info) => {
      const isFreeTier = info.row.original.tier === Tier.Free;

      if (isFreeTier) return "-";

      const toBeCanceled = info.row.original.toBeCanceled;

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
  columnHelper.accessor("currentPeriodEnd", {
    header: "Renewal Date",
    cell: (info) =>
      info.getValue() && !info.row.original.toBeCanceled
        ? dayjs.unix(info.getValue()!).format("MM/DD/YYYY")
        : "-",
  }),
];

export interface CustomerState extends Omit<Stripe.Customer, "subscriptions"> {
  subscriptions: Stripe.Subscription[];
}

interface Props {
  /** User details. */
  user: Session["user"];
  /** Customer details. */
  customer?: CustomerState;
}

/**
 * Details of the user's subscriptions.
 */
const Subscription = ({ user, customer }: Props) => {
  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user?.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
      orderBy: OrganizationOrderBy.CreatedAtAsc,
    },
    {
      select: (data) =>
        data.organizations?.nodes?.map((org) => {
          const currentSubscription = customer?.subscriptions?.find(
            (sub) => sub.id === org?.subscriptionId,
          );

          if (!currentSubscription) {
            return {
              ...org!,
              subscriptionStatus: "incomplete" as Stripe.Subscription.Status,
              toBeCanceled: false,
              currentPeriodEnd: null,
            };
          }

          return {
            ...org!,
            subscriptionStatus: currentSubscription.status,
            toBeCanceled: !!currentSubscription.cancel_at,
            currentPeriodEnd:
              currentSubscription?.items.data[0].current_period_end,
          };
        }) ?? [],
    },
  );

  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const table = useReactTable({
    columns,
    data: organizations ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!organizations?.length)
    return (
      <Stack gap={8}>
        {app.profileOrganizationsPage.table.emptyState.label}
        <Button w="fit" onClick={() => setIsCreateOrganizationDialogOpen(true)}>
          <Icon src={LuPlus} /> Create Organization
        </Button>
      </Stack>
    );

  return (
    <Flex w="100%" overflowX="auto">
      <DataTable table={table} />
    </Flex>
  );
};

export default Subscription;

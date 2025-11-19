"use client";

import { Box, Button, Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import { P, match } from "ts-pattern";

import DataTable from "components/core/DataTable/DataTable";
import { SubscriptionActions } from "components/profile";
import {
  OrganizationOrderBy,
  Role,
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
  currentPeriodEnd: Date | null | undefined;
}

const columnHelper = createColumnHelper<OrganizationRow>();

export interface CustomerState {
  id: string;
  subscriptions: Stripe.Subscription[];
  // TODO: fix or remove if no longer needed
  paymentMethods: string[];
}

interface Props {
  /** User details. */
  user: Session["user"];
  /** List of available backfeed products. */
  products: Stripe.Product[];
  /** Customer details. */
  customer?: CustomerState;
}

/**
 * Details of the user's subscriptions.
 */
const Subscription = ({ user, products, customer }: Props) => {
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

          return {
            ...org!,
            subscriptionStatus: currentSubscription?.status ?? "incomplete",
            toBeCanceled: currentSubscription?.cancel_at_period_end ?? false,
            currentPeriodEnd:
              currentSubscription?.items.data[0].price.unit_amount === 0
                ? null
                : new Date(
                    currentSubscription?.items.data[0].current_period_end! *
                      1000,
                  ),
          };
        }) ?? [],
    },
  );

  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "organization_actions",
        header: "Actions",
        cell: ({ row }) => (
          <SubscriptionActions
            products={products}
            customer={customer}
            organization={row.original}
          />
        ),
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
          info.getValue() && info.row.original.subscriptionStatus !== "canceled"
            ? dayjs(info.getValue()).format("MM/DD/YYYY")
            : "-",
      }),
    ],
    [products, customer],
  );

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

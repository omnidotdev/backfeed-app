"use client";

import { Box, Button, Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { SubscriptionStatus } from "@polar-sh/sdk/models/components/subscriptionstatus.js";
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

import type { CustomerPaymentMethod } from "@polar-sh/sdk/models/components/customerpaymentmethod.js";
import type { Product } from "@polar-sh/sdk/models/components/product.js";
import type { Subscription as SubscriptionInterface } from "@polar-sh/sdk/models/components/subscription.js";
import type { OrganizationFragment } from "generated/graphql";
import type { Session } from "next-auth";

export interface OrganizationRow extends OrganizationFragment {
  subscriptionStatus: SubscriptionStatus;
  toBeCanceled: boolean;
  currentPeriodEnd: Date | null | undefined;
}

const columnHelper = createColumnHelper<OrganizationRow>();

export interface CustomerState {
  id: string;
  subscriptions: SubscriptionInterface[];
  paymentMethods: CustomerPaymentMethod[];
}

interface Props {
  /** User details. */
  user: Session["user"];
  /** List of available backfeed products. */
  products: Product[];
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
            subscriptionStatus:
              currentSubscription?.status ?? SubscriptionStatus.Incomplete,
            toBeCanceled: currentSubscription?.cancelAtPeriodEnd ?? false,
            currentPeriodEnd:
              currentSubscription?.prices[0]?.amountType === "free"
                ? null
                : currentSubscription?.currentPeriodEnd,
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
            .with(
              { status: SubscriptionStatus.Active, toBeCanceled: true },
              () => "yellow",
            )
            .with({ status: SubscriptionStatus.Active }, () => "green")
            .with(
              {
                status: P.union(
                  SubscriptionStatus.PastDue,
                  SubscriptionStatus.Unpaid,
                  SubscriptionStatus.Canceled,
                ),
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
          info.getValue() &&
          info.row.original.subscriptionStatus !== SubscriptionStatus.Canceled
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

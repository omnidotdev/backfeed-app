"use client";

import { Box, Button, Flex, HStack, Stack, Text } from "@omnidev/sigil";
import { SubscriptionStatus } from "@polar-sh/sdk/models/components/subscriptionstatus.js";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
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
import { capitalizeFirstLetter } from "lib/util";

import type { Product } from "@polar-sh/sdk/models/components/product.js";
import type { Subscription as SubscriptionInterface } from "@polar-sh/sdk/models/components/subscription.js";
import type { OrganizationFragment } from "generated/graphql";
import type { Session } from "next-auth";

const columnHelper = createColumnHelper<
  OrganizationFragment & { status: SubscriptionStatus }
>();

export interface CustomerState {
  id: string;
  subscriptions: SubscriptionInterface[];
  defaultPaymentMethodId?: string | null | undefined;
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
        data.organizations?.nodes?.map((o) => ({
          ...o!,
          status:
            customer?.subscriptions.find((s) => s.id === o?.subscriptionId)
              ?.status ?? SubscriptionStatus.Incomplete,
        })) ?? [],
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("tier", {
        header: "Subscription Tier",
        cell: (info) => capitalizeFirstLetter(info.getValue()),
      }),
      columnHelper.accessor("status", {
        header: "Subscription Status",
        cell: (info) => {
          const color = match(info.getValue())
            .with(SubscriptionStatus.Active, () => "green")
            .with(
              P.union(SubscriptionStatus.Unpaid, SubscriptionStatus.PastDue),
              () => "red",
            )
            .with(SubscriptionStatus.Canceled, () => "yellow")
            .otherwise(() => "gray");

          return (
            <HStack>
              <Box h={2} w={2} rounded="full" bgColor={color} />
              <Text>
                {info
                  .getValue()
                  .split("_")
                  .map((word) => capitalizeFirstLetter(word))
                  .join(" ")}
              </Text>
            </HStack>
          );
        },
      }),
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
      <Stack>
        {app.profileSubscriptionsPage.table.emptyState.label}
        <Flex>
          <Link href="/pricing">
            <Button>
              {app.profileSubscriptionsPage.table.actions.subscribe.label}
            </Button>
          </Link>
        </Flex>
      </Stack>
    );

  return (
    <Flex w="100%" overflowX="auto">
      <DataTable table={table} />
    </Flex>
  );
};

export default Subscription;

"use client";

import { Button, Flex, Stack } from "@omnidev/sigil";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { match } from "ts-pattern";

import DataTable from "components/core/DataTable/DataTable";
import { Role, Tier, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { capitalizeFirstLetter } from "lib/util";

import type { Subscription as SubscriptionInterface } from "@polar-sh/sdk/models/components/subscription.js";
import type { OrganizationFragment } from "generated/graphql";
import type { Session } from "next-auth";

const columnHelper = createColumnHelper<OrganizationFragment>();

interface CustomerState {
  id: string;
  subscriptions: SubscriptionInterface[];
  defaultPaymentMethodId?: string | null | undefined;
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
    },
    {
      select: (data) => data.organizations?.nodes?.map((o) => o!) ?? [],
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
      columnHelper.display({
        id: "organization_actions",
        header: "Actions",
        cell: ({ row }) => {
          const tier = row.original.tier;

          // TODO: Handlers for managing workspace subscriptions
          return match(tier)
            .with(Tier.Free, () => (
              <Button size="sm" disabled={!customer?.defaultPaymentMethodId}>
                Upgrade
              </Button>
            ))
            .with(Tier.Basic, () => <Button size="sm">Upgrade</Button>)
            .with(Tier.Team, () => <Button size="sm">Upgrade</Button>)
            .with(Tier.Enterprise, () => <Button size="sm">Manage</Button>)
            .exhaustive();
        },
        meta: {
          tableCellProps: {
            pr: 0,
            textAlign: "right",
          },
          headerProps: {
            justify: "end",
          },
        },
      }),
    ],
    [customer?.defaultPaymentMethodId],
  );

  const table = useReactTable({
    columns,
    data: organizations ?? [],
    getCoreRowModel: getCoreRowModel(),
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

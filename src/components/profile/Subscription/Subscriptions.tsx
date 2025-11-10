"use client";

import { Button, Flex, Skeleton, Stack } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";
import { match } from "ts-pattern";

import DataTable from "components/core/DataTable/DataTable";
import { Role, Tier, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { subscriptionOptions } from "lib/options";
import { capitalizeFirstLetter } from "lib/util";

import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate";
import type { OrganizationFragment } from "generated/graphql";
import type { Session } from "next-auth";

const columnHelper = createColumnHelper<OrganizationFragment>();

const columns = [
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
        .with(Tier.Free, () => <Button size="sm">Upgrade</Button>)
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
];

interface Props {
  /** Customer details. */
  customer: PromiseSettledResult<CustomerState>;
  /** User details. */
  user: Session["user"];
}

/**
 * Details of the user's subscriptions.
 */
const Subscription = ({ customer, user }: Props) => {
  const { userId: hidraId } = useParams<{ userId: string }>();

  const {
    data: subscriptions,
    error,
    // NB: although the query is prefetched, if the customer exists but their subscription is not `active`, an error will be thrown. This puts the query into a loading state initially.
    // The above does not effect the rendering when a user does have an active subscription, in that case the data should be instantly available upon render, and `isLoading` should be `false`.
    isLoading,
  } = useQuery(
    subscriptionOptions({
      hidraId,
      enabled: customer.status !== "rejected",
    }),
  );

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user?.rowId!,
      excludeRoles: [Role.Member, Role.Admin],
    },
    {
      select: (data) => data.organizations?.nodes?.map((o) => o!) ?? [],
    },
  );

  const table = useReactTable({
    columns,
    data: organizations ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Skeleton h={18} m={4} />;

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

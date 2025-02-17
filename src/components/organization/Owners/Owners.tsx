"use client";

import {
  Badge,
  Stack,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "@omnidev/sigil";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { AddOwner } from "components/organization";
import { Role, useMembersQuery } from "generated/graphql";
import { useAuth, useOrganizationMembership } from "lib/hooks";

import type { MemberFragment } from "generated/graphql";

const columnHelper = createColumnHelper<MemberFragment>();

const columns = [
  columnHelper.accessor("rowId", {
    header: "Owners",
    cell: ({ row }) => (
      <Stack py={4}>
        <Text fontSize="lg" fontWeight="medium">
          {row.original.user?.firstName} {row.original.user?.lastName}
        </Text>
        <Text color="foreground.subtle" fontWeight="medium">
          {row.original.user?.username}
        </Text>
      </Stack>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => (
      <Badge
        w={18}
        justifyContent="center"
        bgColor="brand.primary"
        borderColor="brand.primary"
        color="background.default"
        fontWeight="semibold"
      >
        {info.getValue().toUpperCase()}
      </Badge>
    ),
  }),
];

interface Props {
  /** Organization ID. */
  organizationId: string;
}

const Owners = ({ organizationId }: Props) => {
  const { user } = useAuth();

  const { isOwner } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const { data: owners } = useMembersQuery(
    { organizationId, roles: [Role.Owner] },
    {
      select: (data) => data.members?.nodes,
    }
  );

  const table = useReactTable({
    data: owners as MemberFragment[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack mb={12}>
      <Table
        headerContent={table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} bgColor="background.subtle">
            {headerGroup.headers.map((header) => (
              <TableHeader key={header.id} fontWeight="bold">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      >
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} fontWeight="light">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
      {isOwner && <AddOwner organizationId={organizationId} />}
    </Stack>
  );
};

export default Owners;

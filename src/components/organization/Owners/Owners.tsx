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

import { Role, useMembersQuery } from "generated/graphql";
import { app } from "lib/config";
import { capitalizeFirstLetter } from "lib/util";

import type { MemberFragment } from "generated/graphql";

const columnHelper = createColumnHelper<MemberFragment>();

const columns = [
  columnHelper.accessor("rowId", {
    header: app.organizationMembersPage.ownersTable.headers.owners,
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
    header: app.organizationMembersPage.ownersTable.headers.role,
    cell: (info) => (
      <Badge
        variant="outline"
        w={18}
        justifyContent="center"
        color="brand.primary"
        borderColor="brand.primary"
        fontWeight="semibold"
      >
        {capitalizeFirstLetter(info.getValue())}
      </Badge>
    ),
  }),
];

interface Props {
  /** Organization ID. */
  organizationId: string;
}

/**
 * Organization owners table.
 */
const Owners = ({ organizationId }: Props) => {
  const { data: owners } = useMembersQuery(
    { organizationId, roles: [Role.Owner] },
    {
      select: (data) => data.members?.nodes,
    },
  );

  const table = useReactTable({
    data: owners as MemberFragment[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table
      headerContent={table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} bgColor="background.subtle">
          {headerGroup.headers.map((header) => (
            <TableHeader key={header.id} fontWeight="bold">
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHeader>
          ))}
        </TableRow>
      ))}
      mb={2}
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
  );
};

export default Owners;

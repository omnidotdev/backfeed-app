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

import { Role } from "generated/graphql";
import { capitalizeFirstLetter } from "lib/util";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { MemberFragment } from "generated/graphql";
import { membersQueryOptions } from "lib/react-query/options";

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
  const { data: owners } = useSuspenseQuery(
    membersQueryOptions({ organizationId, roles: [Role.Owner] })
  );

  const table = useReactTable({
    data: owners as MemberFragment[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!owners.length) return null;

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
                    header.getContext()
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

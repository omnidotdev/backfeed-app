"use client";

import {
  Checkbox,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@omnidev/sigil";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { useMembersQuery } from "generated/graphql";

import type { RowSelectionState } from "@tanstack/react-table";
import type { MemberFragment } from "generated/graphql";

interface Props {
  /** Organization ID. */
  organizationId: string;
}

const columnHelper = createColumnHelper<MemberFragment>();

const columns = [
  columnHelper.accessor("rowId", {
    header: ({ table }) => (
      <Checkbox
        size="sm"
        checked={
          table.getIsAllRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={({ checked }) =>
          table.toggleAllRowsSelected(checked as boolean)
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        size="sm"
        checked={row.getIsSelected()}
        onCheckedChange={({ checked }) =>
          row.toggleSelected(checked as boolean)
        }
      />
    ),
  }),
  columnHelper.accessor("user.username", {
    header: "Username",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => info.getValue(),
  }),
];

const Members = ({ organizationId }: Props) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data: members } = useMembersQuery(
    { organizationId },
    {
      select: (data) => data.members?.nodes,
    }
  );

  const table = useReactTable({
    data: (members as MemberFragment[]) || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.rowId,
    state: {
      rowSelection,
    },
  });

  return (
    <Table
      headerContent={table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
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
  );
};

export default Members;

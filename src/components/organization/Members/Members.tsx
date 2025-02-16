"use client";

import {
  Badge,
  Checkbox,
  Stack,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { MembershipMenu } from "components/organization";
import { Role, useMembersQuery } from "generated/graphql";
import { useDebounceValue, useSearchParams } from "lib/hooks";

import type { RowSelectionState } from "@tanstack/react-table";
import type { MemberFragment } from "generated/graphql";
import { match } from "ts-pattern";

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
        // explicit width to prevent CLS with row selection
        w={28}
        // Prevent spacing between checkbox and label. See note for label `onClick` handler below
        gap={0}
        labelProps={{
          flex: 1,
          px: 4,
          fontWeight: "bold",
          // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
          onClick: (e) => e.preventDefault(),
        }}
        label={
          table.getIsAllRowsSelected() || table.getIsSomeRowsSelected() ? (
            <MembershipMenu selectedRows={table.getSelectedRowModel().rows} />
          ) : (
            "Members"
          )
        }
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
        labelProps={{
          px: 2,
        }}
        label={
          <Stack py={4}>
            <Text fontSize="lg">
              {row.original.user?.firstName} {row.original.user?.lastName}
            </Text>
            <Text color="foreground.subtle">{row.original.user?.username}</Text>
          </Stack>
        }
        checked={row.getIsSelected()}
        onCheckedChange={({ checked }) =>
          row.toggleSelected(checked as boolean)
        }
      />
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => {
      const accentColor = match(info.getValue())
        .with(Role.Owner, () => "brand.primary")
        .with(Role.Admin, () => "brand.secondary")
        .with(Role.Member, () => "brand.tertiary")
        .exhaustive();

      return (
        <Badge bgColor={accentColor} borderColor={accentColor} color="white">
          {info.getValue().toUpperCase()}
        </Badge>
      );
    },
  }),
];

const Members = ({ organizationId }: Props) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [{ roles, search }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const { data: members } = useMembersQuery(
    { organizationId, roles: roles ?? undefined, search: debouncedSearch },
    {
      placeholderData: keepPreviousData,
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
  );
};

export default Members;

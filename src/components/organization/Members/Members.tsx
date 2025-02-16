"use client";

import {
  Button,
  Checkbox,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
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
import { LuChevronDown } from "react-icons/lu";

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
        // explicit width to prevent CLS with row selection
        w={28}
        // Prevent spacing between checkbox and label. See note for label `onClick` handler below
        gap={0}
        labelProps={{
          flex: 1,
          px: 4,
          // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
          onClick: (e) => e.preventDefault(),
        }}
        label={
          table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
            <Menu
              trigger={
                <Button size="sm" variant="outline">
                  {`${table.getSelectedRowModel().rows.length} Selected`}
                  <Icon src={LuChevronDown} />
                </Button>
              }
            >
              <MenuItemGroup>
                <MenuItem value="admin">
                  Give administrative privileges
                </MenuItem>
                <MenuItem value="remove" color="red">
                  Remove from organization
                </MenuItem>
              </MenuItemGroup>
            </Menu>
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

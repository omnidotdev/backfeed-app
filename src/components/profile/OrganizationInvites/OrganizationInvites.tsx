"use client";

import {
  Checkbox,
  Skeleton,
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
import { InvitationMenu } from "components/profile";
import dayjs from "dayjs";
import { useInvitationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useMemo } from "react";

import type { InvitationFragment } from "generated/graphql";

const columnHelper = createColumnHelper<InvitationFragment>();

interface Props {
  /** User's email address to fetch invitations. */
  email: string;
}

/**
 * User's organization invitations table.
 */
const OrganizationInvites = ({ email }: Props) => {
  const {
    data: invitations,
    error,
    isLoading,
  } = useInvitationsQuery(
    { email },
    {
      select: (data) => data.invitations?.nodes,
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("rowId", {
        header: ({ table }) => (
          <Checkbox
            size="sm"
            // explicit width to prevent CLS with row selection
            w={48}
            // Prevent spacing between checkbox and label. See note for label `onClick` handler below
            gap={0}
            labelProps={{
              px: 4,
              fontWeight: "bold",
              // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
              onClick: (e) => e.preventDefault(),
            }}
            label={
              table.getIsAllRowsSelected() || table.getIsSomeRowsSelected() ? (
                <InvitationMenu
                  selectedRows={table.getSelectedRowModel().rows}
                  toggleRowSelection={table.toggleAllRowsSelected}
                />
              ) : (
                app.profileInvitationsPage.table.headers.organizationName
              )
            }
            // @ts-expect-error TODO: Update Sigil component to remove required `src` prop
            iconProps={{
              style: {
                // TODO: Update Sigil component to support icon toggling in checkbox
                pointerEvents: "none",
              },
            }}
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
            gap={4}
            labelProps={{
              fontWeight: "bold",
              // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
              onClick: (e) => e.preventDefault(),
            }}
            // @ts-expect-error TODO: Update Sigil component to remove required `src` prop
            iconProps={{
              style: {
                // TODO: Update Sigil component to support icon toggling in checkbox
                pointerEvents: "none",
              },
            }}
            label={row.original.organization?.name}
            checked={row.getIsSelected()}
            onCheckedChange={({ checked }) =>
              row.toggleSelected(checked as boolean)
            }
          />
        ),
      }),

      columnHelper.accessor("createdAt", {
        header: app.profileInvitationsPage.table.headers.invitationDate,
        cell: ({ cell }) => dayjs(cell.getValue()).format("M/D/YYYY"),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: invitations as InvitationFragment[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Skeleton h={18} m={4} />;

  if (error || !invitations?.length)
    return app.profileInvitationsPage.table.emptyState.label;

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

export default OrganizationInvites;

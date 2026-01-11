import {
  Checkbox,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@omnidev/sigil";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";

import InvitationMenu from "@/components/workspace/InvitationMenu";
import app from "@/lib/config/app.config";
import { invitationsOptions } from "@/lib/options/invitations";

import type { InvitationFragment } from "@/generated/graphql";

const columnHelper = createColumnHelper<InvitationFragment>();

const workspaceInviteDetails = app.workspaceInvitationsPage;

/**
 * Workspace invitations table.
 */
const Invitations = () => {
  const { isOwner, workspaceId } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage/invitations",
  });

  const { data: invitations } = useQuery({
    ...invitationsOptions({
      workspaceId,
    }),
    placeholderData: keepPreviousData,
    select: (data) => data.invitations?.nodes ?? [],
  });

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
                workspaceInviteDetails.invitationsTable.headers.email
              )
            }
            controlProps={{
              display: isOwner ? "flex" : "none",
            }}
            disabled={!isOwner}
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
            controlProps={{
              display: isOwner ? "flex" : "none",
            }}
            disabled={!isOwner}
            label={row.original.email}
            checked={row.getIsSelected()}
            onCheckedChange={({ checked }) =>
              row.toggleSelected(checked as boolean)
            }
          />
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: workspaceInviteDetails.invitationsTable.headers.invitationDate,
        cell: ({ cell }) => dayjs(cell.getValue()).format("M/D/YYYY"),
      }),
    ],
    [isOwner],
  );

  const table = useReactTable({
    data: (invitations as InvitationFragment[]) ?? [],
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

export default Invitations;

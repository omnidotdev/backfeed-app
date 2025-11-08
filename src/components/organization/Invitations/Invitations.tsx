"use client";

import {
  Checkbox,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";

import { InvitationMenu } from "components/organization";
import { useInvitationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";

import type { InvitationFragment, Organization } from "generated/graphql";
import type { Session } from "next-auth";

const columnHelper = createColumnHelper<InvitationFragment>();

const organizationInviteDetails = app.organizationInvitationsPage;

interface Props {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Organization ID. */
  organizationId: Organization["rowId"];
}

/**
 * Organization invitations table.
 */
const Invitations = ({ user, organizationId }: Props) => {
  const { isOwner } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const { data: invitations } = useInvitationsQuery(
    {
      organizationId,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => data.invitations?.nodes ?? [],
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
                  organizationId={organizationId}
                  selectedRows={table.getSelectedRowModel().rows}
                  toggleRowSelection={table.toggleAllRowsSelected}
                />
              ) : (
                organizationInviteDetails.invitationsTable.headers.email
              )
            }
            controlProps={{
              display: isOwner ? "flex" : "none",
            }}
            disabled={!isOwner}
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
            controlProps={{
              display: isOwner ? "flex" : "none",
            }}
            disabled={!isOwner}
            // @ts-expect-error TODO: Update Sigil component to remove required `src` prop
            iconProps={{
              style: {
                // TODO: Update Sigil component to support icon toggling in checkbox
                pointerEvents: "none",
              },
            }}
            label={row.original.email}
            checked={row.getIsSelected()}
            onCheckedChange={({ checked }) =>
              row.toggleSelected(checked as boolean)
            }
          />
        ),
      }),
      columnHelper.accessor("createdAt", {
        header:
          organizationInviteDetails.invitationsTable.headers.invitationDate,
        cell: ({ cell }) => dayjs(cell.getValue()).format("M/D/YYYY"),
      }),
    ],
    [isOwner, organizationId],
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

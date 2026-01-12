import {
  Checkbox,
  Skeleton,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";

import InvitationMenu from "@/components/profile/InvitationMenu";
import app from "@/lib/config/app.config";
import { invitationsOptions } from "@/lib/options/invitations";

import type { InvitationFragment } from "@/generated/graphql";

const columnHelper = createColumnHelper<InvitationFragment>();

/**
 * User's workspace invitations table.
 */
const WorkspaceInvites = () => {
  const { user, session } = useRouteContext({
    from: "/_auth/profile/$userId/_layout/invitations",
  });

  // Helper to get org name from session by organizationId
  const getOrgName = (organizationId: string) =>
    session?.organizations?.find((org) => org.id === organizationId)?.name;

  const columns = [
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
              app.profileInvitationsPage.table.headers.workspaceName
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
          gap={4}
          labelProps={{
            fontWeight: "bold",
            // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
            onClick: (e) => e.preventDefault(),
          }}
          label={
            getOrgName(row.original.workspace?.organizationId!) ?? "Workspace"
          }
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
  ];

  const {
    data: invitations,
    error,
    isLoading,
  } = useQuery({
    ...invitationsOptions({ email: user?.email! }),
    enabled: !!user?.email,
    select: (data) => data.invitations?.nodes,
  });

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

export default WorkspaceInvites;

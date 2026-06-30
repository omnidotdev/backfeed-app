import { Badge } from "@omnidotdev/thornberry/badge";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { match } from "ts-pattern";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MembershipMenu from "@/components/workspace/MembershipMenu";
import app from "@/lib/config/app.config";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { IdpMember } from "@/lib/idp";

const membersRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/members",
);

const columnHelper = createColumnHelper<IdpMember>();

/**
 * Workspace members table.
 * Fetches member data from IDP (single source of truth).
 */
const Members = () => {
  const { isOwner, organizationId, session } = membersRoute.useRouteContext();

  const { data: membersData } = useQuery({
    ...organizationMembersOptions({
      organizationId: organizationId!,
      accessToken: session?.accessToken!,
    }),
  });

  // Filter out owners - they're shown in the Owners component
  const members = useMemo(
    () => membersData?.data?.filter((m) => m.role !== "owner") ?? [],
    [membersData],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: ({ table }) => (
          <Checkbox
            // explicit width to prevent CLS with row selection
            className="w-28 gap-0"
            labelProps={{
              // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
              onClick: (e) => e.preventDefault(),
              className: `flex-1 font-bold ${isOwner ? "px-4" : "px-2"}`,
            }}
            label={
              table.getIsAllRowsSelected() || table.getIsSomeRowsSelected() ? (
                <MembershipMenu
                  selectedRows={table.getSelectedRowModel().rows}
                  toggleRowSelection={table.toggleAllRowsSelected}
                />
              ) : (
                app.workspaceMembersPage.membersTable.headers.members
              )
            }
            controlProps={{
              className: isOwner ? "flex" : "hidden",
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
            labelProps={{
              className: "px-2",
            }}
            label={
              <div className="flex flex-col py-4">
                <span className="text-lg">{row.original.user.name}</span>
                <span className="text-foreground-subtle">
                  {row.original.user.email}
                </span>
              </div>
            }
            controlProps={{
              className: isOwner ? "flex" : "hidden",
            }}
            disabled={!isOwner}
            checked={row.getIsSelected()}
            onCheckedChange={({ checked }) =>
              row.toggleSelected(checked as boolean)
            }
          />
        ),
      }),
      columnHelper.accessor("role", {
        header: app.workspaceMembersPage.membersTable.headers.role,
        cell: (info) => {
          const accentColor = match(info.getValue())
            .with(
              "admin",
              () => "var(--colors-brand-secondary)" as string | undefined,
            )
            .with("member", () => "var(--colors-brand-tertiary)")
            .otherwise(() => undefined);

          return (
            <Badge
              variant="outline"
              className="w-18 justify-center font-semibold"
              style={
                accentColor
                  ? { color: accentColor, borderColor: accentColor }
                  : undefined
              }
            >
              {capitalizeFirstLetter(info.getValue())}
            </Badge>
          );
        },
      }),
    ],
    [isOwner],
  );

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="bg-background-subtle/40">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Members;

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import app from "@/lib/config/app.config";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { IdpMember } from "@/lib/idp";

const membersRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/members",
);

const columnHelper = createColumnHelper<IdpMember>();

const columns = [
  columnHelper.accessor("id", {
    header: app.workspaceMembersPage.ownersTable.headers.owners,
    cell: ({ row }) => (
      <div className="flex flex-col py-4">
        <span className="font-medium text-lg">{row.original.user.name}</span>

        <span className="font-medium text-foreground-subtle">
          {row.original.user.email}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("role", {
    header: app.workspaceMembersPage.ownersTable.headers.role,
    cell: (info) => (
      <Badge
        variant="outline"
        className="w-18 justify-center border-[var(--colors-brand-primary)] font-semibold text-[var(--colors-brand-primary)]"
      >
        {capitalizeFirstLetter(info.getValue())}
      </Badge>
    ),
  }),
];

/**
 * Workspace owners table.
 * Fetches owner data from Gatekeeper (single source of truth).
 */
const Owners = () => {
  const { organizationId, session } = membersRoute.useRouteContext();

  const { data: membersData } = useQuery({
    ...organizationMembersOptions({
      organizationId: organizationId!,
      accessToken: session?.accessToken!,
    }),
  });

  // Filter to only owners
  const owners = useMemo(
    () => membersData?.data?.filter((m) => m.role === "owner") ?? [],
    [membersData],
  );

  const table = useReactTable({
    data: owners,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="mb-2">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="bg-background-subtle">
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

export default Owners;

import {
  Badge,
  Stack,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import app from "@/lib/config/app.config";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { IdpMember } from "@/lib/idp";

const columnHelper = createColumnHelper<IdpMember>();

const columns = [
  columnHelper.accessor("id", {
    header: app.workspaceMembersPage.ownersTable.headers.owners,
    cell: ({ row }) => (
      <Stack py={4}>
        <Text fontSize="lg" fontWeight="medium">
          {row.original.user.name}
        </Text>

        <Text color="foreground.subtle" fontWeight="medium">
          {row.original.user.email}
        </Text>
      </Stack>
    ),
  }),
  columnHelper.accessor("role", {
    header: app.workspaceMembersPage.ownersTable.headers.role,
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

/**
 * Workspace owners table.
 * Fetches owner data from Gatekeeper (single source of truth).
 */
const Owners = () => {
  const { organizationId, session } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage/members",
  });

  const { data: membersData } = useQuery({
    ...organizationMembersOptions({
      organizationId: organizationId!,
      accessToken: session?.accessToken!,
    }),
  });

  // Filter to only owners
  const owners = useMemo(
    () => membersData?.members?.filter((m) => m.role === "owner") ?? [],
    [membersData],
  );

  const table = useReactTable({
    data: owners,
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

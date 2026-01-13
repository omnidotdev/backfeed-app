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
import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { match } from "ts-pattern";

import MembershipMenu from "@/components/workspace/MembershipMenu";
import app from "@/lib/config/app.config";
import { organizationMembersOptions } from "@/lib/options/organizationMembers";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { IdpMember } from "@/lib/idp";

const columnHelper = createColumnHelper<IdpMember>();

/**
 * Workspace members table.
 * Fetches member data from IDP (single source of truth).
 */
const Members = () => {
  const { isOwner, organizationId, session } = useRouteContext({
    from: "/_public/workspaces/$workspaceSlug/_layout/_manage/members",
  });

  const { data: membersData } = useQuery({
    ...organizationMembersOptions({
      organizationId: organizationId!,
      accessToken: session?.accessToken!,
    }),
  });

  // Filter out owners - they're shown in the Owners component
  const members = useMemo(
    () => membersData?.members?.filter((m) => m.role !== "owner") ?? [],
    [membersData],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: ({ table }) => (
          <Checkbox
            size="sm"
            // explicit width to prevent CLS with row selection
            w={28}
            // Prevent spacing between checkbox and label. See note for label `onClick` handler below
            gap={0}
            labelProps={{
              flex: 1,
              px: isOwner ? 4 : 2,
              fontWeight: "bold",
              // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
              onClick: (e) => e.preventDefault(),
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
            labelProps={{
              px: 2,
            }}
            label={
              <Stack py={4}>
                <Text fontSize="lg">{row.original.user.name}</Text>
                <Text color="foreground.subtle">{row.original.user.email}</Text>
              </Stack>
            }
            controlProps={{
              display: isOwner ? "flex" : "none",
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
            .with("admin", () => "brand.secondary")
            .with("member", () => "brand.tertiary")
            .otherwise(() => undefined);

          return (
            <Badge
              variant="outline"
              w={18}
              justifyContent="center"
              color={accentColor}
              borderColor={accentColor}
              fontWeight="semibold"
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

export default Members;

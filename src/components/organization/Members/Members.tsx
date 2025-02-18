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
import { useMemo } from "react";
import { match } from "ts-pattern";

import { MembershipMenu } from "components/organization";
import { Role, useMembersQuery } from "generated/graphql";
import {
  useAuth,
  useDebounceValue,
  useOrganizationMembership,
  useSearchParams,
} from "lib/hooks";

import type { MemberFragment } from "generated/graphql";

const columnHelper = createColumnHelper<MemberFragment>();

interface Props {
  /** Organization ID. */
  organizationId: string;
}

/**
 * Organization members table.
 */
const Members = ({ organizationId }: Props) => {
  const { user } = useAuth();

  const { isOwner } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const [{ roles, search }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const { data: members } = useMembersQuery(
    {
      organizationId,
      roles: roles ?? undefined,
      search: debouncedSearch,
      excludeRoles: [Role.Owner],
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => data.members?.nodes,
    }
  );

  const columns = useMemo(
    () => [
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
              px: isOwner ? 4 : 2,
              fontWeight: "bold",
              // NB: naturally, clicking the label will toggle the checkbox. In this case, we only want the toggle to happen when the control is clicked.
              onClick: (e) => e.preventDefault(),
            }}
            label={
              table.getIsAllRowsSelected() || table.getIsSomeRowsSelected() ? (
                <MembershipMenu
                  organizationId={organizationId}
                  selectedRows={table.getSelectedRowModel().rows}
                  toggleRowSelection={table.toggleAllRowsSelected}
                />
              ) : (
                "Members"
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
                <Text fontSize="lg">
                  {row.original.user?.firstName} {row.original.user?.lastName}
                </Text>
                <Text color="foreground.subtle">
                  {row.original.user?.username}
                </Text>
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
        header: "Role",
        cell: (info) => {
          const accentColor = match(info.getValue())
            .with(Role.Admin, () => "brand.secondary")
            .with(Role.Member, () => "brand.tertiary")
            .otherwise(() => undefined);

          return (
            <Badge
              w={18}
              justifyContent="center"
              bgColor={accentColor}
              borderColor={accentColor}
              color="background.default"
              fontWeight="semibold"
            >
              {info.getValue().toUpperCase()}
            </Badge>
          );
        },
      }),
    ],
    [isOwner, organizationId]
  );

  const table = useReactTable({
    data: members as MemberFragment[],
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

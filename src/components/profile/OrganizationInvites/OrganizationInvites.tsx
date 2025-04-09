"use client";

import {
  Checkbox,
  Skeleton,
  Stack,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

import { SectionContainer } from "components/layout";
import { InvitationMenu } from "components/profile";
import { useInvitationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { InvitationFragment } from "generated/graphql";

const organizationInviteDetails = app.profilePage.organizationInvites;

const columnHelper = createColumnHelper<InvitationFragment>();

/**
 * User's organization invitations.
 */
const OrganizationInvites = () => {
  const { user } = useAuth();

  const {
    data: invitations,
    error,
    isLoading,
  } = useInvitationsQuery(
    {
      email: user?.email!,
    },
    {
      enabled: !!user,
      select: (data) => data.invitations?.nodes,
    }
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
                organizationInviteDetails.headers.organizationName
              )
            }
            // @ts-ignore TODO: Update Sigil component to support icon toggling in checkbox
            iconProps={{
              style: {
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
            // @ts-ignore TODO: Update Sigil component to support icon toggling in checkbox
            iconProps={{
              style: {
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
        header: organizationInviteDetails.headers.invitationDate,
        cell: ({ cell }) => dayjs(cell.getValue()).format("M/D/YYYY"),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: invitations as InvitationFragment[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <SectionContainer
      title={organizationInviteDetails.title}
      description={organizationInviteDetails.description}
      p={0}
      titleProps={{
        px: 4,
        mt: 4,
      }}
      descriptionProps={{
        px: 4,
      }}
    >
      {isLoading ? (
        <Skeleton h={18} m={4} />
      ) : error || !invitations?.length ? (
        <Stack mx={4} mb={4}>
          <Text>{organizationInviteDetails.emptyState.message}</Text>
        </Stack>
      ) : (
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
      )}
    </SectionContainer>
  );
};

export default OrganizationInvites;

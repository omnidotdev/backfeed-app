import { Flex, Icon, Table, TableCell, TableRow } from "@omnidev/sigil";
import { flexRender } from "@tanstack/react-table";
import {
  LuArrowDownWideNarrow,
  LuArrowUpNarrowWide,
  LuChevronsUpDown,
} from "react-icons/lu";

import type { FlexProps, TableCellProps } from "@omnidev/sigil";
import type { RowData, Table as TableInterface } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<_TData extends RowData, _TValue> {
    tableCellProps?: TableCellProps;
    headerProps?: FlexProps;
  }
}

interface Props<T> {
  table: TableInterface<T>;
}

const DataTable = <T,>({ table }: Props<T>) => (
  <Table
    size="sm"
    headerContent={table.getHeaderGroups().map((headerGroup) => (
      <TableRow
        key={headerGroup.id}
        bgColor={{ base: "brand.primary.50a", _dark: "brand.primary.950a" }}
        divideX="1px"
        position="sticky"
        top={0}
        zIndex="stickyHeader"
      >
        {headerGroup.headers.map((header) => (
          <TableCell
            key={header.id}
            whiteSpace="nowrap"
            onClick={header.column.getToggleSortingHandler()}
            {...header.column.columnDef.meta?.tableCellProps}
          >
            <Flex
              whiteSpace="nowrap"
              align="center"
              justify="space-between"
              w="full"
              gap={4}
              fontWeight="semibold"
              {...header.column.columnDef.meta?.headerProps}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}

              {header.column.getCanSort() &&
                ({
                  asc: <Icon src={LuArrowUpNarrowWide} size="sm" />,
                  desc: <Icon src={LuArrowDownWideNarrow} size="sm" />,
                  false: <Icon src={LuChevronsUpDown} size="sm" />,
                }[header.column.getIsSorted() as string] ??
                  null)}
            </Flex>
          </TableCell>
        ))}
      </TableRow>
    ))}
  >
    {table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        divideX="1px"
        _even={{ bgColor: "background.subtle" }}
        _hover={{
          _even: { bgColor: "background.subtle" },
          bgColor: "inherit",
        }}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            whiteSpace="nowrap"
            pr={8}
            {...cell.column.columnDef.meta?.tableCellProps}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </Table>
);

export default DataTable;

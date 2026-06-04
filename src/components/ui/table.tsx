import cn from "@/lib/utils";

import type { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {
  containerProps?: string;
}

const Table = ({ containerProps, className, ...rest }: TableProps) => (
  <div
    data-slot="table-container"
    className={cn("no-scrollbar relative w-full overflow-auto", containerProps)}
  >
    <table
      data-slot="table"
      className={cn("w-full caption-bottom text-sm", className)}
      {...rest}
    />
  </div>
);

const TableHeader = ({ className, ...rest }: ComponentProps<"thead">) => (
  <thead
    data-slot="table-header"
    className={cn("h-8 [&_tr]:border-b", className)}
    {...rest}
  />
);

const TableBody = ({ className, ...rest }: ComponentProps<"tbody">) => (
  <tbody
    data-slot="table-body"
    className={cn("[&_tr:last-child]:border-0", className)}
    {...rest}
  />
);

const TableRow = ({ className, ...rest }: ComponentProps<"tr">) => (
  <tr
    data-slot="table-row"
    className={cn(
      "border-b hover:bg-accent data-[state=selected]:bg-accent",
      className,
    )}
    {...rest}
  />
);

const TableCell = ({ className, ...rest }: ComponentProps<"td">) => (
  <td
    data-slot="table-cell"
    className={cn(
      "select-none whitespace-nowrap align-middle font-light [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
      className,
    )}
    {...rest}
  />
);

export { Table, TableHeader, TableBody, TableRow, TableCell, type TableProps };

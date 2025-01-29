import {
  Table,
  TableCell,
  TableHeader,
  type TableProps,
  TableRow,
} from "@omnidev/sigil";

const productData = [
  {
    id: "basic",
    name: "Basic",
  },
  {
    id: "professional",
    name: "Professional",
  },
  {
    id: "enterprise",
    name: "Enterprise",
  },
] as const;

const headerProps = {
  fontWeight: "bold",
  fontSize: "xl",
  textAlign: "center",
};

/**
 * Pricing feature matrix.
 */
const PricingMatrix = (props: TableProps) => {
  return (
    <Table
      headerContent={
        <TableRow>
          <TableHeader {...headerProps}>Feature</TableHeader>

          {productData
            .filter(({ name }) => name)
            .map(({ name }) => (
              <TableHeader key={name} {...headerProps}>
                {name}
              </TableHeader>
            ))}
        </TableRow>
      }
      {...props}
    >
      {productData.map(({ id, name }) => (
        <TableRow key={id}>
          <TableCell fontWeight="medium">wip</TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default PricingMatrix;

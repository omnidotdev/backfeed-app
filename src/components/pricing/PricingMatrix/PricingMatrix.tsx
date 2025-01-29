import {
  Icon,
  Table,
  TableCell,
  TableHeader,
  type TableProps,
  TableRow,
} from "@omnidev/sigil";
import { FaCheck, FaX } from "react-icons/fa6";

const COMMON_FEATURES = {
  gdpr: { label: "GDPR Compliance", value: true },
  communitySupport: { label: "Community Support", value: true },
};

const productData = [
  {
    id: "basic",
    name: "Basic",
    features: {
      ...COMMON_FEATURES,
      // webhooks: { label: "Webhooks", value: false },
    },
  },
  {
    id: "professional",
    name: "Professional",
    features: {
      ...COMMON_FEATURES,
      webhooks: { label: "Webhooks", value: true },
      apiAccess: { label: "API Access", value: true },
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    features: {
      ...COMMON_FEATURES,
      webhooks: { label: "Webhooks", value: true },
      apiAccess: { label: "API Access", value: true },
    },
  },
] as const;

const allFeatures = Array.from(
  new Set(productData.flatMap(({ features }) => Object.keys(features))),
);

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
      {allFeatures.map((feature) => (
        <TableRow key={feature}>
          <TableCell textAlign="center" fontWeight="semibold" fontSize="xl">
            {/* @ts-ignore TODO */}
            {productData.find((p) => p.features[feature])?.features[feature]
              ?.label || feature}
          </TableCell>

          {productData.map(({ id, features }) => (
            <TableCell key={id} textAlign="center">
              {/* @ts-ignore TODO */}
              {features[feature]?.value ? (
                <Icon src={FaCheck} color="green.500" />
              ) : (
                <Icon src={FaX} color="red.500" />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );
};

export default PricingMatrix;

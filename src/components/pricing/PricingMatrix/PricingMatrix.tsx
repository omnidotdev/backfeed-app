import {
  Badge,
  Icon,
  Table,
  TableCell,
  TableHeader,
  type TableProps,
  TableRow,
} from "@omnidev/sigil";
import { app } from "lib/config";
import { FaCheck, FaX } from "react-icons/fa6";

interface Feature {
  /** Human-readable label. */
  label: string;
  /** Value. */
  value: boolean;
  /** Whether the feature is coming soon. */
  comingSoon?: boolean;
}

/**
 * Features common to all tiers.
 */
const COMMON_FEATURES: Record<string, Feature> = {
  gdpr: { label: "GDPR Compliance", value: true },
  communitySupport: { label: "Community Support", value: true },
  unlimitedFeedback: { label: "Unlimited Feedback Items", value: true },
};

/**
 * Per-tier product information.
 */
const tiers: {
  /** ID. */
  id: string;
  /** Human-readable name. */
  name?: string;
  /** Features. */
  features: Record<string, Feature>;
}[] = [
  {
    id: "basic",
    name: "Basic",
    features: COMMON_FEATURES,
  },
  {
    id: "team",
    name: "Team",
    features: {
      ...COMMON_FEATURES,
      webhooks: { label: "Webhooks", value: true, comingSoon: true },
      apiAccess: { label: "API Access", value: true, comingSoon: true },
      unlimitedOrgs: { label: "Unlimited Organizations", value: true },
      unlimitedProjects: { label: "Unlimited Projects", value: true },
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    features: {
      ...COMMON_FEATURES,
      webhooks: { label: "Webhooks", value: true, comingSoon: true },
      apiAccess: { label: "API Access", value: true, comingSoon: true },
      unlimitedOrgs: { label: "Unlimited Organizations", value: true },
      unlimitedProjects: { label: "Unlimited Projects", value: true },
    },
  },
] as const;

const allFeatures = Array.from(
  new Set(tiers.flatMap(({ features }) => Object.keys(features)))
);

const headerProps = {
  fontWeight: "bold",
  fontSize: "xl",
  textAlign: "center",
};

/**
 * Pricing feature matrix.
 */
const PricingMatrix = (props: TableProps) => (
  <Table
    headerContent={
      <TableRow>
        <TableHeader {...headerProps}>
          {app.pricingPage.pricingMatrix.feature}
        </TableHeader>

        {tiers
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
    {allFeatures.map((feature) => {
      const featureInfo = tiers.find((tier) => tier.features[feature])
        ?.features[feature];

      return (
        <TableRow key={feature} _odd={{ bgColor: "background.subtle" }}>
          <TableCell
            textAlign="center"
            fontWeight="semibold"
            fontSize="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            {featureInfo?.label || feature}

            {featureInfo?.comingSoon && <Badge>Coming Soon</Badge>}
          </TableCell>

          {tiers.map(({ id, features }) => (
            <TableCell key={id} textAlign="center">
              {features[feature]?.value ? (
                <Icon src={FaCheck} color="green.500" />
              ) : (
                <Icon src={FaX} color="red.500" />
              )}
            </TableCell>
          ))}
        </TableRow>
      );
    })}
  </Table>
);

export default PricingMatrix;

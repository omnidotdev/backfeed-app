import {
  Badge,
  Flex,
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
  gdpr: { label: app.pricingPage.pricingMatrix.features.gdpr, value: true },
  communitySupport: {
    label: app.pricingPage.pricingMatrix.features.communitySupport,
    value: true,
  },
  unlimitedFeedback: {
    label: app.pricingPage.pricingMatrix.features.unlimitedFeedback,
    value: true,
  },
};

const TEAM_FEATURES: Record<string, Feature> = {
  ...COMMON_FEATURES,
  unlimitedOrgs: {
    label: app.pricingPage.pricingMatrix.features.unlimitedOrgs,
    value: true,
  },
  unlimitedProjects: {
    label: app.pricingPage.pricingMatrix.features.unlimitedProjects,
    value: true,
  },
  webhooks: {
    label: app.pricingPage.pricingMatrix.features.webhooks,
    value: true,
    comingSoon: true,
  },
  apiAccess: {
    label: app.pricingPage.pricingMatrix.features.apiAccess,
    value: true,
    comingSoon: true,
  },
  customTags: {
    label: app.pricingPage.pricingMatrix.features.customTags,
    value: true,
    comingSoon: true,
  },
  customCategories: {
    label: app.pricingPage.pricingMatrix.features.customCategories,
    value: true,
    comingSoon: true,
  },
  customAnalytics: {
    label: app.pricingPage.pricingMatrix.features.customAnalytics,
    value: true,
    comingSoon: true,
  },
  internalCollaborationTools: {
    label: app.pricingPage.pricingMatrix.features.internalCollaborationTools,
    value: true,
    comingSoon: true,
  },
  customBranding: {
    label: app.pricingPage.pricingMatrix.features.customBranding,
    value: true,
    comingSoon: true,
  },
  thirdPartyIntegrations: {
    label: app.pricingPage.pricingMatrix.features.thirdPartyIntegrations,
    value: true,
    comingSoon: true,
  },
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
      ...TEAM_FEATURES,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    features: {
      ...COMMON_FEATURES,
      ...TEAM_FEATURES,
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
  <Flex w="100%" overflowX="auto" justify={{ lg: "center" }}>
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
      css={{
        baseToLg: {
          // make first column sticky
          "& th:first-child, td:first-child": {
            position: "sticky",
            left: 0,
            bgColor: "brand.primary.50",
            borderRight: "1px solid {colors.border.subtle}",
          },
        },
      }}
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

              {featureInfo?.comingSoon && (
                <Badge>{app.info.comingSoon.label}</Badge>
              )}
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
  </Flex>
);

export default PricingMatrix;

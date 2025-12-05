import {
  Flex,
  Icon,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@omnidev/sigil";
import { FaCheck, FaX } from "react-icons/fa6";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

import { app } from "../../../lib/config";
import { Tooltip } from "../../core";

import type { TableProps } from "@omnidev/sigil";

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
};

const BASIC_FEATURES: Record<string, Feature> = {
  unlimitedFeedback: {
    label: app.pricingPage.pricingMatrix.features.unlimitedFeedback,
    value: true,
  },
};

const TEAM_FEATURES: Record<string, Feature> = {
  ...COMMON_FEATURES,
  ...BASIC_FEATURES,
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
  internalCollaborationTools: {
    label: app.pricingPage.pricingMatrix.features.internalCollaborationTools,
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
    id: "free",
    name: "Free",
    features: COMMON_FEATURES,
  },
  {
    id: "basic",
    name: "Basic",
    features: {
      ...COMMON_FEATURES,
      ...BASIC_FEATURES,
    },
  },
  {
    id: "team",
    name: "Team",
    features: {
      ...COMMON_FEATURES,
      ...BASIC_FEATURES,
      ...TEAM_FEATURES,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    features: {
      ...COMMON_FEATURES,
      ...BASIC_FEATURES,
      ...TEAM_FEATURES,
      customAnalytics: {
        label: app.pricingPage.pricingMatrix.features.customAnalytics,
        value: true,
        comingSoon: true,
      },
      customBranding: {
        label: app.pricingPage.pricingMatrix.features.customBranding,
        value: true,
        comingSoon: true,
      },
      customSso: {
        label: app.pricingPage.pricingMatrix.features.customSso,
        value: true,
        comingSoon: true,
      },
      customDataRetentionPolicies: {
        label: app.pricingPage.pricingMatrix.features.customData,
        value: true,
        comingSoon: true,
      },
      customOnboardingTraining: {
        label: app.pricingPage.pricingMatrix.features.customOnboardingTraining,
        value: true,
        comingSoon: true,
      },
      slaBackedSupport: {
        label: app.pricingPage.pricingMatrix.features.slaBackedSupport,
        value: true,
        comingSoon: true,
      },
      selfHostingAssistance: {
        label: app.pricingPage.pricingMatrix.features.selfHostingAssistance,
        value: true,
        comingSoon: true,
      },
      integrationSupportForInternalTools: {
        label:
          app.pricingPage.pricingMatrix.features
            .integrationSupportForInternalTools,
        value: true,
        comingSoon: true,
      },
      customAiBasedFeedbackAnalysis: {
        label:
          app.pricingPage.pricingMatrix.features.customAiBasedFeedbackAnalysis,
        value: true,
        comingSoon: true,
      },
    },
  },
] as const;

const allFeatures = Array.from(
  new Set(tiers.flatMap(({ features }) => Object.keys(features))),
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
      {...props}
    >
      {allFeatures.map((feature) => {
        const featureInfo = tiers.find((tier) => tier.features[feature])
          ?.features[feature];

        return (
          <TableRow
            key={feature}
            bgColor={{
              base: {
                base: "background.default",
                _hover: "background.default",
              },
              _odd: { base: "background.subtle", _hover: "background.subtle" },
            }}
          >
            <TableCell
              textAlign="center"
              fontWeight="semibold"
              fontSize={{ base: "sm", md: "lg" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              textWrap="nowrap"
            >
              {featureInfo?.label || feature}

              {featureInfo?.comingSoon && (
                <Tooltip
                  positioning={{ placement: "top" }}
                  trigger={<Icon src={HiOutlineWrenchScrewdriver} />}
                  triggerProps={{
                    variant: "ghost",
                    bgColor: "transparent",
                    "aria-label": app.info.comingSoon.label,
                  }}
                >
                  {app.info.comingSoon.label}
                </Tooltip>
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

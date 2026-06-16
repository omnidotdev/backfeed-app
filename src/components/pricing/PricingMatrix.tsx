import { FaCheck, FaX } from "react-icons/fa6";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

import Tooltip from "@/components/core/Tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import app from "@/lib/config/app.config";

import type { ComponentProps } from "react";

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

const PRO_FEATURES: Record<string, Feature> = {
  unlimitedFeedback: {
    label: app.pricingPage.pricingMatrix.features.unlimitedFeedback,
    value: true,
  },
};

const TEAM_FEATURES: Record<string, Feature> = {
  ...COMMON_FEATURES,
  ...PRO_FEATURES,
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
    id: "pro",
    name: "Pro",
    features: {
      ...COMMON_FEATURES,
      ...PRO_FEATURES,
    },
  },
  {
    id: "team",
    name: "Team",
    features: {
      ...COMMON_FEATURES,
      ...PRO_FEATURES,
      ...TEAM_FEATURES,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    features: {
      ...COMMON_FEATURES,
      ...PRO_FEATURES,
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

const headerCellClassName =
  "w-[15%] px-3 py-4 text-center font-bold text-base md:text-lg whitespace-nowrap";

/**
 * Pricing feature matrix.
 */
const PricingMatrix = (props: ComponentProps<typeof Table>) => (
  // mx-auto centers the table; the inner Table container is w-full so it fills
  // this max-width box. min-width keeps columns readable and scrolls on mobile.
  <div className="mx-auto w-full max-w-5xl">
    <Table
      className="min-w-[40rem] table-fixed overflow-hidden rounded-xl border border-border"
      {...props}
    >
      <TableHeader>
        <TableRow className="border-border border-b-2 bg-background-subtle hover:bg-background-subtle dark:bg-background-subtle/40">
          <TableHead className="w-[40%] px-4 py-4 text-left font-bold text-base md:text-lg">
            {app.pricingPage.pricingMatrix.feature}
          </TableHead>

          {tiers
            .filter(({ name }) => name)
            .map(({ name }) => (
              <TableHead key={name} className={headerCellClassName}>
                {name}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {allFeatures.map((feature) => {
          const featureInfo = tiers.find((tier) => tier.features[feature])
            ?.features[feature];

          return (
            <TableRow
              key={feature}
              className="border-border/60 bg-background hover:bg-background odd:bg-background-subtle/50 odd:hover:bg-background-subtle/50"
            >
              {/* keep the cell as a real table cell (no `flex` on the <td>, which
                  would break column alignment with the header); put the flex on an
                  inner wrapper instead */}
              <TableCell className="px-4 py-3.5 font-medium text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <span>{featureInfo?.label || feature}</span>

                  {featureInfo?.comingSoon && (
                    <Tooltip
                      positioning={{ placement: "top" }}
                      trigger={
                        <HiOutlineWrenchScrewdriver className="cursor-pointer text-foreground-subtle" />
                      }
                      triggerProps={{
                        "aria-label": app.info.comingSoon.label,
                        className: "cursor-pointer bg-transparent",
                      }}
                    >
                      {app.info.comingSoon.label}
                    </Tooltip>
                  )}
                </div>
              </TableCell>

              {tiers.map(({ id, features }) => (
                <TableCell key={id} className="px-3 py-3.5 text-center">
                  {features[feature]?.value ? (
                    <FaCheck className="mx-auto size-4 text-[var(--colors-green-500)] md:size-[1.1rem]" />
                  ) : (
                    <FaX className="mx-auto size-3.5 text-foreground-subtle/40 md:size-4" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

export default PricingMatrix;

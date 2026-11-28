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

/** Tier ID, matching the catalog tier names. */
type TierId = "free" | "pro" | "team";

/** A cell value: a check/cross, or a short limit label. */
type CellValue = boolean | string;

interface FeatureRow {
  /** Feature ID. */
  id: string;
  /** Human-readable label. */
  label: string;
  /** Whether the feature is coming soon. */
  comingSoon?: boolean;
  /** Value per tier. */
  values: Record<TierId, CellValue>;
}

const { features: labels, values: limitLabels } = app.pricingPage.pricingMatrix;

/**
 * Tiers shown in the matrix. Mirrors the catalog SSOT tiers exactly (omni-api
 * planConfigs, backfeed block); there is no tier beyond Team
 */
export const PRICING_MATRIX_TIERS: { id: TierId; name: string }[] = [
  { id: "free", name: "Free" },
  { id: "pro", name: "Pro" },
  { id: "team", name: "Team" },
];

/**
 * Feature rows. Each row mirrors a catalog feature line or operational limit
 * (omni-api planConfigs, backfeed block); edit the catalog first, then this
 * list. "Coming soon" follows the catalog's own markers
 */
export const PRICING_MATRIX_ROWS: FeatureRow[] = [
  {
    id: "projects",
    label: labels.projects,
    values: {
      free: limitLabels.upToTwo,
      pro: limitLabels.upToTen,
      team: limitLabels.unlimited,
    },
  },
  {
    id: "unlimitedFeedback",
    label: labels.unlimitedFeedback,
    values: { free: true, pro: true, team: true },
  },
  {
    id: "feedbackCapture",
    label: labels.feedbackCapture,
    values: { free: true, pro: true, team: true },
  },
  {
    id: "members",
    label: labels.members,
    values: {
      free: limitLabels.upToFive,
      pro: limitLabels.unlimited,
      team: limitLabels.unlimited,
    },
  },
  {
    id: "aiTriage",
    label: labels.aiTriage,
    comingSoon: true,
    values: { free: false, pro: true, team: limitLabels.largerAllowance },
  },
  {
    id: "multiSourceIngestion",
    label: labels.multiSourceIngestion,
    comingSoon: true,
    values: { free: false, pro: false, team: true },
  },
  {
    id: "themeClustering",
    label: labels.themeClustering,
    comingSoon: true,
    values: { free: false, pro: false, team: true },
  },
  {
    id: "productReviews",
    label: labels.productReviews,
    comingSoon: true,
    values: { free: false, pro: false, team: true },
  },
  {
    id: "teamCollaboration",
    label: labels.teamCollaboration,
    comingSoon: true,
    values: { free: false, pro: false, team: true },
  },
  {
    id: "apiAccess",
    label: labels.apiAccess,
    comingSoon: true,
    values: { free: false, pro: false, team: true },
  },
  {
    id: "customBranding",
    label: labels.customBranding,
    comingSoon: true,
    values: { free: false, pro: false, team: true },
  },
];

const headerCellClassName =
  "w-[20%] px-3 py-4 text-center font-bold text-base md:text-lg whitespace-nowrap";

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

          {PRICING_MATRIX_TIERS.map(({ id, name }) => (
            <TableHead key={id} className={headerCellClassName}>
              {name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {PRICING_MATRIX_ROWS.map((row) => (
          <TableRow
            key={row.id}
            className="border-border/60 bg-background hover:bg-background odd:bg-background-subtle/50 odd:hover:bg-background-subtle/50"
          >
            {/* keep the cell as a real table cell (no `flex` on the <td>, which
                  would break column alignment with the header); put the flex on an
                  inner wrapper instead */}
            <TableCell className="px-4 py-3.5 font-medium text-sm md:text-base">
              <div className="flex items-center gap-1.5">
                <span>{row.label}</span>

                {row.comingSoon && (
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

            {PRICING_MATRIX_TIERS.map(({ id }) => {
              const value = row.values[id];

              return (
                <TableCell key={id} className="px-3 py-3.5 text-center">
                  {typeof value === "string" ? (
                    <span className="font-medium text-sm md:text-base">
                      {value}
                    </span>
                  ) : value ? (
                    <FaCheck className="mx-auto size-4 text-[var(--colors-green-500)] md:size-[1.1rem]" />
                  ) : (
                    <FaX className="mx-auto size-3.5 text-foreground-subtle/40 md:size-4" />
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default PricingMatrix;

import { isDevEnv } from "lib/config";

/**
 * Polar sandbox Product IDs.
 */
const sandboxProductIds = [
  // Backfeed Free (Monthly)
  "e9a12f96-e207-4394-bc53-a1aca41208b0",
  // Backfeed Free (Yearly)
  "9895e940-47d4-4deb-957d-86159f992aa7",
  // Backfeed Basic (Monthly)
  "9fdf9d78-f4f7-4222-93ed-55ae60d996e4",
  // Backfeed Basic (Yearly)
  "9a135ea6-5e7c-448b-8070-a5534ae72d93",
  // Backfeed Team (Monthly)
  "51eaf279-48b4-422a-939f-046cb299655d",
  // Backfeed Team (Yearly)
  "2479fd7f-03b3-4965-9887-e701e8e18e14",
];

/**
 * Polar production product IDs.
 */
const productionProductIds = [
  // Backfeed Free (Monthly)
  "b43cb695-0762-492b-be29-3320725ac4c6",
  // Backfeed Free (Yearly)
  "62685a4c-04dd-4dcd-989b-7d2e933827a8",
  // Backfeed Basic (Monthly)
  "768e1aee-fc38-46fa-91d9-1c15b71375dd",
  // Backfeed Basic (Yearly)
  "a35183cc-5223-4e64-852c-a291a6f52222",
  // Backfeed Team (Monthly)
  "b1f48ae5-0de4-416e-9b16-39b3f01372b6",
  // Backfeed Team (Yearly)
  "39e6bf3d-0aef-4fe0-abdb-243af14b010f",
  // Backfeed Enterprise (Monthly)
  "7e2bd7d7-6a43-4c0d-8545-c59d2fabd598",
  // Backfeed Enterprise (Yearly)
  "51906ba1-b6a9-43c9-83ee-f2fe399a792f",
];

/**
 * Polar product IDs.
 */
const BACKFEED_PRODUCT_IDS = isDevEnv
  ? [...sandboxProductIds]
  : [...productionProductIds];

export default BACKFEED_PRODUCT_IDS;

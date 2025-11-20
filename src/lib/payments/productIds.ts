import { SANDBOX_PRODUCT_IDS, isDevEnv } from "lib/config";

const sandboxProductIds: string[] = SANDBOX_PRODUCT_IDS;

// TODO: add static production product IDs when available.
const productionProductIds: string[] = [];

export const PRODUCT_IDS = isDevEnv ? sandboxProductIds : productionProductIds;

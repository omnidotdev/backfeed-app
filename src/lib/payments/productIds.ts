import { isDevEnv } from "lib/config";

// TODO: figure out the best way to manage this for isolated sandbox environments
const sandboxProductIds: string[] = [];

const productionProductIds: string[] = [];

export const PRODUCT_IDS = isDevEnv ? sandboxProductIds : productionProductIds;

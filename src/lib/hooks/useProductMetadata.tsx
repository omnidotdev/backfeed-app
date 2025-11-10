import { HiLockOpen, HiSparkles } from "react-icons/hi2";
import { P, match } from "ts-pattern";

import { capitalizeFirstLetter } from "lib/util";

import type { Product } from "@polar-sh/sdk/models/components/product";

interface Options {
  /** The product to fetch metadata for. */
  product: Product;
}

/**
 * Custom hook to define properties based on product metadata.
 */
const useProductMetadata = ({ product }: Options) => {
  const metadata = product.metadata;

  const isFreeTier = match(metadata)
    .with({ isFree: P.nonNullable }, () => true)
    .otherwise(() => false);

  const isRecommendedTier = match(metadata)
    .with({ isRecommended: P.nonNullable }, () => true)
    .otherwise(() => false);

  const isEnterpriseTier = match(metadata)
    .with({ isEnterprise: P.nonNullable }, () => true)
    .otherwise(() => false);

  const isDisabled = match(metadata)
    .with({ isDisabled: P.nonNullable }, () => true)
    .otherwise(() => false);

  const actionIcon = match(metadata)
    .with({ isRecommended: P.nonNullable }, () => HiSparkles)
    .with({ isFree: P.nonNullable }, () => undefined)
    .with({ isEnterprise: P.nonNullable }, () => undefined)
    .otherwise(() => HiLockOpen);

  const productTitle = capitalizeFirstLetter(metadata.title as string);

  return {
    isFreeTier,
    isRecommendedTier,
    isEnterpriseTier,
    isDisabled,
    actionIcon,
    productTitle,
  };
};

export default useProductMetadata;

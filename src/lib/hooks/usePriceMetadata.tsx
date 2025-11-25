import { HiLockOpen, HiSparkles } from "react-icons/hi2";
import { match } from "ts-pattern";

import { Tier } from "generated/graphql";
import { capitalizeFirstLetter } from "lib/util";

import type Stripe from "stripe";

interface Options {
  /** The price to fetch metadata for. */
  price: Stripe.Price | undefined;
}

/**
 * Custom hook to define properties based on price metadata.
 */
const usePriceMetadata = ({ price }: Options) => {
  const metadata = price?.metadata ?? { tier: Tier.Free };

  const tier = match(metadata)
    .with({ tier: "basic" }, () => Tier.Basic)
    .with({ tier: "team" }, () => Tier.Team)
    .otherwise(() => Tier.Free);

  const isFreeTier = tier === Tier.Free;

  const isRecommendedTier = tier === Tier.Team;

  // TODO: handle
  const isEnterpriseTier = false;

  const isDisabled = false;

  const actionIcon = match(tier)
    .with(Tier.Team, () => HiSparkles)
    .with(Tier.Basic, () => HiLockOpen)
    .otherwise(() => undefined);

  const productTitle = capitalizeFirstLetter(metadata.title as string);

  return {
    tier,
    isFreeTier,
    isRecommendedTier,
    isEnterpriseTier,
    isDisabled,
    actionIcon,
    productTitle,
  };
};

export default usePriceMetadata;

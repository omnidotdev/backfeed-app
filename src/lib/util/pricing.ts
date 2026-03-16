import type Stripe from "stripe";

/**
 * Default product details for the free tier.
 */
export const FREE_PRODUCT_DETAILS = {
  description: "Start collecting feedback",
  marketing_features: [
    { name: "2 projects per workspace" },
    { name: "Unlimited feedback users" },
    { name: "50 comments per post" },
    { name: "Community support" },
    { name: "Community voting & discussions" },
  ],
};

/**
 * Sort benefits to put "Everything in..." at the front.
 */
export const sortBenefits = (benefits: Stripe.Product.MarketingFeature[]) => {
  const everythingInPrefix = "Everything in";
  let everythingInBenefit: Stripe.Product.MarketingFeature | undefined;
  const otherBenefits: Stripe.Product.MarketingFeature[] = [];

  for (const benefit of benefits) {
    if (benefit.name?.startsWith(everythingInPrefix)) {
      everythingInBenefit = benefit;
    } else {
      otherBenefits.push(benefit);
    }
  }

  if (everythingInBenefit) {
    return [everythingInBenefit, ...otherBenefits];
  }

  return otherBenefits;
};

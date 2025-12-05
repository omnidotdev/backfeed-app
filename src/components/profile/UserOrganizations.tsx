import type Stripe from "stripe";
import type { OrganizationFragment } from "@/generated/graphql";

export interface OrganizationRow extends OrganizationFragment {
  subscription: {
    subscriptionStatus: Stripe.Subscription.Status;
    toBeCanceled: boolean;
    currentPeriodEnd: number | null | undefined;
  };
}

// TODO: component

import { useToggleGroup } from "@ark-ui/react/toggle-group";
import {
  ToggleGroupItem,
  ToggleGroupProvider,
} from "@omnidotdev/thornberry/toggle-group";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import PricingCard from "@/components/pricing/PricingCard";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingMatrix from "@/components/pricing/PricingMatrix";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";
import { getPrices } from "@/server/functions/prices";
import { getSubscription } from "@/server/functions/subscriptions";

import type { Subscription } from "@/lib/providers/billing";

export const Route = createFileRoute("/pricing")({
  loader: async ({ context }) => {
    const prices = await getPrices();

    // Fetch subscriptions for all user's organizations
    const orgSubscriptions: Record<string, Subscription | null> = {};
    const organizations = context.session?.organizations ?? [];

    if (organizations.length > 0) {
      const subscriptionPromises = organizations.map(async (org) => {
        try {
          const subscription = await getSubscription({
            data: { organizationId: org.id },
          });
          return { orgId: org.id, subscription };
        } catch {
          return { orgId: org.id, subscription: null };
        }
      });

      const results = await Promise.all(subscriptionPromises);
      for (const { orgId, subscription } of results) {
        orgSubscriptions[orgId] = subscription;
      }
    }

    return { prices, orgSubscriptions };
  },
  head: () => ({ meta: createMetaTags({ title: "Pricing" }) }),
  component: PricingPage,
});

// Override the toggle's default sizing and colors so the switch reads as a brand-filled pill
const PRICING_MODEL_ITEM_CLASS_NAME =
  "h-auto min-w-0 flex-1 rounded-none px-6 py-2 font-normal text-base text-foreground transition-none hover:bg-transparent hover:text-foreground focus-visible:ring-offset-0 data-[state=on]:bg-[var(--colors-brand-primary)] data-[state=on]:text-background";

function PricingPage() {
  const { prices, orgSubscriptions } = Route.useLoaderData();

  const pricingModel = useToggleGroup({
    defaultValue: ["month"],
    deselectable: false,
  });

  const filteredPrices = useMemo(
    () =>
      prices.filter(
        (price) => price.recurring?.interval === pricingModel.value[0],
      ),
    [prices, pricingModel.value],
  );

  return (
    <div className="flex flex-col items-center">
      <PricingHeader />

      {/* pricing model toggle */}
      <div className="relative mb-4">
        <ToggleGroupProvider value={pricingModel}>
          <div className="relative mb-2 flex overflow-hidden rounded-full border border-border">
            <ToggleGroupItem
              value="month"
              className={PRICING_MODEL_ITEM_CLASS_NAME}
            >
              {app.pricingPage.pricingHeader.monthly}
            </ToggleGroupItem>

            <ToggleGroupItem
              value="year"
              className={PRICING_MODEL_ITEM_CLASS_NAME}
            >
              {app.pricingPage.pricingHeader.annual}
            </ToggleGroupItem>
          </div>
        </ToggleGroupProvider>

        <span className="absolute top-[-0.5rem] right-[-0.5rem] rotate-[10deg] rounded-sm bg-[var(--colors-brand-primary-500)] px-2 font-semibold text-white text-xs shadow-sm dark:bg-[var(--colors-brand-primary-400)] dark:text-[var(--colors-neutral-900)]">
          {app.pricingPage.pricingHeader.savings}
        </span>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 xl:flex-row xl:items-stretch">
        <PricingCard price={undefined} orgSubscriptions={orgSubscriptions} />

        {filteredPrices.map((price) => (
          <PricingCard
            key={price.id}
            price={price}
            orgSubscriptions={orgSubscriptions}
          />
        ))}
      </div>

      <PricingMatrix className="my-6 max-w-5xl self-center" />

      <PricingFAQ className="mb-6 w-full max-w-5xl self-center px-4" />
    </div>
  );
}

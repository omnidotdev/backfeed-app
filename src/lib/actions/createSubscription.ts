"use server";

import { revalidatePath } from "next/cache";

import { auth } from "auth";
import { polar } from "lib/polar";
import { FREE_TIER_PRODUCT_ID } from "lib/polar/productIds";

interface Options {
  /** Organization ID */
  organizationId: string;
}

const createSubscription = async ({ organizationId }: Options) => {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const checkout = await polar.checkouts.create({
    // NB: this currently only works for free tier products. See: https://discord.com/channels/1078611507115470849/1390343751003541615/1392423210259189801
    products: [FREE_TIER_PRODUCT_ID],
    externalCustomerId: session.user.hidraId!,
    metadata: {
      backfeedOrganizationId: organizationId,
    },
  });

  await polar.checkouts.clientConfirm({
    clientSecret: checkout.clientSecret,
    checkoutConfirmStripe: {
      productId: FREE_TIER_PRODUCT_ID,
      customerEmail: session.user.email!,
    },
  });

  revalidatePath("/profile/[userId]/organizations");
  revalidatePath("/organizations/[organizationSlug]/settings");
  revalidatePath("/pricing");
};

export default createSubscription;

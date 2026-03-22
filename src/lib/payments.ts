import Stripe from "stripe";

if (!process.env.STRIPE_API_KEY) {
  console.warn("STRIPE_API_KEY not set — Stripe billing disabled");
}

/**
 * Stripe SDK.
 * Constructed with empty key when unconfigured so the app boots; API calls
 * will fail at request time with an auth error.
 * @see https://github.com/stripe/stripe-node
 */
const payments = new Stripe(process.env.STRIPE_API_KEY ?? "");

export default payments;

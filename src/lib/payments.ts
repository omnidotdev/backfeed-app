import Stripe from "stripe";

/**
 * Stripe SDK.
 * @see https://github.com/stripe/stripe-node
 */
const payments = new Stripe(process.env.STRIPE_API_KEY!);

export default payments;

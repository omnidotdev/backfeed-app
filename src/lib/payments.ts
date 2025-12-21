import dotenv from "dotenv";
import Stripe from "stripe";

// load environment variables (Nitro doesn't load these automatically)
dotenv.config({ path: ".env.local" });

/**
 * Stripe SDK.
 * @see https://github.com/stripe/stripe-node
 */
const payments = new Stripe(process.env.STRIPE_API_KEY!);

export default payments;

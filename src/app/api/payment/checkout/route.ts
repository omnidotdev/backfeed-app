import { Checkout } from "@polar-sh/nextjs";

/**
 * Payment checkout route.
 */
export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/confirmation`,
  // NB: Use `sandbox` if you're using the sandbox environment - else use 'production' or omit the parameter
  server: "sandbox",
});

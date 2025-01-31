import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    switch (payload.type) {
      case "checkout.created":
        // Handle the checkout created event
        console.log("Checkout created", payload);
        break;
      case "subscription.created":
        // Handle the subscription created event
        console.log("Subscription created", payload);
        break;
      default:
        // Handle unknown event
        console.log("Unknown event", payload.type);
        break;
    }
  },
});

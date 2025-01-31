import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    switch (payload.type) {
      case "checkout.created":
        // Handle the checkout created event
        console.log("Checkout created", payload);
        break;
      case "checkout.updated":
        // Handle the checkout updated event
        console.log("Checkout updated", payload);
        break;
      case "subscription.created":
        // Handle the subscription created event
        console.log("Subscription created", payload);
        break;
      case "subscription.updated":
        // Handle the subscription updated event
        console.log("Subscription updated", payload);
        break;
      case "subscription.active":
        // Handle the subscription active event
        console.log("Subscription active", payload);
        break;
      case "subscription.revoked":
        // Handle the subscription revoked event
        console.log("Subscription revoked", payload);
        break;
      case "subscription.canceled":
        // Handle the subscription canceled event
        console.log("Subscription canceled", payload);
        break;
      default:
        // Handle unknown event
        console.log("Unknown event", payload.type);
        break;
    }
  },
});

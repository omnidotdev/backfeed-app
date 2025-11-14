import { API_BASE_URL } from "lib/config";

type Primitive = string | number | boolean;

interface Options {
  /** The product IDs you wish to provide to the user as options during checkout. */
  productIds: string[];
  /** The external customer ID associated with the payment provider's record (i.e. `hidraId`) */
  customerExternalId: string;
  /** User's email. */
  customerEmail?: string;
  /** Additional metadata to attach to the subscription. */
  metadata?: Record<string, Primitive>;
}

/**
 * Utility to construct a valid checkout route in a typesafe manner.
 */
const getCheckoutRoute = ({
  productIds,
  customerExternalId,
  customerEmail,
  metadata,
}: Options) =>
  `${API_BASE_URL}/checkout?${productIds.map((id) => `products=${id}&`).join("")}&customerExternalId=${customerExternalId}${customerEmail ? `&customerEmail=${customerEmail}` : ""}${metadata ? `&metadata=${encodeURIComponent(JSON.stringify(metadata))}` : ""}`;

export default getCheckoutRoute;

"use client";

import { Button } from "@omnidev/sigil";

import { Link } from "components/core";

import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate";

interface Props {
  /** Customer information. */
  customer: PromiseSettledResult<CustomerState>;
}

/**
 * Customer portal component. If customer exists, redirects to Polar's customer portal to manage subscriptions, purchases, etc.
 */
const CustomerPortal = ({ customer }: Props) => {
  if (customer.status === "rejected") {
    return (
      <Link href="/pricing">
        <Button>Subscribe</Button>
      </Link>
    );
  }

  return (
    <Link href={`/api/customer/portal?customerId=${customer.value.id}`}>
      <Button>Manage Subscriptions</Button>
    </Link>
  );
};

export default CustomerPortal;

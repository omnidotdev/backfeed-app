"use client";

import { Button } from "@omnidev/sigil";

import { Link } from "components/core";
import { app } from "lib/config";

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
        <Button>{app.profilePage.portal.actions.subscribe.label}</Button>
      </Link>
    );
  }

  return (
    <Link href={`/api/customer/portal?customerId=${customer.value.id}`}>
      <Button>{app.profilePage.portal.actions.manageSubscription.label}</Button>
    </Link>
  );
};

export default CustomerPortal;

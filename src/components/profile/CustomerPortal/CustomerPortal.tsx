"use client";

import { Button } from "@omnidev/sigil";

import { Link } from "components/core";

import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate";

interface Props {
  customer: CustomerState;
}

const CustomerPortal = ({ customer }: Props) => (
  <Link href={`/api/customer/portal?customerId=${customer.id}`}>
    <Button>Manage Subscriptions</Button>
  </Link>
);

export default CustomerPortal;

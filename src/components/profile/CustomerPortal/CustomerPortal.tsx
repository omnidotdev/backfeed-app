"use client";

import { Button, Link } from "@omnidev/sigil";

import { useAuth } from "lib/hooks";

/**
 * Customer portal button. Redirects the user to Polar's customer portal to view and manage subscriptions and payments.
 */
const CustomerPortal = () => {
  const { user } = useAuth();

  if (!user?.customerId) {
    return <Button disabled>Click Me. You won't.</Button>;
  }

  return (
    <Link
      href={`/api/customer/portal?customerId=${user?.customerId}`}
      textDecoration="none"
    >
      <Button>Oh shit, you will.</Button>
    </Link>
  );
};

export default CustomerPortal;

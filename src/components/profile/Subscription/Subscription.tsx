"use client";

import {
  Button,
  Flex,
  Link as SigilLink,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@omnidev/sigil";
import Link from "next/link";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";
import { useSubscription } from "lib/hooks/queries";
import { capitalizeFirstLetter } from "lib/util";

import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate";

interface Props {
  /** Customer details. */
  customer: PromiseSettledResult<CustomerState>;
}

/**
 * Details of the user's subscription.
 */
const Subscription = ({ customer }: Props) => {
  // TODO: handle / verify subscription states (i.e. pending, active, cancelled)
  const { data: subscription } = useSubscription({
    enabled: customer.status !== "rejected",
  });

  if (customer.status === "rejected") {
    return (
      <SectionContainer title={app.profilePage.subscription.title}>
        <Link href="/pricing">
          <Button>
            {app.profilePage.subscription.actions.subscribe.label}
          </Button>
        </Link>
      </SectionContainer>
    );
  }

  // TODO: improve responsive design, add loading states
  return (
    <SectionContainer title={app.profilePage.subscription.title}>
      <Table
        headerContent={
          <TableRow>
            <TableHeader fontWeight="bold">Product Name</TableHeader>
            <TableHeader fontWeight="bold">Status</TableHeader>
            <TableHeader fontWeight="bold">Amount</TableHeader>
            <TableHeader />
          </TableRow>
        }
      >
        <TableRow fontSize={{ base: "sm", md: "lg" }}>
          <TableCell>{subscription?.product.name}</TableCell>
          <TableCell display="flex" alignItems="center" gap={2}>
            <Flex h={2} w={2} borderRadius="full" bgColor="brand.tertiary" />
            {capitalizeFirstLetter(subscription?.status)}
          </TableCell>
          <TableCell>
            ${(subscription?.amount ?? 0) / 100}/
            {subscription?.recurringInterval}
          </TableCell>
          <TableCell display="flex" justifyContent="flex-end">
            {/* NB: `SigilLink` is used to avoid initial CORS issues on external domain prefetching for the redirect */}
            <SigilLink
              href={`/api/customer/portal?customerId=${customer.value.id}`}
            >
              <Button size={{ base: "sm", md: "md" }}>Manage</Button>
            </SigilLink>
          </TableCell>
        </TableRow>
      </Table>
    </SectionContainer>
  );
};

export default Subscription;

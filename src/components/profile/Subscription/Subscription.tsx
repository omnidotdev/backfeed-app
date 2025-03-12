"use client";

import {
  Button,
  Flex,
  Icon,
  Link as SigilLink,
  Table,
  TableCell,
  TableRow,
} from "@omnidev/sigil";
import Link from "next/link";
import { LuSettings } from "react-icons/lu";

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
      <SectionContainer
        title={app.profilePage.subscription.title}
        description={app.profilePage.subscription.description}
      >
        <Link href="/pricing">
          <Button>
            {app.profilePage.subscription.actions.subscribe.label}
          </Button>
        </Link>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      title={app.profilePage.subscription.title}
      description={app.profilePage.subscription.description}
      p={0}
      titleProps={{
        px: 4,
        pt: 4,
      }}
      descriptionProps={{
        px: 4,
      }}
    >
      <Table
        headerContent={
          <TableRow bgColor="transparent">
            {Object.values(app.profilePage.subscription.headers).map(
              (header) => (
                <TableCell key={header} fontWeight="bold">
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        }
      >
        <TableRow fontSize={{ base: "sm", md: "lg" }} bgColor="transparent">
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
              <Button variant="icon" aria-label="Manage Subscription">
                <Icon src={LuSettings} />
              </Button>
            </SigilLink>
          </TableCell>
        </TableRow>
      </Table>
    </SectionContainer>
  );
};

export default Subscription;

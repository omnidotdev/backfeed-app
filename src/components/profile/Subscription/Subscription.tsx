"use client";

import {
  Button,
  Circle,
  Flex,
  HStack,
  Icon,
  Link as SigilLink,
  Skeleton,
  Stack,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LuSettings } from "react-icons/lu";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";
import { subscriptionOptions } from "lib/options";
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
  const { user } = useAuth();

  const {
    data: subscription,
    error,
    // NB: although the query is prefetched, if the customer exists but their subscription is not `active`, an error will be thrown. This puts the query into a loading state initially.
    // The above does not effect the rendering when a user does have an active subscription, in that case the data should be instantly available upon render, and `isLoading` should be `false`.
    isLoading,
  } = useQuery(
    subscriptionOptions({
      hidraId: user?.hidraId,
      enabled: customer.status !== "rejected",
    })
  );

  return (
    <SectionContainer
      title={app.profilePage.subscription.title}
      description={app.profilePage.subscription.description}
      p={0}
      titleProps={{
        px: 4,
        mt: 4,
      }}
      descriptionProps={{
        px: 4,
      }}
    >
      {isLoading ? (
        <Skeleton h={18} m={4} />
      ) : customer.status === "rejected" || error ? (
        <Stack mx={4} mb={4}>
          <Text>{app.profilePage.subscription.emptyState.label}</Text>
          <Link href="/pricing">
            <Button>
              {app.profilePage.subscription.actions.subscribe.label}
            </Button>
          </Link>
        </Stack>
      ) : (
        <Flex w="100%" overflowX="auto">
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
            textWrap="nowrap"
          >
            <TableRow fontSize={{ base: "sm", md: "lg" }} bgColor="transparent">
              <TableCell>{subscription?.product.name}</TableCell>

              <TableCell>
                <HStack>
                  <Circle size={2} bgColor="brand.tertiary" />

                  {capitalizeFirstLetter(subscription?.status)}
                </HStack>
              </TableCell>

              <TableCell>
                ${(subscription?.amount ?? 0) / 100}/
                {subscription?.recurringInterval}
              </TableCell>

              <TableCell>
                <Flex justify="flex-end">
                  {/* NB: `SigilLink` is used to avoid initial CORS issues on external domain prefetching for the redirect */}
                  <SigilLink
                    href={`/api/customer/portal?customerId=${customer.value.id}`}
                    textDecoration="none"
                  >
                    <Button>
                      <Icon src={LuSettings} h={4} w={4} />

                      {
                        app.profilePage.subscription.actions.manageSubscription
                          .label
                      }
                    </Button>
                  </SigilLink>
                </Flex>
              </TableCell>
            </TableRow>
          </Table>
        </Flex>
      )}
    </SectionContainer>
  );
};

export default Subscription;

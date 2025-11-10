"use client";

import { Button, Flex, Skeleton, Stack } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

import { app } from "lib/config";
import { subscriptionOptions } from "lib/options";

import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate";

interface Props {
  /** Customer details. */
  customer: PromiseSettledResult<CustomerState>;
}

/**
 * Details of the user's subscriptions.
 */
const Subscription = ({ customer }: Props) => {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: subscription,
    error,
    // NB: although the query is prefetched, if the customer exists but their subscription is not `active`, an error will be thrown. This puts the query into a loading state initially.
    // The above does not effect the rendering when a user does have an active subscription, in that case the data should be instantly available upon render, and `isLoading` should be `false`.
    isLoading,
  } = useQuery(
    subscriptionOptions({
      hidraId: userId,
      enabled: customer.status !== "rejected",
    }),
  );

  if (isLoading) return <Skeleton h={18} m={4} />;

  if (customer.status === "rejected" || error)
    return (
      <Stack>
        {app.profileSubscriptionsPage.table.emptyState.label}
        <Flex>
          <Link href="/pricing">
            <Button>
              {app.profileSubscriptionsPage.table.actions.subscribe.label}
            </Button>
          </Link>
        </Flex>
      </Stack>
    );

  return (
    <Flex w="100%" overflowX="auto">
      TODO
      {/** TODO: refactor the below to use react table and map over individual subscriptions */}
      {/* <Table */}
      {/*   headerContent={ */}
      {/*     <TableRow bgColor="transparent"> */}
      {/*       {Object.values(app.profileSubscriptionsPage.table.headers).map( */}
      {/*         (header) => ( */}
      {/*           <TableCell key={header} fontWeight="bold"> */}
      {/*             {header} */}
      {/*           </TableCell> */}
      {/*         ), */}
      {/*       )} */}
      {/*     </TableRow> */}
      {/*   } */}
      {/*   textWrap="nowrap" */}
      {/* > */}
      {/*   <TableRow fontSize={{ base: "sm", md: "lg" }} bgColor="transparent"> */}
      {/*     <TableCell>{subscription?.product.name}</TableCell> */}
      {/**/}
      {/*     <TableCell> */}
      {/*       <HStack> */}
      {/*         <Circle size={2} bgColor="brand.tertiary" /> */}
      {/**/}
      {/*         {capitalizeFirstLetter(subscription?.status)} */}
      {/*       </HStack> */}
      {/*     </TableCell> */}
      {/**/}
      {/*     <TableCell> */}
      {/*       ${(subscription?.amount ?? 0) / 100}/ */}
      {/*       {subscription?.recurringInterval} */}
      {/*     </TableCell> */}
      {/**/}
      {/*     <TableCell> */}
      {/*       <Flex justify="flex-end"> */}
      {/*         {/* NB: `SigilLink` is used to avoid initial CORS issues on external domain prefetching for the redirect */}
      {/*         <SigilLink */}
      {/*           href={`${API_BASE_URL}/portal?customerId=${customer.value.id}`} */}
      {/*           textDecoration="none" */}
      {/*         > */}
      {/*           <Button> */}
      {/*             <Icon src={LuSettings} h={4} w={4} /> */}
      {/**/}
      {/*             { */}
      {/*               app.profileSubscriptionsPage.table.actions */}
      {/*                 .manageSubscription.label */}
      {/*             } */}
      {/*           </Button> */}
      {/*         </SigilLink> */}
      {/*       </Flex> */}
      {/*     </TableCell> */}
      {/*   </TableRow> */}
      {/* </Table> */}
    </Flex>
  );
};

export default Subscription;

import { SubscriptionRecurringInterval } from "@polar-sh/sdk/models/components/subscriptionrecurringinterval";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

// TODO: try to figure out how to properly import Role enum from generated artifacts. Error as this file is used on the server as well as the client.
enum Role {
  Admin = "admin",
  Member = "member",
  Owner = "owner",
}

/**
 * Search parameters.
 */
const searchParams = {
  search: parseAsString.withDefault(""),
  roles: parseAsArrayOf(parseAsStringEnum<Role>(Object.values(Role))),
  page: parseAsInteger.withDefault(DEFAULT_PAGE_NUMBER),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  pricingModel: parseAsStringEnum<SubscriptionRecurringInterval>(
    Object.values(SubscriptionRecurringInterval),
  ).withDefault(SubscriptionRecurringInterval.Month),
  excludedStatuses: parseAsArrayOf(parseAsString).withDefault([]),
  orderBy: parseAsString,
};

export default searchParams;

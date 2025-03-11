import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

export enum OrganizationsFilter {
  /** All organiztions. */
  All = "all",
  /** Organizations that the user created. */
  Yours = "yours",
  /** Organizations that the user is active in. */
  Active = "active",
}

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
  organizationsFilter: parseAsStringEnum<OrganizationsFilter>(
    Object.values(OrganizationsFilter)
  ).withDefault(OrganizationsFilter.All),
};

export default searchParams;

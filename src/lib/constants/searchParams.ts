import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

// @knipignore: snippet
export enum OrganizationsFilter {
  /** All organiztions. */
  All = "all",
  /** Organizations that the user created. */
  Yours = "yours",
  /** Organizations that the user is active in. */
  Active = "active",
}

/**
 * Search parameters.
 */
const searchParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(DEFAULT_PAGE_NUMBER),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  organizationsFilter: parseAsStringEnum<OrganizationsFilter>([
    ...Object.values(OrganizationsFilter),
  ]).withDefault(OrganizationsFilter.All),
};

export default searchParams;

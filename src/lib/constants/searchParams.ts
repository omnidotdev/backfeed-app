import { parseAsInteger, parseAsString, parseAsBoolean } from "nuqs/server";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

/**
 * Search parameters.
 */
const searchParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(DEFAULT_PAGE_NUMBER),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  userOrganizations: parseAsBoolean.withDefault(false),
};

export default searchParams;

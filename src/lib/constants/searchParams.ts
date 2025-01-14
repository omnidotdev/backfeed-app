import { parseAsInteger, parseAsString } from "nuqs/server";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

/**
 * Search parameters.
 */
const searchParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(DEFAULT_PAGE_NUMBER),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
};

export default searchParams;

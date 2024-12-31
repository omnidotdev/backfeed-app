import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

/**
 * Access and update search paramaters.
 */
const useSearchParams = () =>
  useQueryStates({
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(DEFAULT_PAGE_NUMBER),
    pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  });

export default useSearchParams;

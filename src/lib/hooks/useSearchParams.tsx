import { parseAsString, useQueryStates } from "nuqs";

/**
 * Access and update search paramaters.
 */
const useSearchParams = () =>
  useQueryStates({
    search: parseAsString.withDefault(""),
  });

export default useSearchParams;

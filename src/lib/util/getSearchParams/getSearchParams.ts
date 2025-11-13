import { createSearchParamsCache } from "nuqs/server";

// NB: relative import prevents circular dependency
import searchParams from "../searchParams";

/**
 * Access search paramaters from the server.
 * NB: the cache is used rather than the loader for futureproofing. It allows access to the search params from deeply nested RSCs. See https://nuqs.47ng.com/docs/server-side#cache
 */
const getSearchParams = createSearchParamsCache(searchParams);

export default getSearchParams;

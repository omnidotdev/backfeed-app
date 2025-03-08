import { createSearchParamsCache } from "nuqs/server";

import { searchParams } from "lib/util";

/**
 * Access search paramaters from the server.
 * NB: the cache is used rather than the loader for future proofing purposes. It allows access to the search params from deeply nested RSCs. See: https://nuqs.47ng.com/docs/server-side#cache
 */
const getSearchParams = createSearchParamsCache(searchParams);

export default getSearchParams;

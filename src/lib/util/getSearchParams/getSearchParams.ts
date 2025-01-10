import { createLoader } from "nuqs/server";

import { searchParams } from "lib/constants";

/**
 * Access search paramaters from the server.
 */
const getSearchParams = createLoader(searchParams);

export default getSearchParams;
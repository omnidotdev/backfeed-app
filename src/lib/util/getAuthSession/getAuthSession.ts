import { cache } from "react";

import { auth } from "auth";

/**
 * Get a cached authentication session from the server.
 */
const getAuthSession = cache(auth);

export default getAuthSession;

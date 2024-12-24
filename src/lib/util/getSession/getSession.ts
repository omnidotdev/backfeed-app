import { cache } from "react";

import { auth } from "auth";

/**
 * Get a cached session from the server.
 */
const getSession = cache(auth);

export default getSession;

"use server";

import { auth } from "auth";
import { cache } from "react";

/**
 * Get a cached authentication session from the server.
 */
const getAuthSession = cache(auth);

export default getAuthSession;

import { setupServer } from "msw/node";

import * as handlers from "__mocks__/handlers";

/**
 * MSW Node.js server for server-side contexts.
 */
const mswNodeServer = setupServer(...Object.values(handlers));

export default mswNodeServer;

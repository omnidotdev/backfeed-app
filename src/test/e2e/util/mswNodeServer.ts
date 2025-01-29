import * as handlers from "__mocks__/handlers";
import { setupServer } from "msw/node";

/**
 * MSW Node.js server for server-side contexts.
 */
const mswNodeServer = setupServer(...Object.values(handlers));

export default mswNodeServer;

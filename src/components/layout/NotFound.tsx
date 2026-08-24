import { NotFoundPage } from "@omnidotdev/thornberry/not-found";

import app from "@/lib/config/app.config";

/**
 * 404 not found. Renders the shared Omni `<NotFoundPage>` (in-shell,
 * theme-aware, prominent "404"), branded with Backfeed's wordmark and header
 * logomark. Home points at the app root.
 */
const NotFound = () => (
  <NotFoundPage
    appName={app.name}
    appLogo={<img src="/img/logo.png" alt="" width={48} height={24} />}
  />
);

export default NotFound;

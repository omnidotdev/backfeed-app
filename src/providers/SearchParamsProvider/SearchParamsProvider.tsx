import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { ReactNode } from "react";

/**
 * Search parameters provider.
 */
const SearchParamsProvider = ({ children }: { children: ReactNode }) => (
  <NuqsAdapter>{children}</NuqsAdapter>
);

export default SearchParamsProvider;

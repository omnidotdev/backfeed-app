import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { PropsWithChildren } from "react";

/**
 * Search parameters provider.
 */
const SearchParamsProvider = ({ children }: PropsWithChildren) => (
  <NuqsAdapter>{children}</NuqsAdapter>
);

export default SearchParamsProvider;

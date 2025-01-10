import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Creates a single query client that can be reused across all server components.
 * NB: As Next.js no longer dedupes requests that utilize fetch, using a signle query client has its benefits. See https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#alternative-use-a-single-queryclient-for-prefetching for more details.
 */
const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;

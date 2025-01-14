import { useQueryStates } from "nuqs";

import { searchParams } from "lib/constants";

/**
 * Access and update search paramaters from the client.
 */
const useSearchParams = () => useQueryStates(searchParams);

export default useSearchParams;

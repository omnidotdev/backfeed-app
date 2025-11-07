import { searchParams } from "lib/util";
import { useQueryStates } from "nuqs";

/**
 * Access and update search paramaters from the client.
 */
const useSearchParams = () => useQueryStates(searchParams);

export default useSearchParams;

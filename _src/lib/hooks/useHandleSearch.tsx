import { useDebounceCallback } from "usehooks-ts";

import { DEBOUNCE_TIME } from "lib/constants";
import { useSearchParams } from "lib/hooks";

import type { ChangeEvent } from "react";

interface Options {
  /** Debounce delay in milliseconds. */
  delay?: number;
}

/**
 * Custom hook for handling search input with debounce functionality. Updates search parameters based on user input.
 */
const useHandleSearch = ({ delay = DEBOUNCE_TIME }: Options = {}) => {
  const [, setSearchParams] = useSearchParams();

  return useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      search: e.target.value.length ? e.target.value.toLowerCase() : "",
    });
  }, delay);
};

export default useHandleSearch;

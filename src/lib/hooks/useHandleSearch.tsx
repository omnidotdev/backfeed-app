import { useDebounceCallback } from "usehooks-ts";

import { useSearchParams } from "lib/hooks";

import type { ChangeEvent } from "react";

const DEFAULT_DELAY = 300;

interface Options {
  /** Debounce delay in milliseconds. */
  delay?: number;
}

/**
 * Custom hook for handling search input with debounce functionality. Updates search parameters based on user input.
 */
const useHandleSearch = ({ delay = DEFAULT_DELAY }: Options = {}) => {
  const [, setSearchParams] = useSearchParams();

  return useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      search: e.target.value.length ? e.target.value.toLowerCase() : "",
    });
  }, delay);
};

export default useHandleSearch;

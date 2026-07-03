import { useNavigate } from "@tanstack/react-router";
import { useDebounceCallback } from "usehooks-ts";

import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";

import type { ChangeEvent } from "react";

interface Options {
  /** Debounce delay in milliseconds. */
  delay?: number;
  /**
   * Called with the value pushed to the URL when the debounce fires. Lets a
   * controlled input tell its own echo (this navigate) apart from an external
   * search change, so it does not clobber characters typed while in flight.
   */
  onNavigate?: (value: string) => void;
}

/**
 * Custom hook for handling search input with debounce functionality. Updates search parameters based on user input.
 */
const useHandleSearch = ({
  delay = DEBOUNCE_TIME,
  onNavigate,
}: Options = {}) => {
  const navigate = useNavigate();

  return useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.length ? e.target.value : "";
    onNavigate?.(value);
    navigate({
      // @ts-expect-error TODO: have to properly type the route this hook is called from (search has to be a valid param)
      search: (prev) => ({
        ...prev,
        search: value,
      }),
    });
  }, delay);
};

export default useHandleSearch;

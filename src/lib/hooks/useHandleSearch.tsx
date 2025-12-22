import { useNavigate } from "@tanstack/react-router";
import { useDebounceCallback } from "usehooks-ts";

import DEBOUNCE_TIME from "@/lib/constants/debounceTime.constant";

import type { ChangeEvent } from "react";

interface Options {
  /** Debounce delay in milliseconds. */
  delay?: number;
}

/**
 * Custom hook for handling search input with debounce functionality. Updates search parameters based on user input.
 */
const useHandleSearch = ({ delay = DEBOUNCE_TIME }: Options = {}) => {
  const navigate = useNavigate();

  return useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    navigate({
      // @ts-expect-error TODO: have to properly type the route this hook is called from (search has to be a valid param)
      search: (prev) => ({
        ...prev,
        search: e.target.value.length ? e.target.value : "",
      }),
    });
  }, delay);
};

export default useHandleSearch;

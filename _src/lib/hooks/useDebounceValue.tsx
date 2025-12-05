"use client";

import { useDebounceValue as useHooksDebounceValue } from "usehooks-ts";

const DEFAULT_DELAY = 300;

interface Options<T> {
  /** Value to debounce. */
  value: T;
  /** Debounce delay in milliseconds. */
  delay?: number;
}

/**
 * Custom hook that returns a debounced version of the provided value, along with a function to update it.
 */
const useDebounceValue = <T,>({ value, delay = DEFAULT_DELAY }: Options<T>) =>
  useHooksDebounceValue(value, delay);

export default useDebounceValue;

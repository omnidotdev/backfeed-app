"use client";

import { useTimeout } from "@omnidev/sigil";
import { useState } from "react";

interface DataState {
  /** Whether the data is loading. */
  isLoading: boolean;
  /** Whether an error was encountered while loading the data. */
  isError?: boolean;
}

interface Options {
  /** Timeout to simulate asynchronous data fetching. Defaults to 300 (ms). */
  timeout?: number;
}

const RANDOM_ERROR_PROBABILITY = Math.random() < 0.1;

/**
 * Access data lifecycle state.
 */
const useDataState = ({ timeout = 300 }: Options = {}) => {
  const [dataState, setDataState] = useState<DataState>({
    isLoading: true,
    isError: undefined,
  });

  useTimeout(
    () =>
      setDataState({
        isLoading: false,
        isError: RANDOM_ERROR_PROBABILITY,
      }),
    timeout
  );

  return dataState;
};

export default useDataState;

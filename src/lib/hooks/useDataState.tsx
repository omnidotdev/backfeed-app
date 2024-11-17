import { useTimeout } from "@omnidev/sigil";
import { useState } from "react";

interface DataState {
  isLoading: boolean;
  isError?: boolean;
}

interface Options {
  timeout?: number;
}

const useDelay = ({ timeout = 300 }: Options = {}) => {
  const [dataState, setDataState] = useState<DataState>({
    isLoading: true,
    isError: undefined,
  });

  useTimeout(
    () =>
      setDataState({
        isLoading: false,
        isError: Math.random() < 0.5,
      }),
    timeout
  );

  return dataState;
};

export default useDelay;

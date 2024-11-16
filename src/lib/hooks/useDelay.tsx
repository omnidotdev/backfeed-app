import { useTimeout } from "@omnidev/sigil";
import { useState } from "react";

interface Options {
  timeout?: number;
}

const useDelay = ({ timeout = 300 }: Options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useTimeout(() => setIsLoaded(true), timeout);

  return isLoaded;
};

export default useDelay;

"use client";

import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

import { getDialogStore } from "store";

import type { DialogType } from "store";

interface Options {
  /** Dialog type. */
  type: DialogType | undefined;
}

/**
 * Hook for managing the open state of dialogs.
 */
const useDialogStore = ({ type }: Options) => {
  if (!type) return { isOpen: false, setIsOpen: () => null };
  
  const store = getDialogStore({ type });

  return useStoreWithEqualityFn(store, (state) => state, shallow);
};

export default useDialogStore;

"use client";

import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

import { getDialogStore } from "store";

import type { DialogType } from "store";

interface Options {
  /** Dialog type. */
  type?: DialogType;
}

/**
 * Hook for managing the open state of dialogs.
 */
const useDialogStore = ({ type }: Options) => {
  const store = getDialogStore({ type });

  if (!store) return;

  return useStoreWithEqualityFn(store, (state) => state, shallow);
};

export default useDialogStore;

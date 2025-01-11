"use client";

import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

import { getDialogStore } from "store";

import type { DialogType } from "store";

/**
 * Hook for managing the open state of dialogs.
 */
const useDialogStore = ({ type }: { type: DialogType }) =>
  useStoreWithEqualityFn(getDialogStore({ type }), (state) => state, shallow);

export default useDialogStore;

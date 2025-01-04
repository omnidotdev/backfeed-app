"use client";

import { Store, useStore } from "@tanstack/react-store";

export enum DialogType {
  /** Dialog for creating a new organization. */
  CreateOrganization = "createOrganization",
  /** Dialog for creating a new project. */
  CreateProject = "createProject",
}

const dialogStore = new Store(
  Object.fromEntries(Object.values(DialogType).map((type) => [type, false]))
);

interface Options {
  /** Dialog type. */
  type: DialogType;
}

/**
 * Hook for managing the open state of dialogs.
 */
const useDialogStore = ({ type }: Options) => {
  const isOpen = useStore(dialogStore, (state) => state[type]);

  const setIsOpen = (isOpen: boolean) =>
    dialogStore.setState((state) => ({ ...state, [type]: isOpen }));

  return {
    isOpen,
    setIsOpen,
  };
};

export default useDialogStore;

import { createStore } from "zustand";

export enum DialogType {
  /** Dialog for creating a new organization. */
  CreateOrganization = "createOrganization",
  /** Dialog for creating a new project. */
  CreateProject = "createProject",
}

interface DialogState {
  /** Whether the dialog is open. */
  isOpen: boolean;
}

interface DialogActions {
  /** Set the dialog open state. */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Create a dialog store.
 */
const createDialogStore = () =>
  createStore<DialogState & DialogActions>()((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
  }));

const defaultDialogStores = new Map<
  DialogType,
  ReturnType<typeof createDialogStore>
>();

/**
 * Retrieve a dialog store.
 */
const getDialogStore = ({ type }: { type?: DialogType }) => {
  if (!type) return;

  if (!defaultDialogStores.has(type)) {
    defaultDialogStores.set(type, createDialogStore());
  }

  return defaultDialogStores.get(type)!;
};

export default getDialogStore;

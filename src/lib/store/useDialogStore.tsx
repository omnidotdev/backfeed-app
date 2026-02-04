import { createStore } from "zustand";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

export enum DialogType {
  /** Dialog for creating a new project. */
  CreateProject = "createProject",
  /** Dialog for creating a post. */
  CreatePost = "createPost",
  /** Dialog for adding an owner to a workspace. */
  AddOwner = "addOwner",
  /** Dialog for managing the mobile sidebar navigation and actions. */
  MobileSidebar = "mobileSidebar",
  /** Dialog for inviting a member to a workspace. */
  InviteMember = "inviteMember",
  /** Dialog for creating a new workspace from pricing page. */
  CreateWorkspace = "createWorkspace",
  /** Fallback value to handle undefined cases. This value is not to be used to control any dialog states. */
  Fallback = "fallback",
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
const getDialogStore = ({ type }: { type: DialogType }) => {
  if (!defaultDialogStores.has(type)) {
    defaultDialogStores.set(type, createDialogStore());
  }

  return defaultDialogStores.get(type)!;
};

interface Options {
  /** Dialog type. */
  type: DialogType;
}

/**
 * Hook for managing the open state of dialogs.
 */
const useDialogStore = ({ type }: Options) => {
  const store = getDialogStore({ type });

  return useStoreWithEqualityFn(store, (state) => state, shallow);
};

export default useDialogStore;

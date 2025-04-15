import { createStore } from "zustand";

export enum DialogType {
  /** Dialog for creating a new organization. */
  CreateOrganization = "createOrganization",
  /** Dialog for creating a new project. */
  CreateProject = "createProject",
  /** Dialog for adding an owner to an organization. */
  AddOwner = "addOwner",
  /** Dialog for managing the mobile sidebar navigation and actions. */
  MobileSidebar = "mobileSidebar",
  /** Dialog for inviting a member to an organization. */
  InviteMember = "inviteMember",
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

export default getDialogStore;

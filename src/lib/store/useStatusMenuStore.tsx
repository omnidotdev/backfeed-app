import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

interface StatusMenuStore {
  /** Whether a status menu is currently open. */
  isStatusMenuOpen: boolean;
  /** Handler to toggle status menu open state. */
  setIsStatusMenuOpen: (isStatusMenuOpen: boolean) => void;
}

/**
 * Status menu store.
 */
const useStatusMenuStore = createWithEqualityFn<StatusMenuStore>()(
  (set) => ({
    isStatusMenuOpen: false,
    setIsStatusMenuOpen: (isStatusMenuOpen) => set({ isStatusMenuOpen }),
  }),
  shallow,
);

export default useStatusMenuStore;

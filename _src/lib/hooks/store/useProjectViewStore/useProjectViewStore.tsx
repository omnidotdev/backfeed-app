import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

export enum ViewState {
  List = "List",
  Grid = "Grid",
}

interface ProjectViewStoreState {
  viewState: ViewState;
}

interface ProjectViewStoreActions {
  setViewState: (viewState: ViewState) => void;
}

const initialProjectViewStoreState: ProjectViewStoreState = {
  viewState: ViewState.List,
};

const useProjectViewStore = createWithEqualityFn<
  ProjectViewStoreState & ProjectViewStoreActions
>()(
  persist(
    (set) => ({
      ...initialProjectViewStoreState,
      setViewState: (viewState) => set({ viewState }),
    }),
    {
      name: "project-view-store",
    },
  ),
);

export default useProjectViewStore;

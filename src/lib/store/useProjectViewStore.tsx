import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
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
  shallow,
);

export default useProjectViewStore;

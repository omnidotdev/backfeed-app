import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export enum ViewState {
  List = "List",
  Grid = "Grid",
  Roadmap = "Roadmap",
}

/** Order the view cycles through when toggled via the `v` shortcut. */
const VIEW_ORDER = [ViewState.List, ViewState.Grid, ViewState.Roadmap];

interface ProjectViewStoreState {
  viewState: ViewState;
}

interface ProjectViewStoreActions {
  setViewState: (viewState: ViewState) => void;
  /** Advance to the next view, wrapping back to the first. */
  cycleViewState: () => void;
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
      cycleViewState: () =>
        set((state) => {
          const next =
            VIEW_ORDER[
              (VIEW_ORDER.indexOf(state.viewState) + 1) % VIEW_ORDER.length
            ];
          return { viewState: next };
        }),
    }),
    {
      name: "project-view-store",
    },
  ),
  shallow,
);

export default useProjectViewStore;

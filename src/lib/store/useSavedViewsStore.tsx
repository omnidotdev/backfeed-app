import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import type { PostOrderBy } from "@/generated/graphql";

/** A saved feed filter/sort combination for a project. */
export interface SavedView {
  id: string;
  name: string;
  search: {
    excludedStatuses: string[];
    tags: string[];
    search: string;
    // narrowed to the sort options the route's search schema accepts
    orderBy: PostOrderBy.CreatedAtDesc | PostOrderBy.VotesCountDesc;
  };
}

interface SavedViewsState {
  /** Saved views keyed by project rowId. */
  views: Record<string, SavedView[]>;
}

interface SavedViewsActions {
  addView: (projectId: string, view: SavedView) => void;
  removeView: (projectId: string, id: string) => void;
}

const useSavedViewsStore = createWithEqualityFn<
  SavedViewsState & SavedViewsActions
>()(
  persist(
    (set) => ({
      views: {},
      addView: (projectId, view) =>
        set((state) => ({
          views: {
            ...state.views,
            [projectId]: [...(state.views[projectId] ?? []), view],
          },
        })),
      removeView: (projectId, id) =>
        set((state) => ({
          views: {
            ...state.views,
            [projectId]: (state.views[projectId] ?? []).filter(
              (view) => view.id !== id,
            ),
          },
        })),
    }),
    {
      name: "backfeed-saved-views-store",
    },
  ),
  shallow,
);

export default useSavedViewsStore;

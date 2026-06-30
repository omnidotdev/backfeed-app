import { Portal } from "@ark-ui/react/portal";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { LuBookmark, LuPlus, LuX } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import useSavedViewsStore from "@/lib/store/useSavedViewsStore";
import toaster from "@/lib/util/toaster";

const projectRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/",
);

/**
 * Saved views. Save the current feed filter/sort/tag combination under a name
 * (per project, persisted locally) and re-apply it later, the GitHub
 * saved-search pattern.
 */
const SavedViews = () => {
  const { projectId } = projectRoute.useLoaderData();
  const search = projectRoute.useSearch();
  const navigate = useNavigate({
    from: "/workspaces/$workspaceSlug/projects/$projectSlug",
  });

  const views = useSavedViewsStore((state) => state.views[projectId] ?? []);
  const addView = useSavedViewsStore((state) => state.addView);
  const removeView = useSavedViewsStore((state) => state.removeView);

  const saveCurrent = () => {
    const name = window.prompt("Name this view");
    if (!name?.trim()) return;

    addView(projectId, {
      id: crypto.randomUUID(),
      name: name.trim(),
      search: {
        excludedStatuses: search.excludedStatuses,
        tags: search.tags,
        search: search.search,
        orderBy: search.orderBy,
      },
    });
    toaster.success({ title: "View saved" });
  };

  return (
    <MenuRoot positioning={{ placement: "bottom-end" }}>
      <MenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 border-border-subtle"
        >
          <LuBookmark className="size-4" />
          <span className="hidden sm:inline">Views</span>
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuPositioner>
          <MenuContent className="min-w-48">
            <MenuItemGroup>
              {views.length ? (
                views.map((view) => (
                  <MenuItem
                    key={view.id}
                    value={view.id}
                    className="justify-between gap-4"
                    onClick={() =>
                      navigate({ search: () => ({ ...view.search }) })
                    }
                  >
                    <span className="truncate">{view.name}</span>

                    <button
                      type="button"
                      aria-label={`Delete ${view.name}`}
                      className="text-foreground-subtle hover:text-foreground"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        removeView(projectId, view.id);
                      }}
                    >
                      <LuX className="size-3.5" />
                    </button>
                  </MenuItem>
                ))
              ) : (
                <div className="px-2 py-1.5 text-foreground-subtle text-sm">
                  No saved views
                </div>
              )}

              <MenuItem value="__save" onClick={saveCurrent}>
                <LuPlus className="size-4" />
                Save current view
              </MenuItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </MenuRoot>
  );
};

export default SavedViews;

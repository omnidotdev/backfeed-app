import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import app from "@/lib/config/app.config";

export const Route = createFileRoute(
  "/_app/workspaces/$workspaceSlug/_layout/_manage",
)({
  beforeLoad: async ({ context: { session }, location }) => {
    // Management routes require authentication
    if (!session?.user?.rowId) {
      throw redirect({
        to: "/",
        search: { returnTo: location.href },
      });
    }
  },
  component: ManageWorkspaceLayout,
});

const tabClass =
  "flex items-center gap-2 border-transparent border-b-2 px-3 py-3 font-medium text-neutral-500 text-sm transition-colors hover:text-foreground dark:text-neutral-400 [&.active]:border-[var(--colors-brand-primary)] [&.active]:text-foreground";

function ManageWorkspaceLayout() {
  const { role } = Route.useRouteContext();
  const { workspaceSlug } = Route.useParams();

  return (
    <div className="flex w-full flex-col px-0 lg:px-4">
      <nav className="flex items-center gap-1 border-b px-2">
        <Link
          to="/workspaces/$workspaceSlug/members"
          params={{ workspaceSlug }}
          className={tabClass}
        >
          <HiOutlineUserGroup className="size-4" />
          {app.workspaceMembersPage.breadcrumb}
        </Link>

        {role && (
          <Link
            to="/workspaces/$workspaceSlug/settings"
            params={{ workspaceSlug }}
            className={tabClass}
          >
            <LuSettings className="size-4" />
            {app.workspaceSettingsPage.breadcrumb}
          </Link>
        )}
      </nav>

      <Outlet />
    </div>
  );
}

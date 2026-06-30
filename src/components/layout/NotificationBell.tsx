import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import {
  LuActivity,
  LuAtSign,
  LuBell,
  LuReply,
  LuSmilePlus,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationsReadMutation,
  useNotificationsQuery,
  useUnreadNotificationCountQuery,
} from "@/generated/graphql";
import useNotificationStream from "@/lib/hooks/useNotificationStream";
import {
  notificationsOptions,
  unreadNotificationCountOptions,
} from "@/lib/options/notifications";
import { buildFeedbackKey } from "@/lib/util/feedbackUrl";
import cn from "@/lib/utils";

import type { IconType } from "react-icons";
import type { NotificationsQuery } from "@/generated/graphql";

type NotificationItem = NotificationsQuery["myNotifications"][number];

const NOTIFICATION_LIMIT = 30;

/** Icon shown for each notification kind. */
const ICONS: Record<string, IconType> = {
  mention: LuAtSign,
  reply: LuReply,
  reaction: LuSmilePlus,
  status_change: LuActivity,
};

/** One-line summary for a notification. */
const describe = (notification: NotificationItem): string => {
  const actor = notification.actor?.username
    ? `@${notification.actor.username}`
    : "Someone";

  switch (notification.type) {
    case "mention":
      return `${actor} mentioned you`;
    case "reply":
      return `${actor} replied to you`;
    case "reaction":
      return `${actor} reacted ${notification.emoji ?? ""}`.trim();
    case "status_change":
      return notification.statusName
        ? `Status changed to ${notification.statusName}`
        : "Status changed";
    default:
      return "New notification";
  }
};

/**
 * Header notification bell: shows an unread badge (polled) and, on open, the
 * current user's recent notifications. Clicking one marks it read and deep-links
 * to its post; a header action marks all read.
 */
const NotificationBell = () => {
  const { session } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const signedIn = !!session?.user?.rowId;

  // realtime push (SSE); the polling below is the fallback if the stream drops
  useNotificationStream({ enabled: signedIn, limit: NOTIFICATION_LIMIT });

  const { data: unreadCount } = useQuery({
    ...unreadNotificationCountOptions(),
    enabled: signedIn,
  });

  const { data, isLoading } = useQuery({
    ...notificationsOptions({ limit: NOTIFICATION_LIMIT }),
    // only fetch the list while the menu is open; the badge keeps polling
    enabled: signedIn && isOpen,
  });
  const notifications = data?.myNotifications ?? [];

  const invalidate = () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: useUnreadNotificationCountQuery.getKey(),
      }),
      queryClient.invalidateQueries({
        queryKey: useNotificationsQuery.getKey({ limit: NOTIFICATION_LIMIT }),
      }),
    ]);

  const { mutate: markRead } = useMarkNotificationsReadMutation({
    onSuccess: invalidate,
  });
  const { mutate: markAllRead } = useMarkAllNotificationsReadMutation({
    onSuccess: invalidate,
  });

  const handleSelect = (notification: NotificationItem) => {
    if (!notification.isRead) markRead({ ids: [notification.id] });
    setIsOpen(false);

    const workspaceSlug = session?.organizations?.find(
      (org) => org.id === notification.organizationId,
    )?.slug;

    if (workspaceSlug && notification.projectSlug && notification.postNumber) {
      navigate({
        to: "/workspaces/$workspaceSlug/projects/$projectSlug/$feedbackId",
        params: {
          workspaceSlug,
          projectSlug: notification.projectSlug,
          feedbackId: buildFeedbackKey({
            number: notification.postNumber,
            title: notification.postTitle,
          }),
        },
      });
    }
  };

  if (!signedIn) return null;

  const badge = unreadCount?.unreadNotificationCount ?? 0;

  return (
    <MenuRoot
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
      positioning={{ placement: "bottom-end" }}
    >
      <MenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={
            badge ? `Notifications (${badge} unread)` : "Notifications"
          }
        >
          <LuBell className="size-5" />
          {badge > 0 && (
            <span className="-right-0.5 -top-0.5 absolute flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-medium text-[0.625rem] text-primary-foreground leading-none">
              {badge > 9 ? "9+" : badge}
            </span>
          )}
        </Button>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent className="max-h-[28rem] w-80 max-w-[90vw] overflow-y-auto p-0">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="font-medium text-sm">Notifications</span>
            {badge > 0 && (
              <button
                type="button"
                className="text-foreground-subtle text-xs hover:text-foreground"
                onClick={() => markAllRead({})}
              >
                Mark all read
              </button>
            )}
          </div>

          <MenuSeparator className="my-0" />

          {isLoading ? (
            <div className="px-3 py-8 text-center text-foreground-subtle text-sm">
              Loading...
            </div>
          ) : notifications.length ? (
            notifications.map((notification) => {
              const Icon = ICONS[notification.type] ?? LuBell;
              return (
                <MenuItem
                  key={notification.id}
                  value={notification.id}
                  onClick={() => handleSelect(notification)}
                  className={cn(
                    "items-start gap-2 rounded-none px-3 py-2",
                    !notification.isRead && "bg-primary/5",
                  )}
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-foreground-subtle" />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm">
                      {describe(notification)}
                    </span>
                    {notification.postTitle && (
                      <span className="truncate text-foreground-subtle text-xs">
                        {notification.postTitle}
                      </span>
                    )}
                    <span className="text-foreground-subtle text-xs">
                      {dayjs(notification.createdAt).fromNow()}
                    </span>
                  </span>
                </MenuItem>
              );
            })
          ) : (
            <div className="px-3 py-8 text-center text-foreground-subtle text-sm">
              You're all caught up
            </div>
          )}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
};

export default NotificationBell;

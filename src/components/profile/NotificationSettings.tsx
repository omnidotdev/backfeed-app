import { useQueryClient } from "@tanstack/react-query";

import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot,
  SwitchThumb,
} from "@/components/ui/switch";
import {
  useMyNotificationPreferenceQuery,
  useSetNotificationPreferenceMutation,
} from "@/generated/graphql";
import toaster from "@/lib/util/toaster";

/**
 * Email notification settings for the current user. Currently a single opt-out:
 * status-change emails for feedback the user reported or upvoted (defaults on).
 */
const NotificationSettings = () => {
  const queryClient = useQueryClient();

  const { data } = useMyNotificationPreferenceQuery();
  const postUpdates = data?.myNotificationPreference?.postUpdates ?? true;

  const { mutate: setPreference } = useSetNotificationPreferenceMutation({
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: useMyNotificationPreferenceQuery.getKey(),
      }),
    onError: () =>
      toaster.error({ title: "Could not update notification settings" }),
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg">Notifications</h2>

      <div className="flex items-center justify-between gap-4 rounded-lg border border-border-subtle p-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">Status updates</span>
          <span className="text-foreground-subtle text-sm">
            Email me when feedback I reported or upvoted changes status.
          </span>
        </div>

        <SwitchRoot
          aria-label="Email me about status updates"
          checked={postUpdates}
          onCheckedChange={({ checked }) =>
            setPreference({ postUpdates: checked })
          }
        >
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <SwitchHiddenInput />
        </SwitchRoot>
      </div>
    </div>
  );
};

export default NotificationSettings;

import { HStack, Skeleton, Text, VStack } from "@omnidev/sigil";
import dayjs from "dayjs";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

import type { FlexProps, SkeletonProps } from "@omnidev/sigil";

interface StatusHistoryItem extends SkeletonProps {
  /** Status history item title. */
  title: string;
  /** Status history item value. */
  value: string;
}

interface Props extends FlexProps {
  /** Current feedback status. */
  status: "New" | "Planned" | "In Progress" | "Complete";
  /** Date feedback was created. */
  createdAt: string;
  /** Date feedback status was last updated. */
  updatedAt: string;
  /** Whether the status history data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the status history data encountered an error. */
  isError?: boolean;
}

/**
 * Feedback status history section.
 */
const StatusHistory = ({
  status,
  createdAt,
  updatedAt,
  isLoaded = true,
  isError = false,
  ...rest
}: Props) => {
  const STATUS_HISTORY: StatusHistoryItem[] = [
    {
      title: app.feedbackPage.statusHistory.currentStatus,
      value: status,
      minW: !isLoaded ? 24 : undefined,
    },
    {
      title: app.feedbackPage.statusHistory.created,
      value: dayjs(createdAt).format("MMM D, YYYY"),
    },
    {
      title: app.feedbackPage.statusHistory.updated,
      value: dayjs(updatedAt).format("MMM D, YYYY"),
    },
  ];

  return (
    <SectionContainer
      title={app.feedbackPage.statusHistory.title}
      description={app.feedbackPage.statusHistory.description}
      {...rest}
    >
      <VStack>
        {STATUS_HISTORY.map(({ title, value, ...rest }) => (
          <HStack key={title} w="full" justify="space-between">
            <Text color="foreground.muted">{title}</Text>

            <Skeleton
              isLoaded={isLoaded}
              minW={!isLoaded ? 32 : undefined}
              {...rest}
            >
              <Text>{isError ? "Error" : value}</Text>
            </Skeleton>
          </HStack>
        ))}
      </VStack>
    </SectionContainer>
  );
};

export default StatusHistory;

import { Button, Stack, Textarea } from "@omnidev/sigil";
import { LuMessageSquare } from "react-icons/lu";

import { CommentCard } from "components/feedback";
import { SectionContainer } from "components/layout";
import { app } from "lib/config";

const COMMENTS = {
  totalCount: 4,
  data: [
    {
      id: "1",
      senderName: "Back Feed",
      message: "I still like turtles.",
      date: "2024-11-01T00:00:00.000Z",
    },
    {
      id: "2",
      senderName: "Feed Back",
      message: "The new dashboard layout is much more intuitive!",
      date: "2024-04-02T00:00:00.000Z",
    },
    {
      id: "3",
      senderName: "Fed Front",
      message: "Having issues with the new export feature.",
      date: "2024-01-03T00:00:00.000Z",
    },
    {
      id: "4",
      senderName: "Back Fed",
      message: "Would love to be able to export feedback.",
      date: "2023-01-04T00:00:00.000Z",
    },
  ],
};

/**
 * Feedback comments section.
 */
const Comments = () => (
  <SectionContainer
    title={`${app.feedbackPage.comments.title} (${COMMENTS.totalCount})`}
    description={app.feedbackPage.comments.description}
    icon={LuMessageSquare}
  >
    <Stack>
      <Textarea
        placeholder={app.feedbackPage.comments.textAreaPlaceholder}
        borderColor="border.subtle"
        fontSize="sm"
        minH={28}
      />

      <Button w="fit-content" placeSelf="flex-end">
        {app.feedbackPage.comments.submit}
      </Button>

      <Stack gap={4} mt={4}>
        {COMMENTS.data.map(({ id, senderName, message, date }) => (
          <CommentCard
            key={id}
            senderName={senderName}
            message={message}
            date={date}
            w="full"
          />
        ))}
      </Stack>
    </Stack>
  </SectionContainer>
);

export default Comments;

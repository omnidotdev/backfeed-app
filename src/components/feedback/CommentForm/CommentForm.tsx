"use client";

import { Button, Stack, Text, Textarea, sigil } from "@omnidev/sigil";

import { app } from "lib/config";

interface Props {
  /** Total number of comments. */
  totalCount: number;
}

const CommentForm = ({ totalCount }: Props) => {
  return (
    <sigil.form display="flex" flexDirection="column" gap={2}>
      <Textarea
        placeholder={app.feedbackPage.comments.textAreaPlaceholder}
        borderColor="border.subtle"
        fontSize="sm"
        minH={16}
        disabled
      />

      <Stack justify="space-between" direction="row">
        <Text fontSize="sm" color="foreground.muted">
          {`${totalCount} ${app.feedbackPage.comments.totalComments}`}
        </Text>

        <Button w="fit-content" placeSelf="flex-end" disabled>
          {app.feedbackPage.comments.submit}
        </Button>
      </Stack>
    </sigil.form>
  );
};

export default CommentForm;

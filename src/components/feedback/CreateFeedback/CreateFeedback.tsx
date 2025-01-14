"use client";

import { Button, Input, Skeleton, Stack, Text, Textarea } from "@omnidev/sigil";

import { app } from "lib/config";

interface Props {
  /** Loading state for current feedback. */
  isLoading: boolean;
  /** Error state for current feedback. */
  isError: boolean;
  /** Total feedback for the project. */
  totalCount: number;
}

/**
 * Create feedback form.
 */
const CreateFeedback = ({ isLoading, isError, totalCount }: Props) => {
  return (
    <>
      <Input
        placeholder={app.projectPage.projectFeedback.inputPlaceholder}
        borderColor="border.subtle"
        fontSize="sm"
      />

      <Textarea
        placeholder={app.projectPage.projectFeedback.textareaPlaceholder}
        borderColor="border.subtle"
        fontSize="sm"
        rows={5}
        minH={32}
      />

      <Stack justify="space-between" direction="row">
        <Skeleton isLoaded={!isLoading} h="fit-content">
          <Text
            fontSize="sm"
            color="foreground.muted"
          >{`${isError ? 0 : totalCount} ${app.projectPage.projectFeedback.totalResponses}`}</Text>
        </Skeleton>

        <Button
          w="fit-content"
          placeSelf="flex-end"
          // TODO: discuss if disabling this button (mutation) is the right approach if an error is encountered fetching the comments
          disabled={isLoading || isError}
        >
          {app.projectPage.projectFeedback.submit}
        </Button>
      </Stack>
    </>
  );
};

export default CreateFeedback;

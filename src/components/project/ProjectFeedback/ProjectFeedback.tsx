import { Box, Button, Grid, Stack, useDisclosure } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";

import { SkeletonArray } from "components/core";
import { ErrorBoundary, SectionContainer } from "components/layout";
import { CreateFeedbackDialog, ProjectResponse } from "components/project";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { ResponseType } from "components/dashboard";

/**
 * Represents a post within a project.
 */
export interface Response {
  /** Unique identifier for the post. */
  id: string;
  /** Title of the post. */
  title: string;
  /** Description providing more details about the post. */
  description: string;
  /** The ID of the project this post belongs to. */
  projectId: string;
  /** The ID of the user who created the post. */
  userId: string;
  /** Timestamp when the post was last updated. */
  lastUpdated: string;
  /** Type of post (e.g., feature request, bug report, etc.). */
  type: ResponseType;
}

const RESPONSES: Response[] = [
  {
    id: "b25a9f2e-0b6f-42e4-b2d9-3f8e8e7ec1c1",
    title: "Enhance Mobile UX",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
    projectId: "project1",
    userId: "user1",
    lastUpdated: "2024-11-05T18:40:27.761Z",
    type: "Positive",
  },
  {
    id: "fb1de8c3-413e-452c-a4d8-98dc7a89f3f2",
    title: "Add Dark Mode",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
    projectId: "project2",
    userId: "user2",
    lastUpdated: "2024-11-17T18:40:27.761Z",
    type: "Bug",
  },
  {
    id: "c761fb6d-62b3-47b5-b3c1-6572f7e523c2",
    title: "Improve Dashboard Analytics",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
    projectId: "project3",
    userId: "user3",
    lastUpdated: "2024-11-12T18:40:27.761Z",
    type: "Feature",
  },
  {
    id: "cbe8b752-dc2d-4ad9-b191-6c68a64d5d74",
    title: "Optimize Page Load Times",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
    projectId: "project4",
    userId: "user4",
    lastUpdated: "2024-11-14T12:00:00.000Z",
    type: "Bug",
  },
  {
    id: "ab83f88e-59c5-4c9e-b997-09a22f8f81ec",
    title: "Integrate AI Chatbot",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
    projectId: "project5",
    userId: "user5",
    lastUpdated: "2024-11-16T15:30:00.000Z",
    type: "Positive",
  },
  {
    id: "d2baf2c5-497c-464b-9b91-327ea59202c5",
    title: "Streamline Signup Process",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta modi cupiditate deleniti perspiciatis illo animi odio rerum placeat veritatis cumque deserunt dolore, distinctio, libero eaque a harum voluptatum ullam?",
    projectId: "project6",
    userId: "user6",
    lastUpdated: "2024-11-10T09:45:00.000Z",
    type: "Feature",
  },
];

/**
 * Project feedback.
 */
const ProjectFeedback = () => {
  const { isLoading, isError } = useDataState();

  const {
    isOpen: isCreatePostDialogOpen,
    onOpen: onCreatePostDialogOpen,
    onClose: onCreatePostDialogClose,
  } = useDisclosure();

  return (
    <SectionContainer
      // TODO: move to app config
      title={app.projectPage.projectFeedback.title}
      icon={HiOutlineFolder}
      h="100%"
    >
      <Stack h="100%" gap={6}>
        <Button onClick={onCreatePostDialogOpen}>Create Feedback</Button>

        {/* Feed */}
        <Box flex={1} overflow="hidden">
          {isError ? (
            <ErrorBoundary message="Error fetching recent feedback" h={32} />
          ) : (
            <Grid
              // TODO: This scrollarea is not completed.
              maxH="100%"
              overflow="auto"
              // NB: The 1px padding is necessary to prevet clipping of the card borders / box shadows.
              p="1px"
              gap={6}
            >
              {isLoading ? (
                <SkeletonArray count={5} h={32} borderRadius="lg" w="100%" />
              ) : (
                RESPONSES.map((response) => (
                  <ProjectResponse key={response.id} response={response} />
                ))
              )}
            </Grid>
          )}
        </Box>
      </Stack>

      <CreateFeedbackDialog
        isOpen={isCreatePostDialogOpen}
        onClose={onCreatePostDialogClose}
        onOpen={onCreatePostDialogOpen}
        projectId=""
      />
    </SectionContainer>
  );
};

export default ProjectFeedback;

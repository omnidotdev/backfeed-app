import {
  useCreateDownvoteMutation,
  useCreateProjectMutation,
  useCreateUpvoteMutation,
} from "generated/graphql";

const PROJECT_MUTATION_KEY = ["project"];
export const CREATE_PROJECT_MUTATION_KEY = [
  ...PROJECT_MUTATION_KEY,
  ...useCreateProjectMutation.getKey(),
];

const FEEDBACK_MUTATION_KEY = ["feedback"];
export const CREATE_DOWNVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateDownvoteMutation.getKey(),
];
export const CREATE_UPVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateUpvoteMutation.getKey(),
];
export const DELETE_DOWNVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateDownvoteMutation.getKey(),
];
export const DELETE_UPVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateUpvoteMutation.getKey(),
];

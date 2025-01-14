import { useCreateProjectMutation } from "generated/graphql";

const PROJECT_MUTATION_KEY = ["project"];
export const CREATE_PROJECT_MUTATION_KEY = [...PROJECT_MUTATION_KEY, ...useCreateProjectMutation.getKey()];

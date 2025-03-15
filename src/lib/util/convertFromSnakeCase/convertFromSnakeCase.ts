import { capitalizeFirstLetter } from "lib/util";

/**
 * Converts a snake_case string to human-readable format.
 */
const convertFromSnakeCase = (str: string) => {
  const words = str.split("_");

  return words.map((word) => capitalizeFirstLetter(word)).join(" ");
};

export default convertFromSnakeCase;

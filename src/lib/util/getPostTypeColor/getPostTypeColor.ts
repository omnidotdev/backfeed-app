import { match } from "ts-pattern";

import type { ColorToken } from "generated/panda/tokens";

export type ResponseType = "Neutral" | "Positive" | "Bug" | "Feature";

/**
 * Returns the corresponding color for a given post type.
 */
const getResponseTypeColor = (type: ResponseType): ColorToken =>
  match(type)
    .with("Neutral", () => "foreground.subtle" as const)
    .with("Positive", () => "green" as const)
    .with("Bug", () => "red" as const)
    .with("Feature", () => "blue" as const)
    .exhaustive();

export default getResponseTypeColor;

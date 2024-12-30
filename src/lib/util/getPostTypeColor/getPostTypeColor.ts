import { match } from "ts-pattern";

export type ResponseType = "Neutral" | "Positive" | "Bug" | "Feature";

/**
 * Returns the corresponding color for a given post type.
 */
const getResponseTypeColor = (type: ResponseType): string =>
  match(type)
    .with("Neutral", () => "foreground.subtle")
    .with("Positive", () => "green")
    .with("Bug", () => "red")
    .with("Feature", () => "blue")
    .exhaustive();

export default getResponseTypeColor;

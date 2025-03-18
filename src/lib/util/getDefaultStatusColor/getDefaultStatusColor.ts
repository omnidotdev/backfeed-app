import { match } from "ts-pattern";

/**
 * Returns the color for the given status (based on default status options).
 */
const getDefaultStatusColor = (status: string) =>
  match(status)
    .with("Open", () => "blue")
    .with("Planned", () => "purple")
    .with("In Progress", () => "yellow")
    .with("Closed", () => "red")
    .with("Resolved", () => "green")
    .otherwise(() => undefined);

export default getDefaultStatusColor;

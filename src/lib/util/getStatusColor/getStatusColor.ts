import { match } from "ts-pattern";

import { Status } from "generated/graphql";

const getStatusColor = (status: Status) =>
  match(status)
    .with(Status.Open, () => "blue")
    .with(Status.Planned, () => "purple")
    .with(Status.InProgress, () => "yellow")
    .with(Status.Closed, () => "red")
    .with(Status.Resolved, () => "green")
    .exhaustive();

export default getStatusColor;

import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

// everytime modify models, prisma generates types based on the models
interface Props {
  status: Status;
}

// determine the label and colors for each status of an issue
const statusMap: Record<
  // type of keys
  Status,
  // type of values
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;

"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item value={status.value || " "} key={status.label}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;

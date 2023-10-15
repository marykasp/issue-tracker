import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueFilter from "./IssueFilter";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <Flex>
        <IssueFilter />
      </Flex>
    </Flex>
  );
};

export default IssueActions;

import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { IssueStatusBadge } from "../../components";

// Issue type is defined in Prisma client - creates types based on models when run a migration
const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;

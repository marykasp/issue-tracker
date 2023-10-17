import { Status } from "@prisma/client";
import prisma from "../../../prisma/client";
import Pagination from "../../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const Issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  // check if status in param is a valid status value
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  // fetch issues from database - filter based on query params
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    // number of records to fetch
    take: pageSize,
  });

  // retrieve the total number of issues
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

// opt out of static rendering - issues page now renders dynamically
export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default Issues;

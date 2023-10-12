import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../../validationSchemas";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  // validate body of request
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // if body of request is valid then find issue with given id
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // if issue exists update issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextResponse,
  { params }: { params: { id: string } },
) {
  // need to find issue with given id
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // if issue exists remove from db
  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}

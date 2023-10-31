import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "../../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // const session = await getServerSession(authOptions);
  // // unauthorized status
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  // validate body of request
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // is user is in body of request check if valid user
  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

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
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  // unauthorized status
  if (!session) return NextResponse.json({}, { status: 401 });

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

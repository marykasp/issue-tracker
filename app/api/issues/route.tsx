import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

// export async function GET(request: NextRequest) {
//   const issues = prisma.issue.findMany();

//   return NextResponse.json(issues, { status: 201 });
// }

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  // unauthorized status
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  // validate body of request
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // insert new issue into db
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

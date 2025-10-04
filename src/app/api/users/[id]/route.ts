import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/features/users/server/get-user";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const apiResult = await getUser(id);
  return NextResponse.json(apiResult);
}

import { NextRequest, NextResponse } from "next/server";
import { getRole } from "@/features/roles/server/actions/get-role";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const apiResult = await getRole(id);
  return NextResponse.json(apiResult);
}

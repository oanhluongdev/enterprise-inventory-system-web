import { listRoles } from "@/features/roles/server/actions/list-roles/list-roles";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const apiResult = await listRoles();
  return NextResponse.json(apiResult);
}

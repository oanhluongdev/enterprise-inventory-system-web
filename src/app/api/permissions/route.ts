import { NextResponse } from "next/server";
import { listPermission } from "@/features/roles/server/actions/list-permission/list-permission";

export async function GET(request: Request) {
  const apiResult = await listPermission();
  return NextResponse.json(apiResult);
}

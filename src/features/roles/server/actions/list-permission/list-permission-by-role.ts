"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { ListPermissionItem } from "./list-permission-item";

export const listPermissionByRoleId = async (
  roleId: string
): Promise<ApiResponse<ListPermissionItem[]>> => {
  return await httpGet<ListPermissionItem[]>(
    `/api/v1/permissions?roleId=${roleId}`
  );
};

"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { ListRolesItem } from "./list-role-item";

export const listRolesByUserId = async (
  userId: string
): Promise<ApiResponse<ListRolesItem[]>> => {
  return await httpGet<ListRolesItem[]>(`/api/v1/roles?user=${userId}`);
};

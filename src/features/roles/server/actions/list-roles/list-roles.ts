"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { ListRolesItem } from "./list-role-item";

export const listRoles = async (): Promise<ApiResponse<ListRolesItem[]>> => {
  return await httpGet<ListRolesItem[]>(`/api/v1/roles`);
};

"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { GetRoleResponse } from "./get-role-response";

export const getRole = async (
  id: string
): Promise<ApiResponse<GetRoleResponse>> => {
  return await httpGet<GetRoleResponse>(`/api/v1/roles/${id}`);
};

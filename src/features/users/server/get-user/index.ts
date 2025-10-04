"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { GetUserResponse } from "./get-user-response";

export const getUser = async (
  id: string
): Promise<ApiResponse<GetUserResponse>> => {
  return await httpGet<GetUserResponse>(`/api/v1/users/${id}`);
};

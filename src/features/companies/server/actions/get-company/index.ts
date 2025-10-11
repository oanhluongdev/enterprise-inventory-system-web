"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { GetCompanyResponse } from "./get-company-response";

export const getCompany = async (
  id: string
): Promise<ApiResponse<GetCompanyResponse>> => {
  return await httpGet<GetCompanyResponse>(`/api/v1/companies/${id}`);
};

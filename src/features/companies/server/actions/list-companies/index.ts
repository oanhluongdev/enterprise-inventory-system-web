"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { ListCompanyItem } from "./list-company-item";
import { OrderType, PaginatedResult } from "@/types/pagination";

export const listCompanies = async (
  page: number = 1,
  size: number = 10,
  order: OrderType = "asc",
  search: string = ""
): Promise<ApiResponse<PaginatedResult<ListCompanyItem>>> => {
  let url = `/api/v1/companies?page=${page}&size=${size}&order=${order}`;
  if (search && search !== "") {
    url += `&search=${search}`;
  }
  return await httpGet<PaginatedResult<ListCompanyItem>>(url);
};

"use server";

import { ApiResponse, httpGet } from "@/lib/http-helper";
import { ListUserItem } from "./list-user-item";
import { OrderType, PaginatedResult } from "@/types/pagination";

export const listUsers = async (
  page: number = 1,
  size: number = 10,
  order: OrderType = "asc",
  search: string = ""
): Promise<ApiResponse<PaginatedResult<ListUserItem>>> => {
  let url = `/api/v1/users?page=${page}&size=${size}&order=${order}`;
  if (search && search !== "") {
    url += `&search=${search}`;
  }
  return await httpGet<PaginatedResult<ListUserItem>>(url);
};

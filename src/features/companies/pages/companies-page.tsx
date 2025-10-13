import React from "react";
import { ListCompanyItem } from "../server/actions/list-companies/list-company-item";
import { ApiResponse } from "@/lib/http-helper";
import { CompanyTable } from "../components/company-table";
import { PaginatedResult } from "@/types/pagination";

interface CompaniesPageProps {
  listCompaniesResponse: Promise<ApiResponse<PaginatedResult<ListCompanyItem>>>;
}

export const CompaniesPage = ({
  listCompaniesResponse,
}: CompaniesPageProps) => {
  return (
    <>
      <CompanyTable listCompaniesResponse={listCompaniesResponse} />
    </>
  );
};

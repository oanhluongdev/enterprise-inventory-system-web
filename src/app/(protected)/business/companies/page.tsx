import React, { Suspense } from "react";
import { PageContainer } from "@/components/page-container";
import { SectionContainer } from "@/components/section-container";
import { TableLoading } from "@/components/table-loading";
import { CompaniesPage } from "@/features/companies/pages/companies-page";
import { SearchParams } from "@/types/search-param";
import { CompaniesPageTitle } from "@/features/companies/components/companies-page-title";
import { listCompanies } from "@/features/companies/server/actions/list-companies";

const Page = async (prop: { searchParams: SearchParams }) => {
  const searchParams = await prop.searchParams;
  const page = searchParams.page ? +searchParams.page : 1;
  const size = searchParams.size ? +searchParams.size : 10;
  const order = searchParams.order || "asc";
  const search = searchParams.search || "";
  const listCompaniesResponse = listCompanies(page, size, order, search);
  return (
    <PageContainer className="gap-2">
      <CompaniesPageTitle />
      <SectionContainer className="border-0">
        <Suspense fallback={<TableLoading />}>
          <CompaniesPage listCompaniesResponse={listCompaniesResponse} />
        </Suspense>
      </SectionContainer>
    </PageContainer>
  );
};

export default Page;

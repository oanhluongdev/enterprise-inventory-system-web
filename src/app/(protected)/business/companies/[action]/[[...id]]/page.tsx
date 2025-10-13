import React, { Suspense } from "react";
import { TableLoading } from "@/components/table-loading";
import { PageContainer } from "@/components/page-container";
import { SectionContainer } from "@/components/section-container";
import { CompanyPageTitle } from "@/features/companies/components/company-page-title";
import { CompanyPage } from "@/features/companies/pages/company-page";
import { FormActions } from "@/types/form-action";
import { GetCompanyResponse } from "@/features/companies/server/actions/get-company/get-company-response";
import { getCompany } from "@/features/companies/server/actions/get-company";

interface PageProps {
  params: Promise<{ action: FormActions; id?: string }>;
}
const Page = async ({ params }: PageProps) => {
  const id = (await params).id;
  const getCompanyApiResponse = id ? await getCompany(id) : undefined;
  const currentCompany: GetCompanyResponse | undefined =
    getCompanyApiResponse?.success && getCompanyApiResponse.data
      ? getCompanyApiResponse.data
      : undefined;
  return (
    <PageContainer className="gap-2">
      <CompanyPageTitle />
      <SectionContainer className="border-0">
        <Suspense fallback={<TableLoading />}>
          <CompanyPage params={params} company={currentCompany} />
        </Suspense>
      </SectionContainer>
    </PageContainer>
  );
};

export default Page;

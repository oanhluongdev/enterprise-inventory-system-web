import React, { Suspense } from "react";
import { TableLoading } from "@/components/table-loading";
import { PageContainer } from "@/components/page-container";
import { SectionContainer } from "@/components/section-container";
import { CompanyPageTitle } from "@/features/companies/components/company-page-title";
import { CompanyPage } from "@/features/companies/pages/company-page";
import { FormActions } from "@/types/form-action";
import { getCompany } from "@/features/companies/server/actions/get-company";

interface PageProps {
  params: Promise<{ action: FormActions; id?: string }>;
}
const Page = async ({ params }: PageProps) => {
  const id = (await params).id;
  const getCompanyApiResponse = id ? getCompany(id) : undefined;
  return (
    <PageContainer className="gap-2">
      <CompanyPageTitle />
      <SectionContainer className="border-0">
        <Suspense fallback={<TableLoading />}>
          <CompanyPage
            params={params}
            getCompanyResponse={getCompanyApiResponse}
          />
        </Suspense>
      </SectionContainer>
    </PageContainer>
  );
};

export default Page;

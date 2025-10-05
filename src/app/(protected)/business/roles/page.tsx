import React, { Suspense } from "react";
import { RolesPage } from "@/features/roles/pages/roles-page";
import { listRoles } from "@/features/roles/server/actions/list-roles/list-roles";
import { PageContainer } from "@/components/page-container";
import { SectionContainer } from "@/components/section-container";
import { TableLoading } from "@/components/table-loading";
import { RolesPageTitle } from "@/features/roles/components/roles-page-title";

const Page = () => {
  const listRolesResponse = listRoles();
  return (
    <PageContainer className="gap-2">
      <RolesPageTitle />
      <SectionContainer className="border-0">
        <Suspense fallback={<TableLoading />}>
          <RolesPage listRoleResponse={listRolesResponse} />
        </Suspense>
      </SectionContainer>
    </PageContainer>
  );
};
export default Page;

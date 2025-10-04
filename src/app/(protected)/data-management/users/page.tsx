import React, { Suspense } from "react";
import { PageContainer } from "@/components/page-container";
import { SectionContainer } from "@/components/section-container";
import { TableLoading } from "@/components/table-loading";
import { UsersPageTitle } from "@/features/users/components/users-page-title";
import { UsersPage } from "@/features/users/pages/users-page";
import { listUsers } from "@/features/users/server/list-users";
import { SearchParams } from "@/types/search-param";

const Page = async (prop: { searchParams: SearchParams }) => {
  const searchParams = await prop.searchParams;
  const page = searchParams.page ? +searchParams.page : 1;
  const size = searchParams.size ? +searchParams.size : 10;
  const order = searchParams.order || "asc";
  const search = searchParams.search || "";
  const listUsersResponse = listUsers(page, size, order, search);
  return (
    <PageContainer className="gap-2">
      <UsersPageTitle />
      <SectionContainer className="border-0">
        <Suspense fallback={<TableLoading />}>
          <UsersPage listUserResponse={listUsersResponse} />
        </Suspense>
      </SectionContainer>
    </PageContainer>
  );
};

export default Page;

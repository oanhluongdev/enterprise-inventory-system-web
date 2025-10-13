"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as resources from "@/resources/string-resources.json";
import { PageTitle } from "@/components/page-title";

export const CompanyPageTitle = () => {
  return (
    <PageTitle
      title={resources.company.companyDetail}
      rightActions={
        <Link href={`/business/companies`}>
          <Button size="sm" className="rounded-sm">
            {resources.company.companies}
          </Button>
        </Link>
      }
    />
  );
};

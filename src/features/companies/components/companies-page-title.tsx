"use client";

import React, { useCallback } from "react";
import { PlusIcon } from "lucide-react";
import * as resources from "@/resources/string-resources.json";
import { PageTitle } from "@/components/page-title";
import { useSearch } from "@/hooks/use-search";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const CompaniesPageTitle = () => {
  const pathname = usePathname();
  const onSearch = useSearch();

  const onSearchChange = useCallback(
    (search: string) => {
      onSearch(search);
    },
    [onSearch]
  );

  const onAddNew = () => {
    window.history.pushState(null, "", `${pathname}/add`);
  };

  return (
    <PageTitle
      title={resources.company.companies}
      showSearch={true}
      onSearchChange={onSearchChange}
      rightActions={
        <Button size="sm" className="rounded-sm" onClick={onAddNew}>
          <PlusIcon size={4} /> {resources.common.addNew}
        </Button>
      }
    />
  );
};

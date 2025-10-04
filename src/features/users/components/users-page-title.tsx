"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import * as resources from "@/resources/string-resources.json";
import { PageTitle } from "@/components/page-title";
import { useUserModal } from "@/hooks/use-user-modal";
import { FormActions } from "@/types/form-action";
import { useSearch } from "@/hooks/use-search";

export const UsersPageTitle = () => {
  const userModalState = useUserModal();
  const onSearch = useSearch();
  const handleAddNew = useCallback(() => {
    userModalState.onOpen("", FormActions.Add);
  }, [userModalState]);

  const onSearchChange = useCallback(
    (search: string) => {
      onSearch(search);
    },
    [onSearch]
  );

  return (
    <PageTitle
      title={resources.user.users}
      showSearch={true}
      onSearchChange={onSearchChange}
      rightActions={
        <Button size="sm" className="rounded-sm" onClick={handleAddNew}>
          <PlusIcon size={4} /> {resources.common.addNew}
        </Button>
      }
    />
  );
};

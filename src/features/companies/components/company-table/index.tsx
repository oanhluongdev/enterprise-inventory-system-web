"use client";

import React, { use, useCallback, useMemo, useState } from "react";
import { ApiResponse } from "@/lib/http-helper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/data-table";
import { FormActions } from "@/types/form-action";
import { ConfirmMessage } from "@/components/confirm-message";
import { ListCompanyItem } from "../../server/actions/list-companies/list-company-item";
import { createCompanyTableColumns } from "./company-table-column";
import * as resouces from "@/resources/string-resources.json";
import { PaginatedResult } from "@/types/pagination";
import { TablePagination } from "@/components/table-pagination";
import { useAction } from "@/hooks/use-action";
import { deleteCompany } from "../../server/actions/delete-company";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface CompanyTableProps {
  listCompaniesResponse: Promise<ApiResponse<PaginatedResult<ListCompanyItem>>>;
}

export const CompanyTable = ({ listCompaniesResponse }: CompanyTableProps) => {
  const listCompaniesResponseResult = use(listCompaniesResponse);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [currentSelectedId, setCurrentSelectedId] = useState<string>();
  const pathname = usePathname();
  const { data: session } = useSession();
  const companiesData = listCompaniesResponseResult.data?.items || [];
  const { execute: deleteActionExecute } = useAction(deleteCompany, {
    onSuccess() {
      setOpenConfirm(false);
      DisplayToastSuccess(resouces.company.messageDeleteCompanySuccess);
    },
    onError() {
      setOpenConfirm(false);
      DisplayToastError(resouces.company.messageDeleteCompanyFailed);
    },
  });
  const handleAction = useCallback(
    async (id: string, action: number | string) => {
      setCurrentSelectedId(id);
      switch (action) {
        case FormActions.View:
        case FormActions.Edit:
          window.history.pushState(null, "", `${pathname}/${action}/${id}`);
          break;
        case FormActions.Delete:
          setOpenConfirm(true);
          break;
      }
    },
    [pathname]
  );
  const tableColumns = useMemo(
    () =>
      createCompanyTableColumns(handleAction, session?.user.permissions || ""),
    [handleAction, session?.user.permissions]
  );
  const onConfirmCancel = useCallback(() => {
    setOpenConfirm(false);
  }, []);
  const onConfirmOK = useCallback(async () => {
    deleteActionExecute({ id: currentSelectedId });
  }, [currentSelectedId, deleteActionExecute]);

  return (
    <div className="flex flex-col w-full gap-y-2">
      <ScrollArea className="max-h-140">
        <DataTable
          columns={tableColumns}
          data={companiesData || []}
          headerClassName="last:w-[50px] first:w-[150px] last:text-center"
        />
      </ScrollArea>
      {companiesData.length > 0 && (
        <TablePagination
          totalPages={listCompaniesResponseResult.data?.totalPages || 0}
        />
      )}
      <ConfirmMessage
        isOpen={isOpenConfirm}
        title={resouces.common.applicationTitle}
        content={resouces.company.messageDeleteCompanyConfirm}
        onCancel={onConfirmCancel}
        onOK={onConfirmOK}
      />
    </div>
  );
};

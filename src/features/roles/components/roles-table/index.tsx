"use client";

import React, { use, useCallback, useState } from "react";
import { DataTable } from "@/components/data-table";
import { ConfirmMessage } from "@/components/confirm-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiResponse } from "@/lib/http-helper";
import { FormActions } from "@/types/form-action";
import { useRoleModal } from "@/hooks/use-role-modal";
import { useAction } from "@/hooks/use-action";
import * as resouces from "@/resources/string-resources.json";
import { ListRolesItem } from "../../server/actions/list-roles/list-role-item";
import { createColumns } from "./roles-table-columns";
import { deleteRole } from "../../server/actions/delete-role";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";

interface RoleTableProps {
  rolesResponse: Promise<ApiResponse<ListRolesItem[]>>;
}
export const RoleTable = ({ rolesResponse }: RoleTableProps) => {
  const roleList = use(rolesResponse);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [currentSelectedRoleId, setCurrentSelectedRoleId] = useState<string>();
  const { onOpen: onOpenRoleModal } = useRoleModal();
  const data = roleList.data;
  const { execute: deleteRoleExecute } = useAction(deleteRole, {
    onSuccess() {
      setOpenConfirm(false);
      DisplayToastSuccess(resouces.role.messageDeleteRoleSuccess);
    },
    onError() {
      setOpenConfirm(false);
      DisplayToastError(resouces.role.messageDeleteRoleFailed);
    },
  });

  const handleAction = useCallback(
    async (id: string, action: FormActions) => {
      setCurrentSelectedRoleId(id);
      switch (action) {
        case FormActions.View:
        case FormActions.Edit:
          onOpenRoleModal(id, action);
          break;
        case FormActions.Delete:
          setOpenConfirm(true);
          break;
      }
    },
    [onOpenRoleModal]
  );
  const columns = createColumns(handleAction);
  const onConfirmCancel = useCallback(() => {
    setOpenConfirm(false);
  }, []);
  const onConfirmOK = useCallback(async () => {
    deleteRoleExecute({ id: currentSelectedRoleId });
  }, [currentSelectedRoleId, deleteRoleExecute]);
  return (
    <ScrollArea className="max-h-140">
      <DataTable
        columns={columns}
        data={data || []}
        headerClassName="last:w-[50px] first:w-[300px] nth-[3]:w-[100px] nth-[3]:text-center last:text-center"
      />
      <ConfirmMessage
        isOpen={isOpenConfirm}
        title={resouces.common.applicationTitle}
        content={resouces.role.messageDeleteRoleConfirm}
        onCancel={onConfirmCancel}
        onOK={onConfirmOK}
      />
    </ScrollArea>
  );
};

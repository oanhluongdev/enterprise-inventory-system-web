"use client";

import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import { ApiResponse } from "@/lib/http-helper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/data-table";
import { useUserModal } from "@/hooks/use-user-modal";
import { FormActions } from "@/types/form-action";
import { ConfirmMessage } from "@/components/confirm-message";
import { ListUserItem } from "../../server/list-users/list-user-item";
import { createUserTableColumns } from "./user-table-column";
import * as resouces from "@/resources/string-resources.json";
import { PaginatedResult } from "@/types/pagination";
import { TablePagination } from "@/components/table-pagination";
import { useAction } from "@/hooks/use-action";
import { deleteUser } from "../../server/delete-user";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";
import { useSession } from "next-auth/react";

interface UserTableProps {
  listUserResponse: Promise<ApiResponse<PaginatedResult<ListUserItem>>>;
}

export const UserTable = ({ listUserResponse }: UserTableProps) => {
  const listUserResponseResult = use(listUserResponse);
  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const [currentSelectedUserId, setCurrentSelectedUserId] = useState<string>();
  const { onOpen: onOpenUserModal } = useUserModal();
  const { data: session } = useSession();
  const usersData = listUserResponseResult.data?.items || [];
  const { execute: deleteUserExecute } = useAction(deleteUser, {
    onSuccess() {
      setOpenConfirm(false);
      DisplayToastSuccess(resouces.user.messageDeleteUserSuccess);
    },
    onError() {
      setOpenConfirm(false);
      DisplayToastError(resouces.user.messageDeleteUserFailed);
    },
  });
  const handleAction = useCallback(
    async (id: string, action: number | string) => {
      setCurrentSelectedUserId(id);
      switch (action) {
        case FormActions.View:
        case FormActions.Edit:
        case FormActions.Reset:
          onOpenUserModal(id, action);
          break;
        case FormActions.Delete:
          setOpenConfirm(true);
          break;
      }
    },
    [onOpenUserModal]
  );
  const tableColumns = useMemo(
    () => createUserTableColumns(handleAction, session?.user.permissions || ""),
    [handleAction, session?.user.permissions]
  );
  const onConfirmCancel = useCallback(() => {
    setOpenConfirm(false);
  }, []);
  const onConfirmOK = useCallback(async () => {
    deleteUserExecute({ id: currentSelectedUserId });
  }, [currentSelectedUserId, deleteUserExecute]);

  return (
    <div className="flex flex-col w-full gap-y-2">
      <ScrollArea className="max-h-140">
        <DataTable
          columns={tableColumns}
          data={usersData || []}
          headerClassName="last:w-[50px] first:w-[150px] nth-[3]:w-[100px] nth-[3]:text-center last:text-center"
        />
      </ScrollArea>
      {usersData.length > 0 && (
        <TablePagination
          totalPages={listUserResponseResult.data?.totalPages || 0}
        />
      )}
      <ConfirmMessage
        isOpen={isOpenConfirm}
        title={resouces.common.applicationTitle}
        content={resouces.user.messageDeleteUserConfirm}
        onCancel={onConfirmCancel}
        onOK={onConfirmOK}
      />
    </div>
  );
};

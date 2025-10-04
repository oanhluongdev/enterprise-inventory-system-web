"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ListPermissionItem } from "../../server/actions/list-permission/list-permission-item";
import { ApiResponse } from "@/lib/http-helper";
import { PermissionTable } from "../permission-table/permission-table";
import * as resouces from "@/resources/string-resources.json";
import { useRoleModal } from "@/hooks/use-role-modal";
import { FormActions } from "@/types/form-action";
import { Label } from "@/components/ui/label";
import { GetRoleResponse } from "../../server/actions/get-role/get-role-response";

export const ViewRoleForm = () => {
  const [loading, setLoading] = useState(false);
  const roleModalState = useRoleModal((state) => state);
  const [error, setError] = useState<string>();
  const [permissionList, setPermissionsList] = useState<ListPermissionItem[]>(
    []
  );
  const [role, setRole] = useState<GetRoleResponse>();

  const loadData = useCallback(async () => {
    setLoading(true);
    const listPermissionsPromise = fetch("/api/permissions");
    const getRolePromise = fetch(`/api/roles/${roleModalState.id}`);
    const [listPermissionsResponse, getRoleResponse] = await Promise.all([
      listPermissionsPromise,
      getRolePromise,
    ]);
    const listPermissionsResponseData =
      (await listPermissionsResponse.json()) as ApiResponse<
        ListPermissionItem[]
      >;
    if (listPermissionsResponseData.success) {
      setPermissionsList(listPermissionsResponseData.data || []);
    } else {
      setError(listPermissionsResponseData.message);
    }
    const roleResponseData =
      (await getRoleResponse.json()) as ApiResponse<GetRoleResponse>;
    if (roleResponseData.success) {
      setRole(roleResponseData.data);
    } else {
      setError(roleResponseData.message);
    }
    setLoading(false);
  }, [roleModalState.id]);

  useEffect(() => {
    if (roleModalState.open && roleModalState.formAction === FormActions.View) {
      setPermissionsList([]);
      loadData();
    }
  }, [roleModalState.open, roleModalState.formAction, loadData]);

  const onCancel = () => {
    roleModalState.onClose();
  };

  return (
    <AlertDialog
      open={
        roleModalState.open && roleModalState.formAction === FormActions.View
      }
    >
      <AlertDialogContent className="rounded">
        <AlertDialogHeader className="flex flex-row justify-between">
          <AlertDialogTitle>{resouces.role.roleDetail}</AlertDialogTitle>
          {loading && (
            <div className="flex flex-row items-center gap-x-1">
              <Loader2Icon className="animate-spin" />
              <span>{resouces.common.loading}</span>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogDescription />
        <form className="flex flex-col gap-y-2">
          <FormItem>
            <Label htmlFor="name">name:</Label>
            <Input
              value={role ? role?.name : ""}
              id="name"
              readOnly={true}
              className="rounded"
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="description">Description:</Label>
            <Input
              value={role ? role?.description : ""}
              id="description"
              readOnly={true}
              className="rounded"
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="permissions">Permissions:</Label>
            <PermissionTable
              listPermissions={permissionList}
              selectedPerrmissions={role?.permissions}
              disabled={true}
            />
          </FormItem>

          <FormItem className="flex flex-row items-center">
            <Label htmlFor="enabled">Enabled:</Label>
            <Checkbox id="enabled" checked={role?.enabled} />
          </FormItem>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loading}
              className="rounded min-w-[80px]"
              onClick={onCancel}
            >
              {resouces.common.close}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

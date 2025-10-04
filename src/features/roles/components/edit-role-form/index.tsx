"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ListPermissionItem } from "../../server/actions/list-permission/list-permission-item";
import { ApiResponse } from "@/lib/http-helper";
import { PermissionTable } from "../permission-table/permission-table";
import { useAction } from "@/hooks/use-action";
import * as resouces from "@/resources/string-resources.json";
import { UpdateRoleInputType } from "../../server/actions/update-role/types";
import { UpdateRoleSchema } from "../../server/actions/update-role/schema";
import { updateRole } from "../../server/actions/update-role";
import { useRoleModal } from "@/hooks/use-role-modal";
import { FormActions } from "@/types/form-action";
import { GetRoleResponse } from "../../server/actions/get-role/get-role-response";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";

export const EditRoleForm = () => {
  const roleModalState = useRoleModal((state) => state);
  const form = useForm<UpdateRoleInputType>({
    resolver: zodResolver(UpdateRoleSchema),
    defaultValues: {
      id: "",
      name: "",
      description: "",
      enabled: true,
      permissions: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [permissionList, setPermissionsList] = useState<ListPermissionItem[]>(
    []
  );
  const [role, setRole] = useState<GetRoleResponse>();

  const { execute: saveRole, isLoading: isUpdatingData } = useAction(
    updateRole,
    {
      onSuccess() {
        roleModalState.onClose();
        form.reset();
        DisplayToastSuccess(resouces.role.messageUpdateRoleSuccess);
      },
      onError(errorCode, inputData, message, fieldErrors) {
        let hasFieldError = false;
        if (fieldErrors) {
          Object.keys(fieldErrors).forEach((key) => {
            const prop = key as keyof typeof fieldErrors;
            if (fieldErrors[prop].length > 0) {
              form.setError(prop, {
                type: "custom",
                message: fieldErrors[prop][0],
              });
              hasFieldError = true;
            }
          });
        }
        if (!hasFieldError) {
          DisplayToastError(resouces.role.messageUpdateRoleFailed);
        }
      },
    }
  );

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
      form.reset({
        id: roleResponseData.data?.id,
        name: roleResponseData.data?.name,
        description: roleResponseData.data?.description,
        permissions: roleResponseData.data?.permissions,
        enabled: roleResponseData.data?.enabled,
      });
    } else {
      setError(roleResponseData.message);
    }
    setLoading(false);
  }, [roleModalState.id, form]);

  useEffect(() => {
    if (roleModalState.open && roleModalState.formAction === FormActions.Edit) {
      setPermissionsList([]);
      loadData();
    }
  }, [roleModalState.open, roleModalState.formAction, loadData]);

  const saveData = (data: UpdateRoleInputType) => {
    saveRole(data);
  };
  const onCancel = useCallback(() => {
    form.reset();
    roleModalState.onClose();
  }, [form, roleModalState]);

  return (
    <AlertDialog
      open={
        roleModalState.open && roleModalState.formAction === FormActions.Edit
      }
    >
      <AlertDialogContent className="rounded">
        <AlertDialogHeader className="flex flex-row justify-between">
          <AlertDialogTitle>{resouces.role.editRole}</AlertDialogTitle>
          {(loading || isUpdatingData) && (
            <div className="flex flex-row items-center gap-x-1">
              <Loader2Icon className="animate-spin" />
              <span>
                {loading ? resouces.common.loading : resouces.common.saving}
              </span>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogDescription />
        <Form {...form}>
          <form
            className="flex flex-col gap-y-2"
            onSubmit={form.handleSubmit(saveData)}
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input
                      hidden
                      {...field}
                      value={field.value ?? ""}
                      disabled={true}
                      className="rounded"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={true}
                      value={field.value ?? ""}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      disabled={loading || isUpdatingData}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permissions:</FormLabel>
                  <PermissionTable
                    listPermissions={permissionList}
                    selectedPerrmissions={role?.permissions}
                    disabled={loading || isUpdatingData}
                    onSelectedChange={(e) => field.onChange(e)}
                  ></PermissionTable>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                  <FormLabel>Enabled</FormLabel>
                  <FormControl>
                    <Checkbox
                      disabled={loading || isUpdatingData}
                      onCheckedChange={(e) => field.onChange(e)}
                      checked={field.value ? true : false}
                    />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <Button
                disabled={!form.formState.isValid || isUpdatingData || loading}
                className="rounded min-w-[80px]"
                type="submit"
              >
                {resouces.common.save}
              </Button>
              <AlertDialogCancel
                disabled={isUpdatingData || loading}
                className="rounded min-w-[80px]"
                onClick={onCancel}
              >
                {resouces.common.cancel}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

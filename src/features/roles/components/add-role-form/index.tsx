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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
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
import { CreateRoleInputType } from "../../server/actions/create-role/types";
import { CreateRoleSchema } from "../../server/actions/create-role/schema";
import { ListPermissionItem } from "../../server/actions/list-permission/list-permission-item";
import { ApiResponse } from "@/lib/http-helper";
import { ApiErrorCode } from "@/types/error-code";
import { PermissionTable } from "../permission-table/permission-table";
import { useAction } from "@/hooks/use-action";
import { createRole } from "../../server/actions/create-role";
import * as resouces from "@/resources/string-resources.json";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";

export const AddRoleForm = () => {
  const form = useForm<CreateRoleInputType>({
    resolver: zodResolver(CreateRoleSchema),
    defaultValues: {
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
  const { execute: saveRole, isLoading: isCreatingData } = useAction(
    createRole,
    {
      onSuccess() {
        setOpenForm(false);
        form.reset();
        DisplayToastSuccess(resouces.role.messageCreateRoleSuccess);
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
          DisplayToastError(resouces.role.messageCreateRoleFailed);
        }
      },
    }
  );

  const [openForm, setOpenForm] = useState(false);

  const listPermissions = async () => {
    setLoading(true);
    const listPermissionsResponse = await fetch("/api/permissions");
    const listPermissionsResponseData =
      (await listPermissionsResponse.json()) as ApiResponse<
        ListPermissionItem[]
      >;
    if (listPermissionsResponseData.status === ApiErrorCode.StatusCodeSuccess) {
      setPermissionsList(listPermissionsResponseData.data || []);
    } else {
      setError(listPermissionsResponseData.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (openForm) {
      setPermissionsList([]);
      listPermissions();
    }
  }, [openForm]);

  const saveData = (data: CreateRoleInputType) => {
    saveRole(data);
  };

  const handleOpen = useCallback((open: boolean) => {
    setOpenForm(open);
  }, []);

  const onCancel = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <AlertDialog open={openForm} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="rounded-sm">
          <PlusIcon size={4} /> {resouces.common.addNew}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded">
        <AlertDialogHeader className="flex flex-row justify-between">
          <AlertDialogTitle>{resouces.role.addNewRole}</AlertDialogTitle>
          {(loading || isCreatingData) && (
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      disabled={loading || isCreatingData}
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
                      disabled={loading || isCreatingData}
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
                    disabled={loading || isCreatingData}
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
                      disabled={loading || isCreatingData}
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
                disabled={!form.formState.isValid || isCreatingData || loading}
                className="rounded min-w-[80px]"
                type="submit"
              >
                {resouces.common.save}
              </Button>
              <AlertDialogCancel
                disabled={isCreatingData || loading}
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

"use client";

import { useCallback, useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAction } from "@/hooks/use-action";
import { useUserModal } from "@/hooks/use-user-modal";
import { ApiResponse } from "@/lib/http-helper";
import { ListRolesItem } from "@/features/roles/server/actions/list-roles/list-role-item";
import * as resouces from "@/resources/string-resources.json";
import { RoleTable } from "../role-table/role-table";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";
import { FormActions } from "@/types/form-action";
import { UpdateUserInputType } from "../../server/update-user/types";
import { UpdateUserSchema } from "../../server/update-user/schema";
import { updateUser } from "../../server/update-user";
import { GetUserResponse } from "../../server/get-user/get-user-response";
export const ViewEditUserForm = () => {
  const form = useForm<UpdateUserInputType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      isActive: true,
      roles: [],
    },
  });
  const userModalState = useUserModal((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [roleList, setRoleList] = useState<ListRolesItem[]>([]);
  const [user, setUser] = useState<GetUserResponse>();
  const { execute: saveUser, isLoading: isSavingData } = useAction(updateUser, {
    onSuccess() {
      userModalState.onClose();
      form.reset();
      DisplayToastSuccess(resouces.user.messageUpdateUserSuccess);
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
        DisplayToastError(resouces.user.messageUpdateUserFailed);
      }
    },
  });
  const loadData = useCallback(async () => {
    setLoading(true);
    const listRolePromise = fetch("/api/roles");
    const getUserPromise = fetch(`/api/users/${userModalState.id}`);
    const [getUserResponse, listRolesResponse] = await Promise.all([
      getUserPromise,
      listRolePromise,
    ]);
    const listRolesResponseData =
      (await listRolesResponse.json()) as ApiResponse<ListRolesItem[]>;

    if (listRolesResponseData.success) {
      setRoleList(listRolesResponseData.data || []);
    } else {
      setError(listRolesResponseData.message);
    }
    const getUserResponseData =
      (await getUserResponse.json()) as ApiResponse<GetUserResponse>;
    if (getUserResponseData.success) {
      setUser(getUserResponseData.data);
      form.reset({
        id: getUserResponseData.data?.id,
        username: getUserResponseData.data?.username,
        firstName: getUserResponseData.data?.firstName,
        lastName: getUserResponseData.data?.lastName,
        email: getUserResponseData.data?.email,
        phone: getUserResponseData.data?.phone,
        isActive: getUserResponseData.data?.isActive,
        roles: getUserResponseData.data?.roles,
      });
    } else {
      setError(getUserResponseData.message);
    }
    setLoading(false);
  }, [userModalState.id, form]);

  useEffect(() => {
    if (
      userModalState.open &&
      (userModalState.formAction === FormActions.View ||
        userModalState.formAction === FormActions.Edit)
    ) {
      setRoleList([]);
      loadData();
    }
  }, [loadData, userModalState.open, userModalState.formAction]);

  const saveData = (data: UpdateUserInputType) => {
    saveUser(data);
  };
  const onCancel = useCallback(() => {
    form.reset();
    userModalState.onClose();
  }, [form, userModalState]);

  useEffect(() => {
    if (
      userModalState.open &&
      (userModalState.formAction === FormActions.View ||
        userModalState.formAction === FormActions.Edit)
    ) {
      setRoleList([]);
      loadData();
    }
  }, [loadData, userModalState.formAction, userModalState.open]);
  return (
    <AlertDialog
      open={
        userModalState.open &&
        (userModalState.formAction === FormActions.Edit ||
          userModalState.formAction === FormActions.View)
      }
    >
      <AlertDialogContent className="rounded min-w-[800px]">
        <AlertDialogHeader className="flex flex-row justify-between">
          <AlertDialogTitle>
            {userModalState.formAction === FormActions.View
              ? resouces.user.userDetail
              : resouces.user.editUser}
          </AlertDialogTitle>
          {(loading || isSavingData) && (
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
            <div className="flex flex-row gap-x-4">
              <div className="flex flex-col gap-y-2 w-[50%]">
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.username}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          autoComplete="off"
                          readOnly={true}
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.firstName}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          disabled={loading || isSavingData}
                          readOnly={
                            userModalState.formAction === FormActions.View
                          }
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.lastName}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          disabled={loading || isSavingData}
                          readOnly={
                            userModalState.formAction === FormActions.View
                          }
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.email}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          disabled={loading || isSavingData}
                          readOnly={
                            userModalState.formAction === FormActions.View
                          }
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.phone}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          disabled={loading || isSavingData}
                          readOnly={
                            userModalState.formAction === FormActions.View
                          }
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
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormLabel>{resouces.user.active}</FormLabel>
                      <FormControl>
                        <Checkbox
                          disabled={loading || isSavingData}
                          onCheckedChange={(e) => {
                            if (
                              userModalState.formAction === FormActions.Edit
                            ) {
                              field.onChange(e);
                            }
                          }}
                          checked={field.value ? true : false}
                        />
                      </FormControl>
                      <FormDescription />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[50%]">
                <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.roles}:</FormLabel>
                      <RoleTable
                        listRoles={roleList}
                        selectedRoles={user?.roles}
                        disabled={
                          loading ||
                          isSavingData ||
                          userModalState.formAction === FormActions.View
                        }
                        onSelectedChange={(e) => {
                          if (userModalState.formAction === FormActions.Edit) {
                            field.onChange(e);
                          }
                        }}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <AlertDialogFooter>
              {userModalState.formAction === FormActions.Edit && (
                <Button
                  disabled={!form.formState.isValid || isSavingData || loading}
                  className="rounded min-w-[80px]"
                  type="submit"
                >
                  {resouces.common.save}
                </Button>
              )}
              <AlertDialogCancel
                disabled={isSavingData || loading}
                className="rounded min-w-[80px]"
                onClick={onCancel}
              >
                {userModalState.formAction === FormActions.Edit
                  ? resouces.common.cancel
                  : resouces.common.close}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

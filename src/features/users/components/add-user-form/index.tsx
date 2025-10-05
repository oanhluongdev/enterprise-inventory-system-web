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
import { CreateUserInputType } from "../../server/create-user/types";
import { CreateUserSchema } from "../../server/create-user/schema";
import { useAction } from "@/hooks/use-action";
import { createUser } from "../../server/create-user";
import { useUserModal } from "@/hooks/use-user-modal";
import { ApiResponse } from "@/lib/http-helper";
import { ListRolesItem } from "@/features/roles/server/actions/list-roles/list-role-item";
import * as resouces from "@/resources/string-resources.json";
import { RoleTable } from "../role-table/role-table";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";
import { FormActions } from "@/types/form-action";
export const AddUserForm = () => {
  const form = useForm<CreateUserInputType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
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
  const { execute: saveUser, isLoading: isSavingData } = useAction(createUser, {
    onSuccess() {
      userModalState.onClose();
      form.reset();
      DisplayToastSuccess(resouces.user.messageCreateUserSuccess);
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
        DisplayToastError(resouces.user.messageCreateUserFailed);
      }
    },
  });
  const loadData = useCallback(async () => {
    setLoading(true);
    const listRolesResponse = await fetch("/api/roles");
    const listRolesResponseData =
      (await listRolesResponse.json()) as ApiResponse<ListRolesItem[]>;

    if (listRolesResponseData.success) {
      setRoleList(listRolesResponseData.data || []);
    } else {
      setError(listRolesResponseData.message);
    }
    setLoading(false);
  }, []);
  const saveData = (data: CreateUserInputType) => {
    saveUser(data);
  };
  const onCancel = useCallback(() => {
    form.reset();
    userModalState.onClose();
  }, [form, userModalState]);

  useEffect(() => {
    if (userModalState.open) {
      setRoleList([]);
      loadData();
    }
  }, [loadData, userModalState.open]);
  return (
    <AlertDialog
      open={
        userModalState.open && userModalState.formAction === FormActions.Add
      }
    >
      <AlertDialogContent className="rounded min-w-[800px]">
        <AlertDialogHeader className="flex flex-row justify-between">
          <AlertDialogTitle>{resouces.user.addNewUser}</AlertDialogTitle>
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.username}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          autoComplete="off"
                          disabled={loading || isSavingData}
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.password}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          value={field.value ?? ""}
                          autoComplete="new-password"
                          disabled={loading || isSavingData}
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{resouces.user.confirmPassword}:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          value={field.value ?? ""}
                          autoComplete="new-password"
                          disabled={loading || isSavingData}
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
                          onCheckedChange={(e) => field.onChange(e)}
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
                        disabled={loading || isSavingData}
                        onSelectedChange={(e) => field.onChange(e)}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <AlertDialogFooter>
              <Button
                disabled={!form.formState.isValid || isSavingData || loading}
                className="rounded min-w-[80px]"
                type="submit"
              >
                {resouces.common.save}
              </Button>
              <AlertDialogCancel
                disabled={isSavingData || loading}
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

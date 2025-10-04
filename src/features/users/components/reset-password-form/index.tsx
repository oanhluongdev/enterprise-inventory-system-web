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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { ResetPasswordInputType } from "../../server/reset-password/types";
import { ResetPasswordSchema } from "../../server/reset-password/schema";
import { useAction } from "@/hooks/use-action";
import { resetPassword } from "../../server/reset-password";
import { useUserModal } from "@/hooks/use-user-modal";
import { DisplayToastError, DisplayToastSuccess } from "@/lib/toast-helper";
import { FormActions } from "@/types/form-action";
import * as resouces from "@/resources/string-resources.json";
export const ResetPasswordForm = () => {
  const userModalState = useUserModal((state) => state);
  const form = useForm<ResetPasswordInputType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      id: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { execute: resetPasswordExecute, isLoading: isSavingData } = useAction(
    resetPassword,
    {
      onSuccess() {
        userModalState.onClose();
        form.reset();
        DisplayToastSuccess(resouces.user.messageResetPasswordSuccess);
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
          DisplayToastError(resouces.user.messageResetPasswordFailed);
        }
      },
    }
  );

  const saveData = (data: ResetPasswordInputType) => {
    resetPasswordExecute(data);
  };
  const onCancel = useCallback(() => {
    form.reset();
    userModalState.onClose();
  }, [form, userModalState]);

  useEffect(() => {
    if (
      userModalState.open &&
      userModalState.formAction === FormActions.Reset
    ) {
      form.reset({
        id: userModalState.id,
        password: "",
        confirmPassword: "",
      });
    }
  }, [form, userModalState.formAction, userModalState.id, userModalState.open]);
  return (
    <AlertDialog
      open={
        userModalState.open && userModalState.formAction === FormActions.Reset
      }
    >
      <AlertDialogContent className="rounded max-w-[200px]">
        <AlertDialogHeader className="flex flex-row justify-between">
          <AlertDialogTitle>{resouces.user.resetPassword}</AlertDialogTitle>
          {isSavingData && (
            <div className="flex flex-row items-center gap-x-1">
              <Loader2Icon className="animate-spin" />
              <span>{resouces.common.saving}</span>
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
                      disabled={isSavingData}
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
                      disabled={isSavingData}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <Button
                disabled={!form.formState.isValid || isSavingData}
                className="rounded min-w-[80px]"
                type="submit"
              >
                {resouces.common.save}
              </Button>
              <AlertDialogCancel
                disabled={isSavingData}
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

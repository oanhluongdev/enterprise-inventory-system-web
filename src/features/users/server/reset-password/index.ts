"use server";

import { httpPut } from "@/lib/http-helper";
import { ResetPasswordInputType, ReturnType } from "./types";
import { FieldErrors } from "@/types/field-error";
import { ApiErrorCode } from "@/types/error-code";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { ResetPasswordSchema } from "./schema";

export const handler = async (
  inputData: ResetPasswordInputType
): Promise<ReturnType> => {
  const httpResult = await httpPut<ResetPasswordInputType, boolean>(
    `/api/v1/users/reset-password/${inputData.id}`,
    inputData
  );
  const fieldErrors: FieldErrors<ResetPasswordInputType> = {
    id: [],
    password: [],
    confirmPassword: [],
  };
  if (httpResult.status !== ApiErrorCode.StatusCodeSuccess) {
    switch (httpResult.status) {
      case ApiErrorCode.StatusCodeUserPasswordRequired:
      case ApiErrorCode.StatusCodeUserPasswordTooLong:
      case ApiErrorCode.StatusCodeUserPasswordTooShort: {
        fieldErrors.password = [httpResult.message || ""];
        break;
      }
    }
  }
  return {
    success: httpResult.success,
    data: httpResult.data,
    status: httpResult.status,
    message: httpResult.message,
    fieldErrors: fieldErrors,
  };
};

export const resetPassword = createSafeAction(ResetPasswordSchema, handler);

"use server";

import { revalidatePath } from "next/cache";
import { httpDelete } from "@/lib/http-helper";
import { ReturnType, DeleteUserInputType } from "./types";
import { ApiErrorCode } from "@/types/error-code";
import { FieldErrors } from "@/types/field-error";
import { createSafeActionWithoutSchema } from "@/lib/create-safe-action";

export const handler = async (
  inputData: DeleteUserInputType
): Promise<ReturnType> => {
  const httpResult = await httpDelete<boolean>(`/api/v1/users/${inputData.id}`);
  const fieldErrors: FieldErrors<DeleteUserInputType> = {
    id: [],
  };
  if (httpResult.status === ApiErrorCode.StatusCodeSuccess) {
    revalidatePath("/business/users");
  } else {
  }
  return {
    success: httpResult.success,
    data: httpResult.data,
    status: httpResult.status,
    message: httpResult.message,
    fieldErrors: fieldErrors,
  };
};

export const deleteUser = createSafeActionWithoutSchema(handler);

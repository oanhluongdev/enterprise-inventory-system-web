"use server";

import { revalidatePath } from "next/cache";
import { httpDelete } from "@/lib/http-helper";
import { ReturnType, DeleteRoleInputType } from "./types";
import { ApiErrorCode } from "@/types/error-code";
import { FieldErrors } from "@/types/field-error";
import { createSafeActionWithoutSchema } from "@/lib/create-safe-action";

export const handler = async (
  inputData: DeleteRoleInputType
): Promise<ReturnType> => {
  const httpResult = await httpDelete<boolean>(`/api/v1/roles/${inputData.id}`);
  const fieldErrors: FieldErrors<DeleteRoleInputType> = {
    id: [],
  };
  if (httpResult.status === ApiErrorCode.StatusCodeSuccess) {
    revalidatePath("/data-management/roles");
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

export const deleteRole = createSafeActionWithoutSchema(handler);

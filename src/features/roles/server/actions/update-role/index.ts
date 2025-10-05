"use server";

import { revalidatePath } from "next/cache";
import { httpPut } from "@/lib/http-helper";
import { UpdateRoleInputType, ReturnType } from "./types";
import { ApiErrorCode } from "@/types/error-code";
import { FieldErrors } from "@/types/field-error";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateRoleSchema } from "./schema";

export const handler = async (
  inputData: UpdateRoleInputType
): Promise<ReturnType> => {
  const httpResult = await httpPut<UpdateRoleInputType, boolean>(
    `/api/v1/roles/${inputData.id}`,
    inputData
  );
  const fieldErrors: FieldErrors<UpdateRoleInputType> = {
    id: [],
    name: [],
    description: [],
    enabled: [],
    permissions: [],
  };
  if (httpResult.status === ApiErrorCode.StatusCodeSuccess) {
    revalidatePath("/business/roles");
  } else {
    switch (httpResult.status) {
      case ApiErrorCode.StatusCodeRoleNameRequired:
      case ApiErrorCode.StatusCodeRoleNameTooLong:
      case ApiErrorCode.StatusCodeRoleNameAlreadyExist: {
        fieldErrors.name = [httpResult.message || ""];
        break;
      }
      case ApiErrorCode.StatusCodeRoleDescriptionTooLong: {
        fieldErrors.description = [httpResult.message || ""];
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

export const updateRole = createSafeAction(UpdateRoleSchema, handler);

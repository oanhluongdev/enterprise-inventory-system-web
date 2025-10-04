"use server";

import { revalidatePath } from "next/cache";
import { httpPost } from "@/lib/http-helper";
import { CreateRoleInputType, ReturnType } from "./types";
import { ApiErrorCode } from "@/types/error-code";
import { FieldErrors } from "@/types/field-error";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateRoleSchema } from "./schema";

export const handler = async (
  inputData: CreateRoleInputType
): Promise<ReturnType> => {
  const httpResult = await httpPost<CreateRoleInputType, string>(
    "/api/v1/roles",
    inputData
  );
  const fieldErrors: FieldErrors<CreateRoleInputType> = {
    name: [],
    description: [],
    enabled: [],
    permissions: [],
  };
  if (httpResult.status === ApiErrorCode.StatusCodeSuccess) {
    revalidatePath("/data-management/roles");
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

export const createRole = createSafeAction(CreateRoleSchema, handler);

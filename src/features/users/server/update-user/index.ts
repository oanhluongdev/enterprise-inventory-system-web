"use server";

import { httpPut } from "@/lib/http-helper";
import { UpdateUserInputType, ReturnType } from "./types";
import { FieldErrors } from "@/types/field-error";
import { ApiErrorCode } from "@/types/error-code";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateUserSchema } from "./schema";

export const handler = async (
  inputData: UpdateUserInputType
): Promise<ReturnType> => {
  const httpResult = await httpPut<UpdateUserInputType, boolean>(
    `/api/v1/users/${inputData.id}`,
    inputData
  );
  const fieldErrors: FieldErrors<UpdateUserInputType> = {
    id: [],
    username: [],
    email: [],
    firstName: [],
    lastName: [],
    phone: [],
    isActive: [],
    roles: [],
  };
  if (httpResult.status === ApiErrorCode.StatusCodeSuccess) {
    revalidatePath("/business/users");
  } else {
    switch (httpResult.status) {
      case ApiErrorCode.StatusCodeUserFirstNameRequired:
      case ApiErrorCode.StatusCodeUserFirstNameTooLong:
      case ApiErrorCode.StatusCodeUserFirstNameTooShort: {
        fieldErrors.firstName = [httpResult.message || ""];
        break;
      }
      case ApiErrorCode.StatusCodeUserLastNameRequired:
      case ApiErrorCode.StatusCodeUserLastNameTooLong:
      case ApiErrorCode.StatusCodeUserLastNameTooShort: {
        fieldErrors.lastName = [httpResult.message || ""];
        break;
      }
      case ApiErrorCode.StatusCodeUserEmailAlreadyExist:
      case ApiErrorCode.StatusCodeUserEmailRequired:
      case ApiErrorCode.StatusCodeUserEmailTooLong:
      case ApiErrorCode.StatusCodeUserEmailTooShort: {
        fieldErrors.email = [httpResult.message || ""];
        break;
      }
      case ApiErrorCode.StatusCodeUserPhoneTooLong: {
        fieldErrors.phone = [httpResult.message || ""];
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

export const updateUser = createSafeAction(UpdateUserSchema, handler);

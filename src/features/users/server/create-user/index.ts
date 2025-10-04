"use server";

import { httpPost } from "@/lib/http-helper";
import { CreateUserInputType, ReturnType } from "./types";
import { FieldErrors } from "@/types/field-error";
import { ApiErrorCode } from "@/types/error-code";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateUserSchema } from "./schema";

export const handler = async (
  inputData: CreateUserInputType
): Promise<ReturnType> => {
  const httpResult = await httpPost<CreateUserInputType, string>(
    "/api/v1/users",
    inputData
  );
  const fieldErrors: FieldErrors<CreateUserInputType> = {
    username: [],
    password: [],
    confirmPassword: [],
    email: [],
    firstName: [],
    lastName: [],
    phone: [],
    isActive: [],
    roles: [],
  };
  if (httpResult.status === ApiErrorCode.StatusCodeSuccess) {
    revalidatePath("/data-management/users");
  } else {
    switch (httpResult.status) {
      case ApiErrorCode.StatusCodeUserUsernameRequired:
      case ApiErrorCode.StatusCodeUserUsernameTooLong:
      case ApiErrorCode.StatusCodeUserUsernameTooShort:
      case ApiErrorCode.StatusCodeUserUsernameAlreadyExist: {
        fieldErrors.username = [httpResult.message || ""];
        break;
      }
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
      case ApiErrorCode.StatusCodeUserPasswordRequired:
      case ApiErrorCode.StatusCodeUserPasswordTooLong:
      case ApiErrorCode.StatusCodeUserPasswordTooShort: {
        fieldErrors.password = [httpResult.message || ""];
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

export const createUser = createSafeAction(CreateUserSchema, handler);

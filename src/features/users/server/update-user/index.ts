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
  if (httpResult.success) {
    revalidatePath("/business/users");
  } else {
    switch (httpResult.status) {
      case ApiErrorCode.StatusCodeValidationFailed: {
        const fieldErrorsFromApi = httpResult.fieldErrors;
        if (fieldErrorsFromApi) {
          Object.keys(fieldErrorsFromApi).forEach((key) => {
            const value = fieldErrorsFromApi[key];
            switch (+key) {
              case ApiErrorCode.StatusCodeUserFirstNameRequired:
              case ApiErrorCode.StatusCodeUserFirstNameTooLong:
              case ApiErrorCode.StatusCodeUserFirstNameTooShort: {
                fieldErrors.firstName = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeUserLastNameRequired:
              case ApiErrorCode.StatusCodeUserLastNameTooLong:
              case ApiErrorCode.StatusCodeUserLastNameTooShort: {
                fieldErrors.lastName = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeUserEmailAlreadyExist:
              case ApiErrorCode.StatusCodeUserEmailRequired:
              case ApiErrorCode.StatusCodeUserEmailTooLong:
              case ApiErrorCode.StatusCodeUserEmailInvalid: {
                fieldErrors.email = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeUserPhoneTooLong: {
                fieldErrors.phone = [value || ""];
                break;
              }
            }
          });
        }
        break;
      }
      default:
        break;
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

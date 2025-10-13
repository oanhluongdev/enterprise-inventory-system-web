"use server";

import { revalidatePath } from "next/cache";
import { FieldErrors } from "@/types/field-error";
import { CreateUpdateCompanyInputType, ReturnType } from "./types";
import { ApiFieldErrors, httpPost, httpPut } from "@/lib/http-helper";
import { ApiErrorCode } from "@/types/error-code";
import { CreateUpdateCompanySchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

export const handler = async (
  inputData: CreateUpdateCompanyInputType
): Promise<ReturnType> => {
  let isSuccess = false;
  let status = ApiErrorCode.StatusCodeInternalError;
  let fieldErrorsFromApi: ApiFieldErrors | undefined = undefined;
  let apiMessage: string | undefined = undefined;
  let apiData: string | boolean | undefined = undefined;

  if (inputData.id && inputData.id.length > 0) {
    const httpResult = await httpPut<CreateUpdateCompanyInputType, string>(
      `/api/v1/companies/${inputData.id}`,
      inputData
    );
    isSuccess = httpResult.success;
    status = httpResult.status;
    fieldErrorsFromApi = httpResult.fieldErrors;
    apiMessage = httpResult.message;
    apiData = httpResult.data;
  } else {
    const httpResult = await httpPost<CreateUpdateCompanyInputType, string>(
      "/api/v1/companies",
      inputData
    );
    isSuccess = httpResult.success;
    status = httpResult.status;
    fieldErrorsFromApi = httpResult.fieldErrors;
    apiMessage = httpResult.message;
    apiData = httpResult.data;
  }

  const fieldErrors: FieldErrors<CreateUpdateCompanyInputType> = {
    id: [],
    name: [],
    isActive: [],
    legalName: [],
    registrationNumber: [],
    taxId: [],
    website: [],
    email: [],
    phone: [],
    logoUrl: [],
    address: [],
    city: [],
    state: [],
    country: [],
    postalCode: [],
    currencyCode: [],
    timezone: [],
  };
  if (isSuccess) {
    revalidatePath("/business/companies");
  } else {
    switch (status) {
      case ApiErrorCode.StatusCodeValidationFailed: {
        if (fieldErrorsFromApi) {
          Object.keys(fieldErrorsFromApi).forEach((key) => {
            const value = fieldErrorsFromApi[key];
            switch (+key) {
              case ApiErrorCode.StatusCodeCompanyNameRequired:
              case ApiErrorCode.StatusCodeCompanyNameTooLong: {
                fieldErrors.name = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyLegalNameTooLong: {
                fieldErrors.legalName = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyRegistrationNumberTooLong: {
                fieldErrors.registrationNumber = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyTaxIdTooLong: {
                fieldErrors.taxId = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyWebsiteTooLong: {
                fieldErrors.website = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyEmailInvalid:
              case ApiErrorCode.StatusCodeCompanyEmailTooLong: {
                fieldErrors.email = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyPhoneTooLong: {
                fieldErrors.phone = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyLogoUrlTooLong: {
                fieldErrors.logoUrl = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyCityTooLong: {
                fieldErrors.city = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyStateTooLong: {
                fieldErrors.state = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyCountryTooLong: {
                fieldErrors.country = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyPostalCodeTooLong: {
                fieldErrors.postalCode = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyCurrencyCodeTooLong: {
                fieldErrors.currencyCode = [value || ""];
                break;
              }
              case ApiErrorCode.StatusCodeCompanyTimezoneTooLong: {
                fieldErrors.timezone = [value || ""];
                break;
              }
            }
          });
        }
        break;
      }
    }
  }
  return {
    success: isSuccess,
    data: apiData,
    status: status,
    message: apiMessage,
    fieldErrors: fieldErrors,
  };
};

export const createUpdateCompany = createSafeAction(
  CreateUpdateCompanySchema,
  handler
);

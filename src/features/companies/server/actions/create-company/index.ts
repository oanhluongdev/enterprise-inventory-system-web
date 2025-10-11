"use server";

import { revalidatePath } from "next/cache";
import { FieldErrors } from "@/types/field-error";
import { CreateCompanyInputType, ReturnType } from "./types";
import { httpPost } from "@/lib/http-helper";
import { ApiErrorCode } from "@/types/error-code";
import { CreateCompanySchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

export const handler = async (
  inputData: CreateCompanyInputType
): Promise<ReturnType> => {
  const httpResult = await httpPost<CreateCompanyInputType, string>(
    "/api/v1/companies",
    inputData
  );
  const fieldErrors: FieldErrors<CreateCompanyInputType> = {
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
  if (httpResult.success) {
    revalidatePath("/business/companies");
  } else {
    switch (httpResult.status) {
      case ApiErrorCode.StatusCodeValidationFailed: {
        const fieldErrorsFromApi = httpResult.fieldErrors;
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
    success: httpResult.success,
    data: httpResult.data,
    status: httpResult.status,
    message: httpResult.message,
    fieldErrors: fieldErrors,
  };
};

export const createCompany = createSafeAction(CreateCompanySchema, handler);

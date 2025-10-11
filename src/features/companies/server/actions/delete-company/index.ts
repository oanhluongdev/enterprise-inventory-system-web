"use server";

import { revalidatePath } from "next/cache";
import { httpDelete } from "@/lib/http-helper";
import { ReturnType, DeleteCompanyInputType } from "./types";
import { FieldErrors } from "@/types/field-error";
import { createSafeActionWithoutSchema } from "@/lib/create-safe-action";

export const handler = async (
  inputData: DeleteCompanyInputType
): Promise<ReturnType> => {
  const httpResult = await httpDelete<boolean>(
    `/api/v1/companies/${inputData.id}`
  );
  const fieldErrors: FieldErrors<DeleteCompanyInputType> = {
    id: [],
  };
  if (httpResult.success) {
    revalidatePath("/business/companies");
  }
  return {
    success: httpResult.success,
    data: httpResult.data,
    status: httpResult.status,
    message: httpResult.message,
    fieldErrors: fieldErrors,
  };
};

export const deleteCompany = createSafeActionWithoutSchema(handler);

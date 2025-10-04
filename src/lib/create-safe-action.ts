import { ActionResponse } from "@/types/action-response";
import { ApiErrorCode } from "@/types/error-code";
import { FieldErrors } from "@/types/field-error";
import { z } from "zod";
export const createSafeAction = <TInput, TOutput>(
  schema: z.ZodType,
  handler: (validatedData: TInput) => Promise<ActionResponse<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionResponse<TInput, TOutput>> => {
    const validateResult = schema.safeParse(data);
    if (!validateResult.success) {
      return {
        success: false,
        status: ApiErrorCode.StatusCodeValidationFailed,
        fieldErrors: z.flattenError(validateResult.error)
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validateResult.data as TInput);
  };
};

export const createSafeActionWithoutSchema = <TInput, TOutput>(
  handler: (input: TInput) => Promise<ActionResponse<TInput, TOutput>>
) => {
  return async (input: TInput): Promise<ActionResponse<TInput, TOutput>> => {
    return handler(input);
  };
};

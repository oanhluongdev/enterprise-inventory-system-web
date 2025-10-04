import { ApiErrorCode } from "./error-code";
import { FieldErrors } from "./field-error";

export type ActionResponse<TInput, TOutput> = {
  success: boolean;
  fieldErrors?: FieldErrors<TInput> | undefined;
  status: ApiErrorCode;
  message?: string | undefined;
  data?: TOutput;
};

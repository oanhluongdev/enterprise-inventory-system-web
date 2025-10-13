import { ActionResponse } from "@/types/action-response";
import { ApiErrorCode } from "@/types/error-code";
import { FieldErrors } from "@/types/field-error";
import { useCallback, useState } from "react";

type ActionFn<TInput, TOutput> = (
  inputData: TInput
) => Promise<ActionResponse<TInput, TOutput>>;

interface UseActionOptions<TInput, TOutput> {
  onSuccess?: (inputData?: TInput, outputData?: TOutput) => void;
  onError?: (
    errorCode: ApiErrorCode,
    inputData?: TInput,
    message?: string,
    fieldErrors?: FieldErrors<TInput>
  ) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  actionFn: ActionFn<TInput, TOutput>,
  options?: UseActionOptions<TInput, TOutput>
) => {
  const [fieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [outputData, setOutputData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (inputData: TInput) => {
      setIsLoading(true);
      try {
        const result = await actionFn(inputData);
        if (!result) {
          return;
        }
        if (!result.success) {
          if (result.fieldErrors) {
            options?.onError?.(
              result.status,
              inputData,
              result.message,
              result.fieldErrors
            );
          } else {
            setError(result.message);
            options?.onError?.(result.status, inputData, result.message);
          }
        } else {
          setOutputData(result.data);
          options?.onSuccess?.(inputData, result.data);
        }
      } finally {
        setIsLoading(false);
        options?.onComplete?.();
      }
    },
    [actionFn, options]
  );
  return {
    execute,
    outputData,
    error,
    fieldErrors,
    isLoading,
  };
};

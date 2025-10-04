import axiosClient from "@/lib/axios-client";
import { ApiErrorCode } from "@/types/error-code";
import { PaginatedResult, PaginationParams } from "../types/pagination";
import { sleep } from "./utils";

const DELAY_TIME = 1;

export type ApiFieldErrors = {
  [key: string]: string[];
};

export type ApiResponse<T> = {
  success: boolean;
  status: ApiErrorCode;
  message?: string;
  data?: T | undefined;
  fieldErrors?: ApiFieldErrors;
};

export const handleError = <T>(error: unknown): ApiResponse<T> => {
  if (error) {
    const data = error as unknown as ApiResponse<T>;
    return data;
  }
  return {
    success: false,
    status: ApiErrorCode.StatusCodeFailed,
  };
};

export const httpGet = async <T>(apiPath: string): Promise<ApiResponse<T>> => {
  try {
    await sleep(DELAY_TIME);
    const response = await axiosClient.get(apiPath);
    return response as unknown as ApiResponse<T>;
  } catch (error) {
    return handleError<T>(error);
  }
};

export const httpGetWithPagination = async <T>(
  apiPath: string,
  pagination: PaginationParams
): Promise<ApiResponse<PaginatedResult<T>>> => {
  try {
    const response = await axiosClient.get(apiPath, { params: pagination });

    return response as unknown as ApiResponse<PaginatedResult<T>>;
  } catch (error) {
    return handleError<PaginatedResult<T>>(error);
  }
};

export const httpPost = async <TInput, TResult>(
  apiPath: string,
  param: TInput
): Promise<ApiResponse<TResult>> => {
  try {
    await sleep(DELAY_TIME);
    const response = await axiosClient.post(apiPath, param);
    return response as unknown as ApiResponse<TResult>;
  } catch (error) {
    return handleError<TResult>(error);
  }
};

export const httpPut = async <TInput, TResult>(
  apiPath: string,
  param: TInput
): Promise<ApiResponse<TResult>> => {
  try {
    const response = await axiosClient.put(apiPath, param);
    return response as unknown as ApiResponse<TResult>;
  } catch (error) {
    return handleError<TResult>(error);
  }
};

export const httpDelete = async <TResult>(
  apiPath: string
): Promise<ApiResponse<TResult>> => {
  try {
    const response = await axiosClient.delete(apiPath);
    return response as unknown as ApiResponse<TResult>;
  } catch (error) {
    return handleError<TResult>(error);
  }
};

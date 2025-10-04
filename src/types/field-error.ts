export type FieldErrors<TInput> = {
  [K in keyof TInput]: string[];
};

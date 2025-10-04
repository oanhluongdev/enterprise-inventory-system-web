import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    id: z.string(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(255, { message: "Password must be less than 255 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" })
      .max(255, {
        message: "Confirm password must be less than 255 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

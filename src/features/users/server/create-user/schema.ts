import { z } from "zod";

export const CreateUserSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(50, { message: "Username must be less than 50 characters" }),
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
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(100, { message: "First name must be less than 100 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(100, { message: "Last name must be less than 100 characters" }),
    phone: z
      .string()
      .max(20, { message: "Phone must be less than 20 characters" }),
    email: z.email({ message: "Invalid email" }),
    isActive: z.boolean(),
    roles: z.array(z.string()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

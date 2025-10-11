import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.string(),
  username: z.string(),
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
    .max(20, { message: "Phone must be less than 20 characters" })
    .optional(),
  email: z.email({ message: "Invalid email" }),
  isActive: z.boolean(),
  roles: z.array(z.string()),
});

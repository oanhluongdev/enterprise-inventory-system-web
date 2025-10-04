import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullname: z
    .string()
    .min(1, { message: "Fullname is required" })
    .max(255, { message: "Fullname must be less than 255 characters" }),
  phone: z
    .string()
    .max(20, { message: "Phone must be less than 20 characters" }),
  email: z.email({ message: "Invalid email" }),
  isActive: z.boolean(),
  roles: z.array(z.string()),
});

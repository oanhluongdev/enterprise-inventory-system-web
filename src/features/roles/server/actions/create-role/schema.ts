import { z } from "zod";

export const CreateRoleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, {
    message: "Name must be less than 100 characters",
  }),
  description: z
    .string()
    .max(255, { message: "Description must be less than 255 characters" })
    .nullable(),
  enabled: z.boolean(),
  permissions: z.array(z.string()),
});

import { z } from "zod";

export const UpdateCompanySchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Company name is required" }).max(200, {
    message: "Company name must not be greater than 200 characters",
  }),
  legalName: z
    .string()
    .max(200, {
      message: "Company legal name must not be greater than 200 characters",
    })
    .optional(),
  registrationNumber: z
    .string()
    .max(100, {
      message:
        "Company registration number must not be greater than 100 characters",
    })
    .optional(),
  taxId: z
    .string()
    .max(100, {
      message: "Tax ID must not be greater than 100 characters",
    })
    .optional(),
  website: z
    .string()
    .max(200, { message: "Website must not be greater than 200 characters" })
    .optional(),
  email: z
    .email({ message: "Invalid email" })
    .max(100, { message: "Email must not be greater than 100 characters" })
    .optional(),
  phone: z
    .string()
    .max(20, { message: "Phone must not be greater than 20 characters" })
    .optional(),
  logoUrl: z
    .string()
    .max(500, { message: "Logo URL must not be greater than 500 characters" })
    .optional(),
  address: z
    .string()
    .max(255, { message: "Address must not be greater than 255 characters" })
    .optional(),
  city: z
    .string()
    .max(100, { message: "City must not be greater than 100 characters" })
    .optional(),
  state: z
    .string()
    .max(100, { message: "State must not be greater than 100 characters" })
    .optional(),
  country: z
    .string()
    .max(100, { message: "Country must not be greater than 100 characters" })
    .optional(),
  postalCode: z
    .string()
    .max(20, { message: "Postal code must not be greater than 20 characters" })
    .optional(),
  currencyCode: z
    .string()
    .max(3, { message: "Currency code must not be greater than 3 characters" })
    .optional(),
  timezone: z
    .string()
    .max(50, { message: "Timezone must not be greater than 3 characters" })
    .optional(),
  isActive: z.boolean().optional().default(true),
});

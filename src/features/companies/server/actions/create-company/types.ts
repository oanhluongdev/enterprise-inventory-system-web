import { z } from "zod";
import { CreateCompanySchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type CreateCompanyInputType = z.infer<typeof CreateCompanySchema>;
export type ReturnType = ActionResponse<CreateCompanyInputType, string>;

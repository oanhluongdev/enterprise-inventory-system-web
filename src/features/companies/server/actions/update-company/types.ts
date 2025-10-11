import { z } from "zod";
import { UpdateCompanySchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type UpdateCompanyInputType = z.infer<typeof UpdateCompanySchema>;
export type ReturnType = ActionResponse<UpdateCompanyInputType, string>;

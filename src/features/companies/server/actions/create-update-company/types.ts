import { z } from "zod";
import { CreateUpdateCompanySchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type CreateUpdateCompanyInputType = z.infer<
  typeof CreateUpdateCompanySchema
>;
export type ReturnType = ActionResponse<
  CreateUpdateCompanyInputType,
  string | boolean
>;

import { z } from "zod";
import { UpdateRoleSchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type UpdateRoleInputType = z.infer<typeof UpdateRoleSchema>;
export type ReturnType = ActionResponse<UpdateRoleInputType, boolean>;

import { z } from "zod";
import { CreateRoleSchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type CreateRoleInputType = z.infer<typeof CreateRoleSchema>;
export type ReturnType = ActionResponse<CreateRoleInputType, string>;

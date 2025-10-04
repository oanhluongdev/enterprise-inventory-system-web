import { z } from "zod";

import { UpdateUserSchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type UpdateUserInputType = z.infer<typeof UpdateUserSchema>;
export type ReturnType = ActionResponse<UpdateUserInputType, boolean>;

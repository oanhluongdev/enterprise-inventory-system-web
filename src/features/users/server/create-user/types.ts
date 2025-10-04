import { z } from "zod";

import { CreateUserSchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type CreateUserInputType = z.infer<typeof CreateUserSchema>;
export type ReturnType = ActionResponse<CreateUserInputType, string>;

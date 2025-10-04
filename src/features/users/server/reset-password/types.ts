import { z } from "zod";

import { ResetPasswordSchema } from "./schema";
import { ActionResponse } from "@/types/action-response";

export type ResetPasswordInputType = z.infer<typeof ResetPasswordSchema>;
export type ReturnType = ActionResponse<ResetPasswordInputType, boolean>;

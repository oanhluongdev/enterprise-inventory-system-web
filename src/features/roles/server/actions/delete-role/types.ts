import { ActionResponse } from "@/types/action-response";

export type DeleteRoleInputType = {
  id?: string;
};
export type ReturnType = ActionResponse<DeleteRoleInputType, boolean>;

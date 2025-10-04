import { ActionResponse } from "@/types/action-response";

export type DeleteUserInputType = {
  id?: string;
};
export type ReturnType = ActionResponse<DeleteUserInputType, boolean>;

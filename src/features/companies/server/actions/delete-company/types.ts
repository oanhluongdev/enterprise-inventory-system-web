import { ActionResponse } from "@/types/action-response";

export type DeleteCompanyInputType = {
  id?: string;
};
export type ReturnType = ActionResponse<DeleteCompanyInputType, boolean>;

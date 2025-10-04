import React from "react";
import { ListUserItem } from "../server/list-users/list-user-item";
import { ApiResponse } from "@/lib/http-helper";
import { UserTable } from "../components/user-table";
import { PaginatedResult } from "@/types/pagination";
import { AddUserForm } from "../components/add-user-form";
import { ViewEditUserForm } from "../components/view-edit-user-form";
import { ResetPasswordForm } from "../components/reset-password-form";

interface UsersPageProps {
  listUserResponse: Promise<ApiResponse<PaginatedResult<ListUserItem>>>;
}

export const UsersPage = ({ listUserResponse }: UsersPageProps) => {
  return (
    <>
      <UserTable listUserResponse={listUserResponse} />
      <AddUserForm />
      <ViewEditUserForm />
      <ResetPasswordForm />
    </>
  );
};

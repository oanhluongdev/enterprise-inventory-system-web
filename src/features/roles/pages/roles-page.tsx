import React from "react";
import { ListRolesItem } from "@/features/roles/server/actions/list-roles/list-role-item";
import { ApiResponse } from "@/lib/http-helper";
import { RoleTable } from "../components/roles-table";
import { ViewRoleForm } from "../components/view-role-form";
import { EditRoleForm } from "../components/edit-role-form";

interface RolesPageProps {
  listRoleResponse: Promise<ApiResponse<ListRolesItem[]>>;
}

export const RolesPage = ({ listRoleResponse }: RolesPageProps) => {
  return (
    <>
      <RoleTable rolesResponse={listRoleResponse} />
      <ViewRoleForm />
      <EditRoleForm />
    </>
  );
};

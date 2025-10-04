import React from "react";
import { PageTitle } from "@/components/page-title";
import { AddRoleForm } from "./add-role-form";
import * as resources from "@/resources/string-resources.json";

export const RolesPageTitle = () => {
  return (
    <PageTitle title={resources.role.roles} rightActions={<AddRoleForm />} />
  );
};

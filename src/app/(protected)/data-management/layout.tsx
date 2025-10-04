import React from "react";
import { DataManagementLayout } from "@/features/data-managment/layouts/data-management-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DataManagementLayout>{children}</DataManagementLayout>;
};

export default Layout;

import React from "react";
import { LayoutProps } from "@/components/layout-prop";
import { DataManagementSidebar } from "../components/data-management-sidebar";

export const DataManagementLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <DataManagementSidebar />
      <main className="w-full p-2">{children}</main>
    </>
  );
};

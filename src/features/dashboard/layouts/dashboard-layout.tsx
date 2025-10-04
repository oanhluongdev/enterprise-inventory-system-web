import React from "react";
import { LayoutProps } from "@/components/layout-prop";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <DashboardSidebar />
      <main className="w-full p-2">{children}</main>
    </>
  );
};

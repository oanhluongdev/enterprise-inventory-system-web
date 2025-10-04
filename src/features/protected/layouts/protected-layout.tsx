import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Navbar } from "../components/navbar";

export const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <Navbar />
        <div className="w-full min-h-screen flex pt-14">{children}</div>
      </div>
    </SidebarProvider>
  );
};

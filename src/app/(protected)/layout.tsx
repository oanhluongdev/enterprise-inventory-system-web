import React from "react";
import { ProtectedLayout } from "@/features/protected/layouts/protected-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default Layout;

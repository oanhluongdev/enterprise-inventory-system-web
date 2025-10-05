import { BusinessLayout } from "@/features/business/layouts/business-layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <BusinessLayout>{children}</BusinessLayout>;
};

export default Layout;

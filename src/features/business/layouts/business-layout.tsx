import React from "react";
import { Landmark, Users } from "lucide-react";
import { LayoutProps } from "@/components/layout-prop";
import { LeftSidebar } from "@/components/left-sidebar";
import * as resouces from "@/resources/string-resources.json";
const businessUrl = "/business";

const sidebarData = {
  title: resouces.business.businessData,
  groups: [
    {
      groupTitle: resouces.business.userManagement,
      icon: Users,
      subItems: [
        {
          title: resouces.business.users,
          url: `${businessUrl}/users`,
        },
        {
          title: resouces.business.roles,
          url: `${businessUrl}/roles`,
        },
      ],
    },
    {
      groupTitle: resouces.business.companyManagement,
      icon: Landmark,
      subItems: [
        {
          title: resouces.business.companies,
          url: `${businessUrl}/companies`,
        },
      ],
    },
  ],
};

export const BusinessLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <LeftSidebar data={sidebarData} />
      <main className="w-full p-2">{children}</main>
    </>
  );
};

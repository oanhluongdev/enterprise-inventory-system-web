import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, Computer, Database, Users } from "lucide-react";
import Link from "next/link";

const sidebarData = [
  {
    groupTitle: "Devices Management",
    icon: Computer,
    subItems: [
      {
        title: "Devices",
        url: "/data-management/devices",
      },
    ],
  },
  {
    groupTitle: "Common Data",
    icon: Database,
    subItems: [
      {
        title: "Areas",
        url: "/data-management/areas",
      },
    ],
  },
  {
    groupTitle: "User Management",
    icon: Users,
    subItems: [
      {
        title: "Users",
        url: "/data-management/users",
      },
      {
        title: "Roles",
        url: "/data-management/roles",
      },
    ],
  },
];

export const DataManagementSidebar = () => {
  return (
    <Sidebar className="pt-14" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Data Management</SidebarGroupLabel>
          <SidebarGroupContent>
            {sidebarData.map((g) => (
              <SidebarMenu key={g.groupTitle}>
                <Collapsible defaultOpen={false} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <g.icon /> <span>{g.groupTitle}</span>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {g.subItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

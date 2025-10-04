import React from "react";
import { NavMenu } from "./nav-menu";
import { NavRightSection } from "./nav-right-section";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Navbar = () => {
  return (
    <nav className="fixed w-full h-14 z-50 bg-background border-b flex items-center justify-between px-5">
      <div className="flex items-center gap-12">
        <SidebarTrigger />
        <NavMenu />
      </div>
      <NavRightSection />
    </nav>
  );
};

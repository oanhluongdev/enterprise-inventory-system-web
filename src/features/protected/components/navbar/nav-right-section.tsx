"use client";
import React from "react";
import { Notifications } from "./notifications";
import { UserAccount } from "./user-account";

export const NavRightSection = () => {
  return (
    <div className="flex items-center gap-4 pr-8">
      <Notifications />
      <UserAccount />
    </div>
  );
};

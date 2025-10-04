"use client";

import React, { useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import {
  Command,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useSession, signOut } from "next-auth/react";

export const UserAccount = () => {
  const { data } = useSession();
  const handleLogout = useCallback(() => {
    signOut({ callbackUrl: "/signin" });
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="p-0">
          <UserCircleIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-[200px] mr-2">
        <div className="flex flex-row items-center gap-2 px-2 pt-2">
          <div className="h-auto">
            <UserCircleIcon size="32" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs">{data?.user.id}</span>
            <span className="text-xs text-foreground/70">
              {data?.user.email}
            </span>
          </div>
        </div>

        <Command className="mt-4">
          <CommandList>
            <CommandItem>Account Detail</CommandItem>
            <CommandItem>Change Password</CommandItem>
            <CommandSeparator className="my-2" />
            <CommandItem onSelect={handleLogout}>Logout</CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

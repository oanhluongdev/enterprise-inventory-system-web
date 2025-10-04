"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { MoreHorizontal } from "lucide-react";
export interface ActionItem {
  title: string;
  action: number | string;
  icon: React.ReactNode;
  beginGroup?: boolean;
}
interface TableActionProps {
  id: string;
  actionItems: ActionItem[];
  actionFn: (id: string, action: number | string) => void;
}

export const DataTableAction = ({
  id,
  actionItems,
  actionFn,
}: TableActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer rounded">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="rounded">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actionItems.map((action) => (
          <DropdownMenuItem
            key={action.title}
            className="hover:rounded"
            onClick={() => actionFn(id, action.action)}
          >
            {action.icon}
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

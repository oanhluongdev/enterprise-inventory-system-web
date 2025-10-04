"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ActionItem, DataTableAction } from "@/components/data-table-action";
import { FormActions } from "@/types/form-action";
import { ListUserItem } from "../../server/list-users/list-user-item";
import * as resouces from "@/resources/string-resources.json";
import { FilePenLine, FileText, Trash, ListRestart } from "lucide-react";
import { hasPermissions } from "@/lib/permission-helper";
import { UserPermissions } from "@/types/user-permissions";

export const createUserTableColumns = (
  actionFn: (id: string, action: number | string) => void,
  userPermissions: string
): ColumnDef<ListUserItem>[] => {
  const createActionItems = (userPermissions: string): ActionItem[] => {
    const actionItems: ActionItem[] = [];
    if (
      hasPermissions(userPermissions, UserPermissions.PermissionEditUser) ||
      hasPermissions(userPermissions, UserPermissions.PermissionViewUser) ||
      hasPermissions(userPermissions, UserPermissions.PermissionAll)
    ) {
      actionItems.push({
        title: resouces.common.detail,
        action: FormActions.View,
        icon: <FileText />,
      });
    }
    if (
      hasPermissions(userPermissions, UserPermissions.PermissionEditUser) ||
      hasPermissions(userPermissions, UserPermissions.PermissionAll)
    ) {
      actionItems.push({
        title: resouces.common.edit,
        action: FormActions.Edit,
        icon: <FilePenLine />,
      });
    }
    if (
      hasPermissions(userPermissions, UserPermissions.PermissionDeleteUser) ||
      hasPermissions(userPermissions, UserPermissions.PermissionAll)
    ) {
      actionItems.push({
        title: resouces.common.delete,
        action: FormActions.Delete,
        icon: <Trash />,
        beginGroup: true,
      });
    }
    if (
      hasPermissions(userPermissions, UserPermissions.PermissionEditUser) ||
      hasPermissions(userPermissions, UserPermissions.PermissionAll)
    ) {
      actionItems.push({
        title: resouces.user.resetPassword,
        action: FormActions.Reset,
        icon: <ListRestart />,
      });
    }
    return actionItems;
  };
  return [
    {
      accessorKey: "username",
      header: () => <div className="font-semibold">Username</div>,
      cell: ({ row }) => {
        return <div>{row.getValue("username")}</div>;
      },
    },
    {
      accessorKey: "email",
      header: () => <div className="font-semibold">Email</div>,
      cell: ({ row }) => {
        return <div>{row.getValue("email")}</div>;
      },
    },
    {
      accessorKey: "fullname",
      header: () => <div className="font-semibold">Fullname</div>,
      cell: ({ row }) => {
        return <div>{row.getValue("fullname")}</div>;
      },
    },
    {
      accessorKey: "phone",
      header: () => <div className="font-semibold">Phone</div>,
      cell: ({ row }) => {
        return <div>{row.getValue("phone")}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="font-semibold">Created At</div>,
      cell: ({ row }) => {
        return <div>{row.getValue("createdAt")}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: () => <div className="font-semibold">Updated At</div>,
      cell: ({ row }) => {
        return <div>{row.getValue("updatedAt")}</div>;
      },
    },
    {
      accessorKey: "isActive",
      header: () => <div className="font-semibold">Active</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <Checkbox checked={row.getValue("isActive")} />
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div className="font-semibold">Actions</div>,
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <DataTableAction
            id={id}
            actionItems={createActionItems(userPermissions)}
            actionFn={actionFn}
          />
        );
      },
    },
  ];
};

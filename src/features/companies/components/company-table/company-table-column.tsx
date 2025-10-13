"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ActionItem, DataTableAction } from "@/components/data-table-action";
import { FormActions } from "@/types/form-action";
import { ListCompanyItem } from "../../server/actions/list-companies/list-company-item";
import * as resouces from "@/resources/string-resources.json";
import { FilePenLine, FileText, Trash } from "lucide-react";
import { hasPermissions } from "@/lib/permission-helper";
import { UserPermissions } from "@/types/user-permissions";

export const createCompanyTableColumns = (
  actionFn: (id: string, action: number | string) => void,
  userPermissions: string
): ColumnDef<ListCompanyItem>[] => {
  const createActionItems = (userPermissions: string): ActionItem[] => {
    const actionItems: ActionItem[] = [];
    if (hasPermissions(userPermissions, UserPermissions.PermissionAll)) {
      actionItems.push({
        title: resouces.common.detail,
        action: FormActions.View,
        icon: <FileText />,
      });
    }
    if (hasPermissions(userPermissions, UserPermissions.PermissionAll)) {
      actionItems.push({
        title: resouces.common.edit,
        action: FormActions.Edit,
        icon: <FilePenLine />,
      });
    }
    if (hasPermissions(userPermissions, UserPermissions.PermissionAll)) {
      actionItems.push({
        title: resouces.common.delete,
        action: FormActions.Delete,
        icon: <Trash />,
        beginGroup: true,
      });
    }
    return actionItems;
  };
  return [
    {
      accessorKey: "name",
      header: () => (
        <div className="font-semibold">{resouces.company.name}</div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("name")}</div>;
      },
    },
    {
      accessorKey: "legalName",
      header: () => (
        <div className="font-semibold">{resouces.company.legalName}</div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("legalName")}</div>;
      },
    },
    {
      accessorKey: "registrationNumber",
      header: () => (
        <div className="font-semibold">
          {resouces.company.registrationNumber}
        </div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("registrationNumber")}</div>;
      },
    },
    {
      accessorKey: "taxId",
      header: () => (
        <div className="font-semibold">{resouces.company.taxId}</div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("taxId")}</div>;
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="font-semibold">{resouces.company.email}</div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("email")}</div>;
      },
    },
    {
      accessorKey: "phone",
      header: () => (
        <div className="font-semibold">{resouces.company.phone}</div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("phone")}</div>;
      },
    },
    {
      accessorKey: "isActive",
      header: () => <div className="font-semibold">{resouces.user.active}</div>,
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

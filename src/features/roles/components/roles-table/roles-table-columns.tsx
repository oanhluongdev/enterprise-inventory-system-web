"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { FormActions } from "@/types/form-action";
import { ActionItem, DataTableAction } from "@/components/data-table-action";
import { ListRolesItem } from "../../server/actions/list-roles/list-role-item";
import * as resouces from "@/resources/string-resources.json";
import { FilePenLine, FileText, Trash } from "lucide-react";
const actionItems: ActionItem[] = [
  {
    title: resouces.common.detail,
    action: FormActions.View,
    icon: <FileText />,
  },
  {
    title: resouces.common.edit,
    action: FormActions.Edit,
    icon: <FilePenLine />,
  },
  {
    title: resouces.common.delete,
    action: FormActions.Delete,
    icon: <Trash />,
    beginGroup: true,
  },
];
export const createColumns = (
  actionFn: (id: string, action: number | string) => void
): ColumnDef<ListRolesItem>[] => [
  {
    accessorKey: "name",
    header: () => <div className="font-semibold">Name</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="font-semibold">Description</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "enabled",
    header: () => <div className="font-semibold">Enabled</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Checkbox checked={row.getValue("enabled")} />
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
          actionItems={actionItems}
          actionFn={actionFn}
        />
      );
    },
  },
];

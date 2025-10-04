"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ListPermissionItem } from "../../server/actions/list-permission/list-permission-item";

interface CreatePermissionTableColumnsOption {
  onRowCheckedChange: (id: string, checked: boolean) => void;
  onAllRowsCheckedChange?: (checked: boolean) => void;
  selectedPermissions?: string[];
  disabled?: boolean;
}

export const createPermissionTableColumns = (
  option: CreatePermissionTableColumnsOption
): ColumnDef<ListPermissionItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        disabled={option.disabled}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") ||
          (option.selectedPermissions &&
            option.selectedPermissions.length === table.getRowCount())
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          option.onAllRowsCheckedChange?.(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        disabled={option.disabled}
        checked={
          row.getIsSelected() ||
          (option.selectedPermissions &&
            option.selectedPermissions.findIndex(
              (id) => id === row.getValue("id")
            ) > -1)
        }
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          if (option.selectedPermissions) {
            const index = option.selectedPermissions.indexOf(
              row.getValue("id")
            );
            if (index > -1) {
              option.selectedPermissions.splice(index, 1);
            }
          }
          option.onRowCheckedChange(row.getValue("id"), !!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
  },
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
];

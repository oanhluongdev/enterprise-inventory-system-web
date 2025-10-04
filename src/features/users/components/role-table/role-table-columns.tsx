"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ListRolesItem } from "@/features/roles/server/actions/list-roles/list-role-item";
import { ColumnDef } from "@tanstack/react-table";

interface CreateRoleTableColumnsOption {
  onRowCheckedChange: (id: string, checked: boolean) => void;
  onAllRowsCheckedChange?: (checked: boolean) => void;
  selectedRoles?: string[];
  disabled?: boolean;
}

export const createRoleTableColumns = (
  option: CreateRoleTableColumnsOption
): ColumnDef<ListRolesItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        disabled={option.disabled}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") ||
          (option.selectedRoles &&
            option.selectedRoles.length === table.getRowCount())
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
          (option.selectedRoles &&
            option.selectedRoles.findIndex((id) => id === row.getValue("id")) >
              -1)
        }
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          if (option.selectedRoles) {
            const index = option.selectedRoles.indexOf(row.getValue("id"));
            if (index > -1) {
              option.selectedRoles.splice(index, 1);
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

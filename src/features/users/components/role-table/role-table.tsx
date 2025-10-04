"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { createRoleTableColumns } from "./role-table-columns";
import { ListRolesItem } from "@/features/roles/server/actions/list-roles/list-role-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RoleTableProps {
  listRoles: ListRolesItem[];
  selectedRoles?: string[];
  disabled?: boolean;
  onSelectedChange?: (selectedIds: string[]) => void;
}
export const RoleTable = ({
  listRoles,
  selectedRoles,
  disabled,
  onSelectedChange,
}: RoleTableProps) => {
  const [selectedIds, setSelectedId] = useState<string[]>([]);

  const onRowSelectedChange = useCallback(
    (id: string, selected: boolean) => {
      const selectedIdsTmp = [...selectedIds];
      if (selected) {
        selectedIdsTmp.push(id);
      } else {
        const index = selectedIdsTmp.indexOf(id);
        if (index > -1) {
          selectedIdsTmp.splice(index, 1);
        }
      }
      setSelectedId(selectedIdsTmp);
      onSelectedChange?.(selectedIdsTmp);
    },
    [selectedIds, onSelectedChange]
  );

  useEffect(() => {
    setSelectedId(selectedRoles ? selectedRoles : []);
  }, [selectedRoles]);

  const onAllRowsCheckedChange = useCallback(
    (checked: boolean) => {
      const selectedIdsTmp: string[] = [];
      if (checked) {
        listRoles.forEach((it) => selectedIdsTmp.push(it.id));
      }
      setSelectedId(selectedIdsTmp);
      onSelectedChange?.(selectedIdsTmp);
    },
    [listRoles, onSelectedChange]
  );

  const columns = createRoleTableColumns({
    onRowCheckedChange: onRowSelectedChange,
    onAllRowsCheckedChange: onAllRowsCheckedChange,
    selectedRoles: selectedRoles,
    disabled: disabled,
  });
  return (
    <ScrollArea className="h-[410px] border">
      <DataTable
        columns={columns}
        data={listRoles}
        initialState={{
          columnVisibility: {
            id: false,
          },
        }}
      />
    </ScrollArea>
  );
};

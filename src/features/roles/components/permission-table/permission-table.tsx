"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { createPermissionTableColumns } from "./permission-table-columns";
import { ListPermissionItem } from "../../server/actions/list-permission/list-permission-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PermissionTableProps {
  listPermissions: ListPermissionItem[];
  selectedPerrmissions?: string[];
  disabled?: boolean;
  onSelectedChange?: (selectedIds: string[]) => void;
}
export const PermissionTable = ({
  listPermissions,
  selectedPerrmissions,
  disabled,
  onSelectedChange,
}: PermissionTableProps) => {
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
    setSelectedId(selectedPerrmissions ? selectedPerrmissions : []);
  }, [selectedPerrmissions]);

  const onAllRowsCheckedChange = useCallback(
    (checked: boolean) => {
      const selectedIdsTmp: string[] = [];
      if (checked) {
        listPermissions.forEach((it) => selectedIdsTmp.push(it.id));
      }
      setSelectedId(selectedIdsTmp);
      onSelectedChange?.(selectedIdsTmp);
    },
    [listPermissions, onSelectedChange]
  );

  const columns = createPermissionTableColumns({
    onRowCheckedChange: onRowSelectedChange,
    onAllRowsCheckedChange: onAllRowsCheckedChange,
    selectedPermissions: selectedPerrmissions,
    disabled: disabled,
  });
  return (
    <ScrollArea className="h-[260px] border">
      <DataTable
        columns={columns}
        data={listPermissions}
        initialState={{
          columnVisibility: {
            id: false,
          },
        }}
      />
    </ScrollArea>
  );
};

"use client";

import React, { useCallback, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
type PageTitleProps = {
  title: string;
  showSearch?: boolean;
  rightActions?: React.JSX.Element;
  onSearchChange?: (search: string) => void;
};
export const PageTitle = ({
  title,
  showSearch,
  rightActions,
  onSearchChange,
}: PageTitleProps) => {
  const searchTextRef = useRef<HTMLInputElement>(null);
  const [showClear, setShowClear] = useState(false);

  const onClearText = useCallback(() => {
    if (searchTextRef.current) {
      searchTextRef.current.value = "";
      setShowClear(false);
      onSearchChange?.("");
    }
  }, [onSearchChange]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.(e.target.value);
      if (e.target.value.length === 0) {
        setShowClear(false);
      } else {
        setShowClear(true);
      }
    },
    [onSearchChange]
  );

  return (
    <div className="border-b py-1 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      {showSearch && (
        <div className="w-[30%] hidden lg:flex relative">
          <Input
            ref={searchTextRef}
            className="peer px-8"
            placeholder="Enter to search..."
            onChange={handleSearchChange}
          />
          <Search
            className="absolute top-[50%] translate-y-[-50%] left-1.5"
            size={16}
          />
          <button
            onClick={onClearText}
            className={cn(
              `absolute top-[50%] translate-y-[-50%] right-1`,
              showClear ? "block" : "hidden"
            )}
          >
            <X size={16} />
          </button>
        </div>
      )}
      {rightActions}
    </div>
  );
};

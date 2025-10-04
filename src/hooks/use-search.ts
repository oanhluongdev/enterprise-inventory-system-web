"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { replace } = useRouter();
  const onSearch = (text: string) => {
    setSearchTerm(text);
  };
  useEffect(() => {
    const searchParam = "search";
    const params = new URLSearchParams(searchParams);
    const oldSearch = params.get(searchParam) || "";
    if (oldSearch !== debouncedSearchTerm) {
      params.set("page", "1");
    }
    if (debouncedSearchTerm) {
      params.set(searchParam, debouncedSearchTerm);
    } else {
      params.delete(searchParam);
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, replace, searchParams, searchTerm]);
  return onSearch;
};

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { PaginationButton } from "./pagination-button";
import { PaginationNextButton } from "./pagination-next-button";
import { PaginationPreviousButton } from "./pagination-prev-button";

interface TablePaginationProps {
  totalPages: number;
  className?: string;
}

export const TablePagination = ({
  totalPages,
  className,
}: TablePaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [itemsPerPageOptions] = useState([5, 10, 20, 50]);

  const [currentPage, pageSize] = useMemo((): [number, number] => {
    const params = new URLSearchParams(searchParams);
    const page = params.get("page");
    const pageResult = page ? +page : 1;
    const ps = params.get("size");
    const pageSizeTmp = ps ? +ps : 10;
    return [pageResult, pageSizeTmp];
  }, [searchParams]);

  useEffect(() => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    setVisiblePages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", `${page}`);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  const handleChangePageSize = useCallback(
    (size: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("size", size);
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );
  return (
    <div className={cn("flex flex-row items-center", className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPreviousButton
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationButton
                isActive={page == currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationButton>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNextButton
              disabled={currentPage == totalPages}
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Select defaultValue={`${pageSize}`} onValueChange={handleChangePageSize}>
        <SelectTrigger className="w-[100px] border-none ring-0 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Page Size</SelectLabel>
            {itemsPerPageOptions.map((it) => (
              <SelectItem key={it} value={`${it}`}>
                {it}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

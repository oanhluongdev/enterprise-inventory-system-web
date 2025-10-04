import React from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div
      className={cn(
        "p-2 w-full flex flex-col border border-border rounded",
        className
      )}
    >
      {children}
    </div>
  );
};

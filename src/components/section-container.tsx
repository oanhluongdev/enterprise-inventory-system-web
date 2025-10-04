import React from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const SectionContainer = ({
  children,
  className,
}: SectionContainerProps) => {
  return (
    <div className={cn("border border-border rounded", className)}>
      {children}
    </div>
  );
};

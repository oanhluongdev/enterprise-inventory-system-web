import { ChevronLeftIcon } from "lucide-react";
import { PaginationButton } from "./pagination-button";
import { cn } from "@/lib/utils";

export function PaginationPreviousButton({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationButton>
  );
}

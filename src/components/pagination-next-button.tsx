import { ChevronRightIcon } from "lucide-react";
import { PaginationButton } from "./pagination-button";
import { cn } from "@/lib/utils";

export function PaginationNextButton({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationButton>
  );
}

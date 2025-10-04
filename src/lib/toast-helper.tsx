import { toast } from "sonner";
import { CircleCheck } from "lucide-react";
import * as resouces from "@/resources/string-resources.json";

export const DisplayToastSuccess = (msg: string) => {
  toast.success(resouces.common.success, {
    description: (
      <span className="text-foreground dark:text-foreground">{msg}</span>
    ),
    icon: <CircleCheck className="text-green-500 size-5" />,
    position: "top-right",
    duration: 5000,
  });
};

export const DisplayToastError = (msg: string) => {
  toast.error(resouces.common.error, {
    description: (
      <span className="text-foreground dark:text-foreground">{msg}</span>
    ),
    position: "top-right",
    duration: 5000,
  });
};

import { Button, type ButtonProps } from "@/components/shadcn/ui/button";
import type { UseMutationResult } from "rakkasjs";
import { Loader } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SpinnerButtonProps extends ButtonProps {
  label?: React.ReactNode;
  mutation: UseMutationResult<any,any>;
  className?: string;
  loaderClassname?: string;
}

export function RakkasSpinnerButton({
  mutation,
  label,
  className,
  loaderClassname,
  ...props
}: SpinnerButtonProps) {
  return (
    <Button
      className={twMerge(
        "min-w-[80%] md:min-w-[50%] flex gap-2 justify-center font-bold items-center",
        className,
      )}
      variant={"outline"}
      disabled={mutation.isLoading}
      {...props}
    >
      {label || <div> Save</div>}
      {mutation.isLoading && (
        <Loader className={twMerge("animate-spin", loaderClassname)} />
      )}
    </Button>
  );
}

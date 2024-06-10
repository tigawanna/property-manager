import { Button, type ButtonProps } from "@/components/shadcn/ui/button";
import type { UseMutationResult } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SpinnerButtonProps extends ButtonProps {
  label?: React.ReactNode;
  mutation: UseMutationResult<any,any,any,any>;
  className?: string;
  loaderClassname?: string;
}

export function SpinnerButton({
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

      disabled={mutation.isPending}
      {...props}
    >
      {label || <div> Save</div>}
      {mutation.isPending && (
        <Loader className={twMerge("animate-spin", loaderClassname)} />
      )}
    </Button>
    
  );
}

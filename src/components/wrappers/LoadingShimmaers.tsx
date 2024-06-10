import { twMerge } from "tailwind-merge";

interface TextFieldLoadingShimmaersProps {
  className?: string;
}

export function TextFieldLoadingShimmaers({ className }: TextFieldLoadingShimmaersProps) {
  return (
    <div
      className={twMerge("w-full h-4 skeleton bg-base-300", className)}
    ></div>
  );
}

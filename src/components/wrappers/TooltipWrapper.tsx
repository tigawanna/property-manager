import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn/ui/tooltip";


interface TooltipWrapperProps {
children:React.ReactNode
label:string
}

export function TooltipWrapper({children,label}:TooltipWrapperProps){
return (
  <TooltipProvider>
  <Tooltip >
    <TooltipTrigger>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
);
}

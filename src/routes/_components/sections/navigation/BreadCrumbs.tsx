import { useRakkasBreadCrumbs } from "./use-bread-crumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import React from "react";

interface BreadCrumbsProps {}

export default function BreadCrumbs({}: BreadCrumbsProps) {
  const { breadcrumb_routes } = useRakkasBreadCrumbs();
  if(breadcrumb_routes.length === 1){
    return null
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb_routes.map(({ name, path }, idx) => {
          // if (
          //   breadcrumb_routes.length > 3 && idx > 1 && idx < breadcrumb_routes.length - 1) {
          //   return (
          //     <React.Fragment key={name}>
          //       <BreadcrumbItem>
          //         <BreadcrumbEllipsis />
          //       </BreadcrumbItem>
          //     </React.Fragment>
          //   );
          // }
          return (
            <React.Fragment key={name}>
              <BreadcrumbItem>
                <BreadcrumbLink href={path}>{name}</BreadcrumbLink>
              </BreadcrumbItem>
      
              {idx < breadcrumb_routes.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
    // <div className="flex z-50 px-2 h-5 ml-10 sm:ml-1">
    //   {breadcrumb_routes.map(({ name, path }, idx) => {
    //     return (
    //       <StyledLink
    //         key={name}
    //         href={path}
    //         className="text-sm text-white hover:text-[#fac091]"
    //         activeClass="text-[#effa91]"
    //       >
    //         {name} {idx < breadcrumb_routes.length - 1 && ">"}
    //       </StyledLink>
    //     );
    //   })}
    // </div>
  );
}

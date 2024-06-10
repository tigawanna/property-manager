import * as React from "react";
import { Link } from "rakkasjs";
import { cn } from "@/components/shadcn/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/ui/navigation-menu";
import { drink_categories, other_routes } from "./drinks_route_list";

export default function NavigationMenuLinks() {
  return (
    <NavigationMenu className="w-full z-50 ">
      <NavigationMenuList>
        {/* drinks menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Drinks</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-wrap w-full  0 gap-3 p-2 max-h-[70vh] overflow-y-scroll bg-base-100">
              {drink_categories.map((cat) => (
                <ListItem key={cat.title} title={cat.title} href={cat.href}>
                  {cat.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {other_routes.map((route) => (
          <NavigationMenuItem key={route.title}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href={route.href}>{route.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="min-w-24 flex-1 ">
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 p-2  rounded-md leading-none no-underline bg-base-200/30 outline-none transition-colors hover:bg-base-300 focus:bg-base-300 ",
            className,
          )}
          {...props}
        >
          <div className="text font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug ">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

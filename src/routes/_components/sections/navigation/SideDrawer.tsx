import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import { Menu, X } from "lucide-react";
import { TooltipWrapper } from "@/components/wrappers/TooltipWrapper";
import { Link } from "rakkasjs";
import { drink_categories, other_routes } from "./drinks_route_list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface SideDrawerProps {}

export function SideDrawer({}: SideDrawerProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="w-fit min-w-[80%] md:min-w-[30%]  h-full left-0  bg-base-300 ">
        <div className="w-full h-full flex flex-col justify-between items-center  pb-12 relative ">
          <DrawerClose className="absolute bottom-[3%] right-[5%]">
            <X />
          </DrawerClose>

          <div className="w-full h-full  flex flex-col gap-3 justify-enenly overflow-y-scroll p-2 items-center">
            <TooltipWrapper label="Home">
              <Link href="/" className="">
                <img src="/site.svg" alt="logo" className="size-10" />
              </Link>
            </TooltipWrapper>
            <br />
            <Accordion type="multiple" className="w-full px-2">
              <AccordionItem value="item-1" className="w-full ">
                <AccordionTrigger>Drinks</AccordionTrigger>
                <AccordionContent className="w-full">
                  <div className="w-full max-h-[60vh] flex flex-col gap-2 overflow-y-scroll">
                    {drink_categories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="w-full hover:text-sky-600 p-2 hover:link-hover "
                      >
                        <DrawerClose key={cat.href} className="w-full">
                          {" "}
                          {cat.title}
                        </DrawerClose>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="w-full flex flex-col gap-2 px-2">
              {other_routes.map((route) => {
                return (
                  <Link
                    href={route.href}
                    key={route.title}
                    className="hover:link-hover hover:text-sky-600 font-medium py-4 border-b "
                  >
                    {route.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* <MiniSettingsModal triggerClassname="size-16" /> */}
          <ThemeSwitcher />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
//

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useSSRFriendlyTheme } from "@/lib/rakkas/theme";

interface ThemeToggleModalProps {}

export function ThemeToggle({}: ThemeToggleModalProps) {
  const theme_list = [
    "light",
    "dark",
    "light-brownish",
    "dark-brownish"
    // "cupcake",
    // "custom",
    // "wireframe",
    // "black",
    // "acid",
    // "night",
    // "coffee",
    // "dim",
    // "nord",
    // "sunset",
  ];

  const { theme, updateTheme } = useSSRFriendlyTheme();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-5">
      {/* <Label>Theme</Label> */}
      <Select
        data-choose-theme
        value={theme}
        onValueChange={(e) => {
          updateTheme(e);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{theme}</SelectLabel>
            {theme_list.map((theme) => {
              return (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

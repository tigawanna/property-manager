import { Input } from "@/components/shadcn/ui/input";
import { Loader, X } from "lucide-react";
import { useRef, useTransition } from "react";

interface SearchBoxProps {
  debouncedValue: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  isDebouncing: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  keyword:string
}

export function SearchBox({
  debouncedValue,
  isDebouncing,
  setKeyword,
  keyword,
  inputProps,
}: SearchBoxProps) {
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="w-full sticky top-0 ">
      <div className="w-full relative">
        <Input
          ref={inputRef}
          placeholder="Search"
          className="w-full bg-base-200/30"
          value={keyword}
          onChange={(e) => {
            startTransition(() => {
              setKeyword((prev) => {
                return e.target.value;
              });
            });
          }}
          {...inputProps}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <X
            className=""
            onClick={() => {
              setKeyword("");
              if (inputRef?.current?.value) {
                console.log(inputRef?.current.value )
            
              }
            }}
          />
        </div>
        {isDebouncing && (
          <div className="absolute inset-y-0 right-[10%] flex items-center pr-3">
            <Loader className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

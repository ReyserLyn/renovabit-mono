import { Input } from "@renovabit/ui/components/ui/input";

import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useId } from "react";

type inputSearchProps = {
  placeholder?: string;
  className?: string;
};

export default function InputSearch({
  placeholder = "Buscar...",
  className,
}: inputSearchProps) {
  const id = useId();
  return (
    <div className={`${className} *:not-first:mt-2`}>
      <div className="relative">
        <Input
          className="peer ps-9 pe-9"
          id={id}
          placeholder={placeholder}
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          aria-label="Submit search"
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
        >
          <ArrowRightIcon aria-hidden="true" size={16} />
        </button>
      </div>
    </div>
  );
}

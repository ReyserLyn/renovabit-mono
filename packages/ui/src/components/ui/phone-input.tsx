import { cn } from "@renovabit/ui/lib/utils";
import React from "react";
import { LogoPeru } from "../logo/logo-peru";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <div className="flex w-12 items-center gap-2">
        <LogoPeru />
        <span className="font-medium text-foreground text-sm">+51</span>
      </div>

      <div className="mx-3 h-4 w-px bg-border" />

      <input
        className="flex-1 border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0"
        inputMode="numeric"
        maxLength={9}
        onInput={(e) => {
          const input = e.currentTarget;
          input.value = input.value.replace(/\D+/g, "");
        }}
        pattern="\d*"
        placeholder="Enter a phone number"
        ref={ref}
        type="tel"
        {...props}
      />
    </div>
  )
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };

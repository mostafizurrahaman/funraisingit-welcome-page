import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "pill" | "ghost"
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 cursor-text disabled:cursor-not-allowed disabled:opacity-50 transition-all outline-none",
          variant === "default" &&
            "rounded-xl border border-slate-200 focus-visible:border-[#FF6200] focus-visible:ring-2 focus-visible:ring-[#FF6200]/20",
          variant === "pill" &&
            "rounded-full border border-slate-200 focus-visible:border-[#FF6200] focus-visible:ring-2 focus-visible:ring-[#FF6200]/20",
          variant === "ghost" &&
            "border-0 bg-transparent focus-visible:ring-0",
          "aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

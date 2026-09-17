import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "orange" | "teal" | "default" | "outline" | "ghost" | "link" | "soft"
  size?: "default" | "sm" | "lg" | "icon" | "pill"
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none active:scale-[0.98]",
          // Variants
          variant === "default" &&
            "bg-[#FF6200] text-white hover:bg-[#E85900] shadow-sm",
          variant === "orange" &&
            "bg-gradient-to-r from-[#FF6900] to-[#F55200] text-white hover:from-[#F55200] hover:to-[#E54800] shadow-orange-glow rounded-full font-bold",
          variant === "teal" &&
            "bg-[#00A3A6] text-white hover:bg-[#008C8F] shadow-sm rounded-full",
          variant === "outline" &&
            "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 shadow-sm",
          variant === "ghost" &&
            "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
          variant === "soft" &&
            "bg-[#CCFBF1] text-[#0F766E] hover:bg-[#B2F5EA]",
          variant === "link" &&
            "text-slate-600 underline-offset-4 hover:underline hover:text-slate-900 p-0 h-auto",
          // Sizes
          size === "default" && "h-11 px-5 py-2 rounded-xl",
          size === "sm" && "h-9 px-3.5 text-xs rounded-lg",
          size === "lg" && "h-12 px-7 text-base rounded-2xl",
          size === "pill" && "h-11 px-6 text-sm rounded-full",
          size === "icon" && "h-10 w-10 rounded-full p-0",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

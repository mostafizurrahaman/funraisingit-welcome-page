import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "teal" | "orange" | "slate" | "success" | "outline"
  size?: "sm" | "default" | "lg"
}

export function Badge({
  className,
  variant = "teal",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors select-none cursor-default",
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "default" && "px-3.5 py-1 text-xs sm:text-sm",
        size === "lg" && "px-4 py-1.5 text-sm",
        // Variants
        variant === "teal" &&
          "bg-[#CCFBF1] text-[#0F766E] border border-[#99F6E4]/50",
        variant === "orange" &&
          "bg-[#FFF0EB] text-[#EA580C] border border-[#FFD9CC]/60 font-semibold",
        variant === "success" &&
          "bg-emerald-50 text-emerald-700 border border-emerald-200",
        variant === "slate" &&
          "bg-slate-100 text-slate-700 border border-slate-200",
        variant === "outline" &&
          "border border-slate-200 text-slate-700",
        className
      )}
      {...props}
    />
  )
}

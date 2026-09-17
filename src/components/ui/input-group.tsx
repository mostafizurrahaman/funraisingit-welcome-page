import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "pill"
  "data-invalid"?: boolean
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, variant = "pill", "data-invalid": dataInvalid, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-invalid={dataInvalid}
        className={cn(
          "relative flex items-center w-full bg-white transition-all border border-slate-200/90 shadow-brand-pill cursor-text",
          variant === "pill" ? "rounded-full p-1.5" : "rounded-xl p-1",
          "focus-within:border-[#FF6200] focus-within:ring-2 focus-within:ring-[#FF6200]/20",
          dataInvalid && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "inline-start" | "inline-end" | "block-end"
}

export const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = "inline-start", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center text-slate-500",
          align === "inline-start" && "pl-3 pr-2",
          align === "inline-end" && "pl-2 pr-1",
          align === "block-end" && "absolute right-3 bottom-2 text-xs",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputGroupAddon.displayName = "InputGroupAddon"

export interface InputGroupTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-sm font-medium text-slate-600 flex items-center select-none", className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
InputGroupText.displayName = "InputGroupText"

export interface InputGroupTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, InputGroupTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none",
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupTextarea.displayName = "InputGroupTextarea"

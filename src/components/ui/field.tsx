import * as React from "react"
import { cn } from "@/lib/utils"
import { FieldError as RHFFieldError } from "react-hook-form"

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-4 w-full", className)}
        {...props}
      />
    )
  }
)
FieldGroup.displayName = "FieldGroup"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
  "data-invalid"?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation = "vertical", "data-invalid": dataInvalid, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-invalid={dataInvalid}
        className={cn(
          "w-full",
          orientation === "horizontal"
            ? "flex flex-row items-center gap-3"
            : "flex flex-col gap-1.5",
          className
        )}
        {...props}
      />
    )
  }
)
Field.displayName = "Field"

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none text-slate-800 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
FieldLabel.displayName = "FieldLabel"

export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-xs text-slate-500 leading-normal", className)}
        {...props}
      />
    )
  }
)
FieldDescription.displayName = "FieldDescription"

export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  errors?: (RHFFieldError | { message?: string } | string | undefined | null)[]
}

export const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, errors, children, ...props }, ref) => {
    // Extract first error message
    let message = children
    if (errors && errors.length > 0) {
      const first = errors[0]
      if (typeof first === "string") {
        message = first
      } else if (first && "message" in first && first.message) {
        message = first.message
      }
    }

    if (!message) return null

    return (
      <p
        ref={ref}
        role="alert"
        className={cn("text-xs font-medium text-red-500 animate-in fade-in-50 duration-200 mt-1", className)}
        {...props}
      >
        {message}
      </p>
    )
  }
)
FieldError.displayName = "FieldError"

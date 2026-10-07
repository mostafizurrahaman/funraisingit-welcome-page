import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
}

export function HeroHeading({
  as: Component = "h1",
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(
        "text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.08] sm:leading-[0.98] text-center select-none",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function SparkCrosshair({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={cn("w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#00A3A6] inline-block shrink-0", className)}
    >
      <line x1="9" y1="1.5" x2="9" y2="5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="12.5" x2="9" y2="16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="1.5" y1="9" x2="5.5" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12.5" y1="9" x2="16.5" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function SparkEyebrow({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs md:text-[13px] font-extrabold tracking-[0.12em] sm:tracking-[0.22em] uppercase text-[#00A3A6] select-none text-center",
        className
      )}
      {...props}
    >
      <SparkCrosshair />
      <span>{children}</span>
      <SparkCrosshair />
    </div>
  )
}

export function H1({
  as: Component = "h1",
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn("text-2xl sm:text-3xl font-bold tracking-tight text-slate-900", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H2({
  as: Component = "h2",
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn("text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function H3({
  as: Component = "h3",
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn("text-base sm:text-lg md:text-xl font-semibold tracking-tight text-slate-900", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Lead({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <p
      className={cn(
        "text-sm sm:text-base md:text-lg text-slate-600 max-w-xl text-center leading-relaxed font-normal",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function Body({
  as: Component = "p",
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn("text-sm sm:text-base text-slate-700 leading-normal", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function Muted({
  as: Component = "p",
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn("text-xs sm:text-sm text-slate-500", className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function SectionHeader({
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <h4
      className={cn(
        "text-xs font-bold uppercase tracking-wider text-slate-500",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  )
}

export const Typography = {
  Hero: HeroHeading,
  SparkEyebrow,
  H1,
  H2,
  H3,
  Lead,
  Body,
  Muted,
  SectionHeader,
}

import * as React from "react"
import { BrandLogo } from "./brand-logo"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export interface HeaderProps {
  isVipUnlocked?: boolean
  onLogoClick?: () => void
}

export function Header({ isVipUnlocked = false, onLogoClick }: HeaderProps) {
  return (
    <header className="w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-3.5 sm:py-6 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onLogoClick}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3A6] rounded-xl p-0.5 cursor-pointer bg-transparent border-0 inline-flex items-center shrink-0"
        aria-label="FunRaisingIt Home"
      >
        <BrandLogo />
      </button>
      <div className="shrink-0">
        {isVipUnlocked ? (
          <Badge
            variant="teal"
            size="default"
            className="gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-xs cursor-default select-none text-[11px] sm:text-xs md:text-sm font-semibold"
          >
            <span className="flex items-center justify-center h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-[#00A3A6] text-white shrink-0">
              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[3]" />
            </span>
            <span className="whitespace-nowrap">VIP Member Unlocked</span>
          </Badge>
        ) : (
          <Badge
            variant="teal"
            size="default"
            className="gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-xs cursor-default select-none text-[11px] sm:text-xs md:text-sm font-semibold"
          >
            <span className="h-2 w-2 rounded-full bg-[#00A3A6] animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Launching Soon</span>
          </Badge>
        )}
      </div>
    </header>
  )
}

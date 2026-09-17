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
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between">
      <button
        type="button"
        onClick={onLogoClick}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3A6] rounded-xl p-0.5 cursor-pointer bg-transparent border-0 inline-flex items-center"
        aria-label="FunRaisingIt Home"
      >
        <BrandLogo />
      </button>
      <div>
        {isVipUnlocked ? (
          <Badge variant="teal" size="default" className="gap-2 px-3.5 py-1.5 shadow-sm cursor-default select-none">
            <span className="flex items-center justify-center h-4 w-4 rounded-full bg-[#00A3A6] text-white">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span className="font-semibold text-xs sm:text-sm">VIP Member Unlocked</span>
          </Badge>
        ) : (
          <Badge variant="teal" size="default" className="gap-2 px-3.5 py-1.5 shadow-sm cursor-default select-none">
            <span className="h-2 w-2 rounded-full bg-[#00A3A6] animate-pulse" />
            <span className="font-semibold text-xs sm:text-sm">Launching Soon</span>
          </Badge>
        )}
      </div>
    </header>
  )
}

import * as React from "react"
import { Share2, Hash, Play, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Page link copied to clipboard!")
    }
  }

  return (
    <footer className="w-full border-t border-slate-100/80 bg-white/50 backdrop-blur-xs mt-auto py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          © {currentYear} FunRaisingIt. All Rights Reserved.
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share"
            className="h-8.5 w-8.5 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-[#F0FDFB] text-[#00A3A6] hover:bg-[#CCFBF1] hover:text-[#008F91] transition-all hover:scale-105 border border-[#CCFBF1]/60 cursor-pointer shadow-xs"
          >
            <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          <button
            type="button"
            onClick={() => toast.info("FunRaisingIt Community channel")}
            aria-label="Community"
            className="h-8.5 w-8.5 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-[#F0FDFB] text-[#00A3A6] hover:bg-[#CCFBF1] hover:text-[#008F91] transition-all hover:scale-105 border border-[#CCFBF1]/60 cursor-pointer shadow-xs"
          >
            <Hash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          <button
            type="button"
            onClick={() => toast.info("Watch product teaser video")}
            aria-label="Watch Demo"
            className="h-8.5 w-8.5 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-[#F0FDFB] text-[#00A3A6] hover:bg-[#CCFBF1] hover:text-[#008F91] transition-all hover:scale-105 border border-[#CCFBF1]/60 cursor-pointer shadow-xs"
          >
            <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current ml-0.5" />
          </button>
          <button
            type="button"
            onClick={() => toast.info("VIP Backer rewards store")}
            aria-label="Rewards"
            className="h-8.5 w-8.5 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-[#F0FDFB] text-[#00A3A6] hover:bg-[#CCFBF1] hover:text-[#008F91] transition-all hover:scale-105 border border-[#CCFBF1]/60 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

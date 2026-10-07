import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center select-none group cursor-pointer", className)}>
      <Image
        src="/logo.png"
        alt="FunRaisingIt"
        width={280}
        height={55}
        priority
        className="h-7 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
  )
}


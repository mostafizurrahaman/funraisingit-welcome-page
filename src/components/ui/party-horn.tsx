import * as React from "react"
import { cn } from "@/lib/utils"

export function PartyHornIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex items-center justify-center shrink-0 select-none", className)}>
      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Floating Confetti Streamers & Ribbons Bursting Out */}
        {/* Pink spiral ribbon */}
        <path
          d="M 44 26 C 45 20 52 18 55 14 C 57 11 62 13 65 10"
          stroke="#EC4899"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Blue spiral ribbon */}
        <path
          d="M 48 30 C 53 28 56 22 62 23 C 66 23 68 19 70 17"
          stroke="#00B4D8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Yellow streamer */}
        <path
          d="M 42 20 C 44 14 48 12 50 8"
          stroke="#FBBF24"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Confetti Dots & Stars */}
        <circle cx="48" cy="12" r="2" fill="#00A3A6" />
        <circle cx="58" cy="28" r="2.5" fill="#FF6400" />
        <circle cx="67" cy="22" r="2" fill="#8B5CF6" />
        <circle cx="40" cy="15" r="1.5" fill="#EC4899" />
        <rect x="53" y="16" width="3" height="3" rx="0.5" fill="#10B981" transform="rotate(25 53 16)" />
        <rect x="63" y="12" width="3.5" height="3.5" rx="0.5" fill="#F59E0B" transform="rotate(45 63 12)" />
        <rect x="46" y="34" width="3" height="3" rx="0.5" fill="#06B6D4" transform="rotate(15 46 34)" />

        {/* The Party Horn Cone */}
        {/* Main Cone Body with Gradient Fill */}
        <path
          d="M 16 54 L 38 28 L 47 37 L 23 58 Z"
          fill="url(#hornBodyGradient)"
        />

        {/* Horn Stripes */}
        <path
          d="M 22 47 L 27 41 L 33 47 L 28 53 Z"
          fill="#00A3A6"
        />
        <path
          d="M 30 37 L 34 33 L 40 38 L 36 43 Z"
          fill="#8B5CF6"
        />

        {/* Horn Rim / Opening Oval */}
        <ellipse
          cx="42.5"
          cy="32.5"
          rx="6.5"
          ry="3.5"
          transform="rotate(45 42.5 32.5)"
          fill="#FFD166"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />

        {/* Horn Mouthpiece / Tip */}
        <path
          d="M 16 54 L 12 59 C 11 60 9 60 8 59 C 7 58 7 56 8 55 L 13 50 Z"
          fill="#E11D48"
        />

        <defs>
          <linearGradient id="hornBodyGradient" x1="16" y1="54" x2="47" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.5" stopColor="#FFD166" />
            <stop offset="1" stopColor="#FDE047" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

"use client";

import * as React from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  BellRing,
  Check,
  Compass,
  HeartHandshake,
  Mail,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { PartyHornIllustration } from "@/components/ui/party-horn";

export interface StepCongratulationsProps {
  userEmail?: string;
  userPhone?: string;
  memberNumber?: string;
  isVip?: boolean;
  onReset: () => void;
  onUpgradeToVip?: () => void;
}

export function StepCongratulations({
  userEmail = "user@example.com",
  userPhone = "",
  memberNumber = "#1",
  isVip = true,
  onReset,
  onUpgradeToVip,
}: StepCongratulationsProps) {
  // Fire confetti celebration on mount
  React.useEffect(() => {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.2, y: 0.6 },
        colors: ["#00A3A6", "#FF6200", "#38BDF8", "#FBBF24", "#34D399"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.8, y: 0.6 },
        colors: ["#00A3A6", "#FF6200", "#38BDF8", "#FBBF24", "#34D399"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Spark Eyebrow */}
      <Typography.SparkEyebrow className="mb-3 sm:mb-4 animate-fade-in-down delay-50">
        {isVip ? "VIP STATUS ACTIVATED" : "WAITLIST CONFIRMED"}
      </Typography.SparkEyebrow>

      {/* Hero Headline */}
      <Typography.Hero className="mb-3 sm:mb-4 animate-scale-in delay-100">
        {isVip ? (
          <>
            <span className="flex items-center justify-center">
              <span className="text-gradient-animated-teal inline-block text-nowrap">
                You&apos;re Officially a
              </span>
              <span className="text-gradient-animated-orange inline ml-2">VIP</span>
            </span>

            <span className="text-gradient-animated-orange inline-flex items-center gap-2">
              Member!
              <PartyHornIllustration className="w-10 h-10 sm:w-14 sm:h-14 ml-1 inline-block drop-shadow-sm -mt-1 sm:-mt-2 animate-horn" />
            </span>
          </>
        ) : (
          <>
            <span className="flex items-center justify-center">
              <span className="text-gradient-animated-teal inline-block text-nowrap">
                You&apos;re on the
              </span>
              <span className="text-gradient-animated-orange inline ml-2">Waitlist!</span>
            </span>

            <span className="text-gradient-animated-orange inline-flex items-center gap-2">
              Welcome Aboard
              <PartyHornIllustration className="w-10 h-10 sm:w-14 sm:h-14 ml-1 inline-block drop-shadow-sm -mt-1 sm:-mt-2 animate-horn" />
            </span>
          </>
        )}
      </Typography.Hero>

      {/* Subtitle / Lead */}
      <Typography.Lead className="mb-6 sm:mb-8 text-slate-600 max-w-lg animate-fade-in-up delay-150">
        {isVip ? (
          <>
            Congratulations! Your spot is secured at{" "}
            <span className="font-bold text-[#00A3A6]">{memberNumber}</span>. Your
            phone number has been verified and your exclusive VIP privileges are
            active.
          </>
        ) : (
          <>
            Congratulations! Your spot is secured at{" "}
            <span className="font-bold text-[#00A3A6]">{memberNumber}</span>. We&apos;ll
            notify you at{" "}
            <span className="font-semibold text-slate-800">{userEmail}</span> the
            moment FunRaisingIt goes live.
          </>
        )}
      </Typography.Lead>

      {/* Founding Pass Card */}
      <Card className="w-full rounded-3xl border border-slate-200/90 shadow-brand-card p-6 sm:p-7 bg-white animate-fade-in-up delay-200 hover:shadow-xl transition-all duration-300 luminous-card">
        {/* Pass Header Row */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {/* Logo Glyph */}
            <div className="h-10 px-2.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-xs">
              <Image
                src="/logo.png"
                alt="FunRaisingIt"
                width={120}
                height={24}
                className="h-6 w-auto object-contain"
              />
            </div>

            <div>
              <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-[#00A3A6] uppercase">
                <Check className="h-3 w-3 stroke-[3]" />
                <span>{isVip ? "FOUNDING PASS" : "WAITLIST PASS"}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {isVip ? "VIP Founding Member " : "Waitlist Member "}
                <span className="text-[#00A3A6]">{memberNumber}</span>
              </h3>
            </div>
          </div>

          {isVip ? (
            <Badge variant="teal" size="sm" className="px-3 py-1 font-bold animate-pulse-glow-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A3A6] animate-ping mr-0.5" />
              ACTIVE ACCESS
            </Badge>
          ) : (
            <Badge variant="teal" size="sm" className="px-3 py-1 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A3A6] mr-1" />
              CONFIRMED
            </Badge>
          )}
        </div>

        {/* Section Title */}
        <div className="pt-6 pb-3 animate-fade-in-up delay-250">
          <Typography.SectionHeader>
            {isVip ? "UNLOCKED VIP PRIVILEGES" : "WAITLIST PRIVILEGES"}
          </Typography.SectionHeader>
        </div>

        {/* 4 Privileges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {isVip ? (
            <>
              {/* VIP Privilege 1 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-250">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <Zap className="h-4 w-4 fill-[#00A3A6]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Priority Early Access
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Guaranteed priority access when we go live.
                  </p>
                </div>
              </div>

              {/* VIP Privilege 2 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-300">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <Users className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Special Event Invitation
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Special invitation to first annual FunRaisingIt meet and greet networking event.
                  </p>
                </div>
              </div>

              {/* VIP Privilege 3 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-350">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Founding Member Badge
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Permanent VIP badge on your creator profile and campaigns.
                  </p>
                </div>
              </div>

              {/* VIP Privilege 4 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-400">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <BellRing className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Instant SMS Drop Alerts
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Priority notifications directly delivered to your mobile device.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Standard Privilege 1 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-250">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <BellRing className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Launch Day Notification
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Instant email announcement the moment our doors open.
                  </p>
                </div>
              </div>

              {/* Standard Privilege 2 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-300">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <Users className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Creator Community
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Connect with fellow organizers, innovators, and changemakers.
                  </p>
                </div>
              </div>

              {/* Standard Privilege 3 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-350">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <Compass className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Platform Previews
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Receive development updates, roadmap previews, and feature guides.
                  </p>
                </div>
              </div>

              {/* Standard Privilege 4 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-400">
                <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
                  <HeartHandshake className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                    Onboarding Assistance
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Dedicated support when creating your initial fundraising campaigns.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Notification Status Box */}
        {isVip ? (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F0FDFB] border border-[#99F6E4]/70 text-slate-700 animate-fade-in-up delay-450 hover-glow-teal transition-all">
            <div className="h-8 w-8 rounded-full bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0">
              <MessageSquare className="h-4 w-4 stroke-[2.5]" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-snug">
              A welcome SMS with your private access link and VIP credentials has
              been sent to your mobile phone{userPhone ? ` (${userPhone})` : ""}.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F0FDFB] border border-[#99F6E4]/70 text-slate-700 animate-fade-in-up delay-450 hover-glow-teal transition-all">
            <div className="h-8 w-8 rounded-full bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4 stroke-[2.5]" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-snug">
              Confirmation is registered for{" "}
              <span className="font-bold text-slate-900">{userEmail}</span>. Keep an eye on your inbox for our launch announcement!
            </p>
          </div>
        )}

        {/* Upgrade to VIP banner for standard members */}
        {!isVip && onUpgradeToVip && (
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FF6200]/10 via-[#FF6200]/5 to-transparent border border-[#FF6200]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up delay-500">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#FF6200]/15 text-[#EA580C] flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                  Want VIP Privileges?
                </p>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                  Claim your 100% Free VIP Founding Member upgrade anytime before launch!
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="orange"
              size="sm"
              onClick={onUpgradeToVip}
              className="w-full sm:w-auto shrink-0 rounded-full font-bold shadow-xs hover:shadow-orange-glow btn-shine"
            >
              Claim VIP Access
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 stroke-[2.5]" />
            </Button>
          </div>
        )}
      </Card>

      {/* Restart / Test Flow helper */}
      <div className="mt-8 flex items-center justify-center animate-fade-in-up delay-500">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 gap-1.5 hover:scale-105 active:scale-95 transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Test again from beginning
        </Button>
      </div>
    </div>
  );
}

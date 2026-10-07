"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StepComingSoon } from "./step-coming-soon";
import { StepPhoneVip } from "./step-phone-vip";
import { StepCongratulations } from "./step-congratulations";
import { ArrowLeft } from "lucide-react";
import {
  submitWaitlistEmail,
  claimWaitlistVip,
  skipWaitlistVip,
  type WaitlistEntry,
} from "@/lib/waitlist-api";
import { toast } from "sonner";

export function FunnelContainer() {
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1);
  const [displayedStep, setDisplayedStep] = React.useState<1 | 2 | 3>(1);
  const [transitionPhase, setTransitionPhase] = React.useState<
    "idle" | "exiting" | "entering"
  >("idle");
  const [direction, setDirection] = React.useState<"forward" | "backward">("forward");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [memberNumber, setMemberNumber] = React.useState<string>("");
  const [isVip, setIsVip] = React.useState<boolean>(false);
  const [isReturningMember, setIsReturningMember] = React.useState<boolean>(false);
  const [waitlistEntry, setWaitlistEntry] = React.useState<WaitlistEntry | null>(null);
  const [isSkipping, setIsSkipping] = React.useState<boolean>(false);

  // Smooth Step Navigation Orchestrator
  const navigateToStep = (targetStep: 1 | 2 | 3) => {
    if (targetStep === currentStep || transitionPhase !== "idle") return;
    const dir = targetStep > currentStep ? "forward" : "backward";
    setDirection(dir);
    setTransitionPhase("exiting");
    setCurrentStep(targetStep);

    setTimeout(() => {
      setDisplayedStep(targetStep);
      setTransitionPhase("entering");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setTransitionPhase("idle");
      }, 420);
    }, 200);
  };

  // Step 1: Submit Email to Backend
  const handleEmailSubmit = async (submittedEmail: string) => {
    const result = await submitWaitlistEmail(submittedEmail);
    setEmail(result.waitlist.email);
    setWaitlistEntry(result.waitlist);
    setMemberNumber(result.waitlist.formattedMemberNumber);
    setIsVip(result.waitlist.isVip);
    setIsReturningMember(!result.isNew);

    if (result.waitlist.phoneNumber) {
      setPhone(result.waitlist.phoneNumber);
    }

    if (result.waitlist.isVip) {
      toast.info("Welcome Back VIP! 🎉", {
        description:
          result.message ||
          `You're already registered as VIP Member ${result.waitlist.formattedMemberNumber}! Showing your VIP Founding Pass.`,
      });
      navigateToStep(3);
    } else {
      if (!result.isNew) {
        toast.info("Welcome Back! 🎉", {
          description:
            result.message ||
            `You are already on the waitlist as Member ${result.waitlist.formattedMemberNumber}. Claim your VIP upgrade below!`,
        });
      } else {
        toast.success("Email Confirmed! 🎉", {
          description:
            result.message ||
            `Your spot is reserved as Member ${result.waitlist.formattedMemberNumber}. Next step: Claim your 100% Free VIP privileges!`,
        });
      }
      navigateToStep(2);
    }
  };

  // Step 2: Claim VIP with Phone Number
  const handlePhoneSubmit = async (submittedPhone: string) => {
    if (!email) {
      toast.error("Please enter your email first.");
      navigateToStep(1);
      return;
    }

    const result = await claimWaitlistVip(email, submittedPhone);
    setPhone(result.waitlist.phoneNumber || submittedPhone);
    setIsVip(true);
    setWaitlistEntry(result.waitlist);
    if (result.waitlist.formattedMemberNumber) {
      setMemberNumber(result.waitlist.formattedMemberNumber);
    }

    toast.success("VIP Access Granted! 🚀", {
      description:
        result.message ||
        `Congratulations! You've claimed VIP Early Access as Member ${result.waitlist.formattedMemberNumber}.`,
    });
    navigateToStep(3);
  };

  // Step 2: Skip VIP to Standard Access
  const handleSkipPhone = async () => {
    if (!email) {
      navigateToStep(3);
      return;
    }

    setIsSkipping(true);
    try {
      const result = await skipWaitlistVip(email);
      setIsVip(false);
      setWaitlistEntry(result.waitlist);
      if (result.waitlist.formattedMemberNumber) {
        setMemberNumber(result.waitlist.formattedMemberNumber);
      }
      toast.info("Standard Access Confirmed", {
        description:
          result.message ||
          `You're on the waitlist as Member ${result.waitlist.formattedMemberNumber}.`,
      });
      navigateToStep(3);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to record preference.";
      toast.error("Waitlist Update", { description: message });
      // Still proceed to step 3 so user is not blocked
      navigateToStep(3);
    } finally {
      setIsSkipping(false);
    }
  };

  // Step 3 -> Upgrade back to VIP
  const handleUpgradeToVip = () => {
    navigateToStep(2);
  };

  // Reset entire flow
  const handleReset = () => {
    setEmail("");
    setPhone("");
    setMemberNumber("");
    setIsVip(false);
    setIsReturningMember(false);
    setWaitlistEntry(null);
    navigateToStep(1);
  };

  // Calculate container animation class
  const getTransitionClass = () => {
    if (transitionPhase === "exiting") {
      return direction === "forward"
        ? "opacity-0 -translate-x-8 scale-[0.97] blur-[4px] pointer-events-none transition-all duration-200 ease-in"
        : "opacity-0 translate-x-8 scale-[0.97] blur-[4px] pointer-events-none transition-all duration-200 ease-in";
    }
    if (transitionPhase === "entering") {
      return direction === "forward"
        ? "animate-step-enter-forward"
        : "animate-step-enter-backward";
    }
    return "opacity-100 translate-x-0 scale-100 blur-0 transition-all duration-300";
  };

  return (
    <div className="min-h-screen flex flex-col bg-ambient-mesh relative overflow-hidden selection:bg-[#FF6200]/20 selection:text-[#FF6200]">
      {/* Ambient Luminous Background Gradient Orbs */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Left-side cyan/teal glow aura */}
        <div className="absolute top-[8%] -left-[15%] sm:-left-[5%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#00B4D8]/12 blur-[110px] sm:blur-[140px] animate-float" />
        {/* Right-side soft peach/orange glow aura */}
        <div className="absolute top-[18%] -right-[15%] sm:-right-[5%] w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] rounded-full bg-[#FF6400]/09 blur-[120px] sm:blur-[150px] animate-float-alt" />
        {/* Subtle center-bottom teal glow */}
        <div className="absolute bottom-[2%] left-[20%] w-[550px] h-[350px] rounded-full bg-[#00A3A6]/05 blur-[130px] animate-float" />
      </div>

      {/* Dynamic Header */}
      <div className="relative z-10">
        <Header
          isVipUnlocked={displayedStep === 3 && isVip}
          onLogoClick={() => navigateToStep(1)}
        />
      </div>

      {/* Animated Eye-Catchy Progress Tracker Pill */}
      <nav
        aria-label="Funnel progress"
        className="w-full max-w-[340px] sm:max-w-sm mx-auto px-2 sm:px-4 mt-0.5 mb-1 z-10 animate-fade-in-down delay-50"
      >
        <div className="flex items-center justify-between p-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => navigateToStep(1)}
            disabled={displayedStep === 1}
            aria-label="Go to Email step"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 select-none ${
              displayedStep === 1
                ? "bg-[#00A3A6]/10 text-[#00A3A6] shadow-xs cursor-default"
                : displayedStep > 1
                ? "text-[#00A3A6] hover:bg-[#00A3A6]/10 cursor-pointer"
                : "text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-500 ${
                displayedStep === 1
                  ? "bg-[#00A3A6] ring-3 sm:ring-4 ring-[#00A3A6]/20"
                  : displayedStep > 1
                  ? "bg-[#00A3A6]"
                  : "bg-slate-300"
              }`}
            />
            <span>Email</span>
          </button>

          <div
            className={`flex-1 h-0.5 mx-1 rounded-full transition-all duration-500 ${
              displayedStep >= 2
                ? "bg-gradient-to-r from-[#00A3A6] to-[#FF6200]"
                : "bg-slate-200"
            }`}
          />

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => (email || displayedStep > 2) && navigateToStep(2)}
            disabled={displayedStep === 2 || (!email && displayedStep < 2)}
            aria-label="Go to VIP Upgrade step"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 select-none ${
              displayedStep === 2
                ? "bg-[#FF6200]/10 text-[#FF6200] shadow-xs cursor-default"
                : displayedStep > 2 || email
                ? "text-slate-700 hover:text-[#FF6200] hover:bg-[#FF6200]/10 cursor-pointer"
                : "text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-500 ${
                displayedStep === 2
                  ? "bg-[#FF6200] ring-3 sm:ring-4 ring-[#FF6200]/25"
                  : displayedStep > 2
                  ? "bg-[#00A3A6]"
                  : "bg-slate-300"
              }`}
            />
            <span className="hidden sm:inline">VIP Upgrade</span>
            <span className="sm:hidden">VIP</span>
          </button>

          <div
            className={`flex-1 h-0.5 mx-1 rounded-full transition-all duration-500 ${
              displayedStep === 3
                ? "bg-gradient-to-r from-[#FF6200] to-[#00A3A6]"
                : "bg-slate-200"
            }`}
          />

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => displayedStep === 3}
            disabled={displayedStep !== 3}
            aria-label="Go to VIP Access step"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 select-none ${
              displayedStep === 3
                ? "bg-[#00A3A6]/10 text-[#00A3A6] shadow-xs cursor-default"
                : "text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-500 ${
                displayedStep === 3
                  ? "bg-[#00A3A6] ring-3 sm:ring-4 ring-[#00A3A6]/20"
                  : "bg-slate-300"
              }`}
            />
            <span className="hidden sm:inline">{isVip ? "VIP Access" : "Waitlist Access"}</span>
            <span className="sm:hidden">{isVip ? "VIP" : "Access"}</span>
          </button>
        </div>
      </nav>

      {/* Main Multi-Step Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center py-3 sm:py-6 relative z-10 w-full overflow-x-hidden px-2 sm:px-4">
        <div className={`w-full flex flex-col items-center ${getTransitionClass()}`}>
          {displayedStep === 1 && (
            <StepComingSoon
              initialEmail={email}
              onSubmitEmail={handleEmailSubmit}
              onSuggestNextStep={() => {
                if (email) {
                  navigateToStep(2);
                }
              }}
            />
          )}

          {displayedStep === 2 && (
            <div className="w-full flex flex-col items-center">
              {/* Back button option */}
              <div className="w-full max-w-3xl px-4 mb-2 animate-fade-in-down delay-75">
                <button
                  type="button"
                  onClick={() => navigateToStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
                >
                  <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  Change email
                </button>
              </div>
              <StepPhoneVip
                userEmail={email || "your-email@example.com"}
                initialPhone={phone}
                memberNumber={memberNumber || waitlistEntry?.formattedMemberNumber}
                isReturningMember={isReturningMember}
                onSubmitPhone={handlePhoneSubmit}
                onSkipPhone={handleSkipPhone}
                isSkipping={isSkipping}
              />
            </div>
          )}

          {displayedStep === 3 && (
            <StepCongratulations
              userEmail={email || "user@funraisingit.com"}
              userPhone={phone}
              memberNumber={
                memberNumber || waitlistEntry?.formattedMemberNumber || "#1"
              }
              isVip={isVip}
              onReset={handleReset}
              onUpgradeToVip={handleUpgradeToVip}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

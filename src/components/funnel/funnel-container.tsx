"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StepComingSoon } from "./step-coming-soon";
import { StepPhoneVip } from "./step-phone-vip";
import { StepCongratulations } from "./step-congratulations";
import { ArrowLeft } from "lucide-react";

export function FunnelContainer() {
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1);
  const [displayedStep, setDisplayedStep] = React.useState<1 | 2 | 3>(1);
  const [transitionPhase, setTransitionPhase] = React.useState<"idle" | "exiting" | "entering">("idle");
  const [direction, setDirection] = React.useState<"forward" | "backward">("forward");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");

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

  // Handlers
  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    navigateToStep(2);
  };

  const handlePhoneSubmit = (submittedPhone: string) => {
    setPhone(submittedPhone);
    navigateToStep(3);
  };

  const handleSkipPhone = () => {
    navigateToStep(3);
  };

  const handleReset = () => {
    setEmail("");
    setPhone("");
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
      {/* Ambient Luminous Background Gradient Orbs matching the design screenshots */}
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
          isVipUnlocked={displayedStep === 3}
          onLogoClick={() => navigateToStep(1)}
        />
      </div>

      {/* Animated Eye-Catchy Progress Tracker Pill */}
      <nav
        aria-label="Funnel progress"
        className="w-full max-w-xs sm:max-w-sm mx-auto px-4 mt-0.5 mb-1 z-10 animate-fade-in-down delay-50"
      >
        <div className="flex items-center justify-between p-1 rounded-full bg-white/75 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => navigateToStep(1)}
            disabled={displayedStep === 1}
            aria-label="Go to Email step"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 select-none ${
              displayedStep === 1
                ? "bg-[#00A3A6]/10 text-[#00A3A6] shadow-xs cursor-default"
                : displayedStep > 1
                ? "text-[#00A3A6] hover:bg-[#00A3A6]/10 cursor-pointer"
                : "text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                displayedStep === 1
                  ? "bg-[#00A3A6] ring-4 ring-[#00A3A6]/20"
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
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 select-none ${
              displayedStep === 2
                ? "bg-[#FF6200]/10 text-[#FF6200] shadow-xs cursor-default"
                : displayedStep > 2 || email
                ? "text-slate-700 hover:text-[#FF6200] hover:bg-[#FF6200]/10 cursor-pointer"
                : "text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                displayedStep === 2
                  ? "bg-[#FF6200] ring-4 ring-[#FF6200]/25"
                  : displayedStep > 2
                  ? "bg-[#00A3A6]"
                  : "bg-slate-300"
              }`}
            />
            <span>VIP Upgrade</span>
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
            onClick={() => phone && navigateToStep(3)}
            disabled={displayedStep === 3 || !phone}
            aria-label="Go to VIP Access step"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 select-none ${
              displayedStep === 3
                ? "bg-[#00A3A6]/10 text-[#00A3A6] shadow-xs cursor-default"
                : phone
                ? "text-slate-700 hover:text-[#00A3A6] hover:bg-[#00A3A6]/10 cursor-pointer"
                : "text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                displayedStep === 3
                  ? "bg-[#00A3A6] ring-4 ring-[#00A3A6]/20"
                  : "bg-slate-300"
              }`}
            />
            <span>VIP Access</span>
          </button>
        </div>
      </nav>

      {/* Main Multi-Step Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 sm:py-6 relative z-10 w-full overflow-x-hidden">
        <div className={`w-full flex flex-col items-center ${getTransitionClass()}`}>
          {displayedStep === 1 && (
            <StepComingSoon
              initialEmail={email}
              onSubmitEmail={handleEmailSubmit}
              onSuggestNextStep={() => navigateToStep(2)}
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
                userEmail={email || "alex@creatorlaunch.com"}
                initialPhone={phone}
                onSubmitPhone={handlePhoneSubmit}
                onSkipPhone={handleSkipPhone}
              />
            </div>
          )}

          {displayedStep === 3 && (
            <StepCongratulations
              userEmail={email || "alex@creatorlaunch.com"}
              userPhone={phone || "(555) 019-2834"}
              onReset={handleReset}
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

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  ArrowRight,
  Award,
  Check,
  Lock,
  PhoneCall,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const phoneFormSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length === 10;
      },
      {
        message:
          "Please enter a valid 10-digit US phone number (e.g. (202) 555-0143).",
      },
    )
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\D/g, "");
        if (digitsOnly.length !== 10) return true;
        const areaFirst = digitsOnly[0];
        const exchangeFirst = digitsOnly[3];
        return (
          areaFirst >= "2" &&
          areaFirst <= "9" &&
          exchangeFirst >= "2" &&
          exchangeFirst <= "9"
        );
      },
      {
        message:
          "Please enter a valid US phone number with area code (e.g. (202) 555-0143).",
      },
    ),
});

export type PhoneFormData = z.infer<typeof phoneFormSchema>;

export interface StepPhoneVipProps {
  userEmail?: string;
  initialPhone?: string;
  memberNumber?: string;
  isReturningMember?: boolean;
  onSubmitPhone: (phone: string) => Promise<void> | void;
  onSkipPhone: () => Promise<void> | void;
  isSkipping?: boolean;
}

// Utility to format raw digits as (XXX) XXX-XXXX
function formatPhoneNumber(value: string) {
  if (!value) return value;
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function StepPhoneVip({
  userEmail = "user@example.com",
  initialPhone = "",
  memberNumber = "",
  isReturningMember = false,
  onSubmitPhone,
  onSkipPhone,
  isSkipping = false,
}: StepPhoneVipProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSkippingLocal, setIsSkippingLocal] = React.useState(false);

  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: initialPhone ? formatPhoneNumber(initialPhone) : "",
    },
  });

  const skipping = isSkipping || isSkippingLocal;

  const handleSubmit = async (data: PhoneFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmitPhone(data.phone);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to claim VIP priority access. Please check your phone number and try again.";
      form.setError("phone", { type: "manual", message });
      toast.error("Priority List Notice", {
        description: message,
      });
      document.getElementById("phone-input")?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setIsSkippingLocal(true);
    try {
      await onSkipPhone();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to confirm standard waitlist access.";
      toast.error("Waitlist Update", {
        description: message,
      });
    } finally {
      setIsSkippingLocal(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Spark Eyebrow */}
      <Typography.SparkEyebrow className="mb-2.5 sm:mb-4 animate-fade-in-down delay-50">
        STEP 2 OF 2 • VIP PRIORITY LIST
      </Typography.SparkEyebrow>

      {/* Hero Headline */}
      <Typography.Hero className="mb-2.5 sm:mb-4 animate-scale-in delay-100 text-center">
        <span className="text-gradient-animated-teal block tracking-[-0.03em] drop-shadow-xs">
          You&apos;re On The Waitlist!
        </span>
        <span className="text-gradient-animated-orange block tracking-[-0.03em] mt-0.5 sm:mt-[-4px] drop-shadow-xs">
          Join The VIP Priority List
        </span>
      </Typography.Hero>

      {/* Subtitle / Lead */}
      <Typography.Lead className="mb-5 sm:mb-7 max-w-xl text-center text-slate-600 animate-fade-in-up delay-150 px-1 sm:px-0 text-xs sm:text-base">
        Your spot is reserved on FunRaising
        <span className="text-[#00A3A6] font-semibold">It</span>. Enter your phone number below to join our VIP Priority List and move to the front of the line for 💯 Free!
      </Typography.Lead>

      {/* Top Confirmation Card */}
      <div className="w-full mb-4 sm:mb-6 rounded-2xl bg-white border border-slate-200/90 shadow-brand-card p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 transition-all duration-300 hover:border-[#00A3A6]/40 hover:-translate-y-0.5 hover:shadow-lg animate-fade-in-up delay-200">
        <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#00A3A6]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#00A3A6]">
          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-[#00A3A6] text-white flex items-center justify-center animate-pop-in delay-250">
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 flex-wrap">
            <Badge variant="teal" size="sm" className="font-semibold text-[11px] sm:text-xs">
              {isReturningMember ? "Returning Member" : "Email Confirmed"}
            </Badge>
            {memberNumber && (
              <Badge variant="orange" size="sm" className="font-semibold text-[11px] sm:text-xs">
                Member {memberNumber}
              </Badge>
            )}
            {userEmail && (
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium max-w-[160px] xs:max-w-xs truncate">
                ({userEmail})
              </span>
            )}
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight leading-snug">
            {isReturningMember
              ? "Welcome back! Enter your phone number below to claim your Free VIP upgrade."
              : "Waitlist Spot Reserved! Enter your phone number below to join the Priority List."}
          </h2>
        </div>
      </div>

      {/* Bottom VIP Upgrade & Phone Form Card */}
      <Card className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-brand-card p-4 sm:p-7 md:p-8 bg-white animate-fade-in-up delay-250 transition-all duration-300 hover:shadow-xl luminous-card">
        {/* Card Header area */}
        <div className="flex flex-col mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-2.5 mb-2 flex-wrap animate-pop-in delay-300">
            <div className="animate-free-badge">
              <span className="text-2xl sm:text-4xl font-black tracking-tight text-gradient-animated-orange drop-shadow-xs">
                100% FREE
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-[#FF6200]/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#FF6200]/25 shimmer-badge inline-flex items-center gap-1 sm:gap-1.5 shadow-xs">
              <Sparkles className="h-3 w-3 text-[#FF6200] animate-pulse" />
              Exclusive Upgrade
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900">
              Why Join The VIP Priority List?
            </h2>
            <Badge variant="orange" size="default" className="w-fit animate-pulse-glow-orange text-xs py-0.5 sm:py-1">
              Limited VIP Spots
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
            Priority members bypass standard wait queues, receive early platform invitations before public launch, and get our top-tier campaign acceleration perks.
          </p>
        </div>

        {/* 4 Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 my-4 sm:my-6">
          {/* Perk 1 */}
          <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-300">
            <div className="h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 font-bold group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Zap className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                Priority Early Access
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">First in line when we launch</p>
            </div>
          </div>

          {/* Perk 2 */}
          <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FFF9F5] border border-[#FFE4D6]/80 hover-glow-orange hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-350">
            <div className="h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-[#FFE8DC] text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Award className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors">
                VIP Founder Badge
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                Permanent badge on your profile
              </p>
            </div>
          </div>

          {/* Perk 3 */}
          <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-400">
            <div className="h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Users className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                Special Invitation
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                Exclusive invitation to our annual meet & greet event
              </p>
            </div>
          </div>

          {/* Perk 4 */}
          <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover-glow-orange hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-450">
            <div className="h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-slate-200/70 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Smartphone className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#FF6200] transition-colors">
                Priority Beta Access
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                Day 1 builds on iOS & Android
              </p>
            </div>
          </div>
        </div>

        {/* PROMINENT CALL TO ACTION: Enter Phone Number Below */}
        <div className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FFF7ED] via-[#FFF3E8] to-[#FFF7ED] border-2 border-[#FFD8B2] p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 text-center shadow-xs animate-fade-in-up delay-450">
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[#EA580C] font-extrabold text-sm sm:text-base md:text-lg mb-1">
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-[#FF6200] text-white flex items-center justify-center shrink-0 shadow-xs">
              <PhoneCall className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            Enter Your Phone Number Below
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-700 max-w-lg mx-auto font-medium leading-relaxed">
            Enter your mobile number below to join the <span className="text-slate-900 font-bold">VIP Priority List</span>. We&apos;ll text you instant confirmation and notify you the moment early access opens.
          </p>
        </div>

        {/* Clean, Non-Jumbled Phone Form */}
        <form
          id="phone-step-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
          className="w-full animate-fade-in-up delay-500"
        >
          <FieldGroup>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  {/* Unified Pill Phone Input Group */}
                  <InputGroup
                    variant="pill"
                    data-invalid={fieldState.invalid}
                    className="h-12 sm:h-14 pl-1 sm:pl-2 pr-1 sm:pr-1.5 bg-white border border-slate-200/90 shadow-brand-pill hover:border-slate-300 focus-within:border-[#FF6200] focus-within:ring-3 sm:focus-within:ring-4 focus-within:ring-[#FF6200]/15 transition-all duration-300"
                  >
                    {/* Country Code Prefix */}
                    <InputGroupAddon
                      align="inline-start"
                      className="pl-2 sm:pl-3.5 pr-1 sm:pr-2 gap-1.5 text-slate-700 shrink-0 select-none"
                    >
                      <span className="text-base sm:text-lg leading-none" role="img" aria-label="United States">
                        🇺🇸
                      </span>
                      <span className="font-bold text-slate-800 text-xs sm:text-sm tracking-tight">
                        +1
                      </span>
                      <span className="h-4 w-[1px] bg-slate-200 ml-1 shrink-0" aria-hidden="true" />
                    </InputGroupAddon>

                    {/* Phone Number Input */}
                    <Input
                      {...field}
                      id="phone-input"
                      type="tel"
                      variant="ghost"
                      placeholder="(202) 555-0143"
                      aria-label="Phone number"
                      aria-invalid={fieldState.invalid}
                      autoComplete="tel"
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                      className="h-full text-sm sm:text-base font-semibold placeholder:font-normal placeholder:text-slate-400 text-slate-900 px-1 sm:px-2 min-w-0"
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="orange"
                      size="pill"
                      isLoading={isSubmitting}
                      disabled={isSubmitting || skipping}
                      className="h-10 sm:h-11 px-3.5 sm:px-6 shrink-0 text-xs sm:text-sm font-bold shadow-md hover:shadow-orange-glow hover:scale-[1.02] active:scale-[0.98] btn-shine transition-all"
                    >
                      <span className="hidden sm:inline">Join Priority List</span>
                      <span className="sm:hidden">Join Priority</span>
                      <ArrowRight className="ml-1 sm:ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                    </Button>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="mt-2 text-center text-red-600 font-semibold text-xs sm:text-sm"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        {/* Form Footnote: SMS terms and Skip Link */}
        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-slate-500 animate-fade-in-up delay-550 border-t border-slate-100 pt-3.5 sm:pt-4">
          <p className="text-center sm:text-left flex items-center justify-center gap-1.5 text-slate-500">
            <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400 shrink-0" />
            <span>We respect your privacy. No spam. Msg & data rates may apply.</span>
          </p>
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting || skipping}
            className="text-slate-600 hover:text-slate-900 font-semibold inline-flex items-center gap-1 hover:underline transition-colors shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group py-1 sm:py-0"
          >
            {skipping ? "Confirming standard access..." : "No thanks, keep standard access"}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </Card>
    </div>
  );
}

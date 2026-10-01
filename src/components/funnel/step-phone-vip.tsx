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
  Phone,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { Typography } from "@/components/ui/typography";

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
          : "Failed to claim VIP access. Please check your phone number and try again.";
      form.setError("phone", { type: "manual", message });
      toast.error("VIP Upgrade Notice", {
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
    <div className="w-full flex flex-col items-center max-w-3xl mx-auto px-4 py-6 sm:py-10">
      {/* Spark Eyebrow */}
      <Typography.SparkEyebrow className="mb-3 sm:mb-4 animate-fade-in-down delay-50">
        YOU&apos;RE ON THE VIP WAITLIST!
      </Typography.SparkEyebrow>

      {/* Hero Headline */}
      <Typography.Hero className="mb-3 sm:mb-4 animate-scale-in delay-100">
        <span className="text-gradient-animated-teal block tracking-[-0.03em] drop-shadow-xs">
          Email Submission
        </span>
        <span className="text-gradient-animated-orange block tracking-[-0.03em] mt-[-6px] sm:mt-[-10px] drop-shadow-xs">
          Success
        </span>
      </Typography.Hero>

      {/* Subtitle / Lead */}
      <Typography.Lead className="mb-6 sm:mb-8 max-w-xl text-slate-600 animate-fade-in-up delay-150">
        Welcome to FunRaising
        <span className="text-[#00A3A6] font-semibold">It</span>. Your spot has
        been secured. Want to become a VIP member for 💯 Free instead?
      </Typography.Lead>

      {/* Top Confirmation Card */}
      <div className="w-full mb-6 rounded-2xl bg-white border border-slate-200/90 shadow-brand-card p-5 sm:p-6 flex items-start gap-4 transition-all duration-300 hover:border-[#00A3A6]/40 hover:-translate-y-0.5 hover:shadow-lg animate-fade-in-up delay-200">
        <div className="h-11 w-11 rounded-full bg-[#00A3A6]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#00A3A6]">
          <div className="h-7 w-7 rounded-full bg-[#00A3A6] text-white flex items-center justify-center animate-pop-in delay-250">
            <Check className="h-4 w-4 stroke-[3]" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Badge variant="teal" size="sm" className="font-semibold text-xs">
              {isReturningMember ? "Returning Member" : "Verified Submission"}
            </Badge>
            {memberNumber && (
              <Badge variant="orange" size="sm" className="font-semibold text-xs">
                Member {memberNumber}
              </Badge>
            )}
            {userEmail && (
              <span className="text-xs text-slate-400 font-medium">
                ({userEmail})
              </span>
            )}
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {isReturningMember
              ? "Welcome back! Claim your 100% Free VIP Upgrade below."
              : "Email Confirmed! You're on the early access list."}
          </h2>
        </div>
      </div>

      {/* Bottom VIP Upgrade & Phone Form Card */}
      <Card className="w-full rounded-3xl border border-slate-200/90 shadow-brand-card p-6 sm:p-8 bg-white animate-fade-in-up delay-250 transition-all duration-300 hover:shadow-xl luminous-card">
        {/* Card Header area */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-2.5 mb-2 flex-wrap animate-pop-in delay-300">
            <div className="animate-free-badge">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-gradient-animated-orange drop-shadow-xs">
                100% FREE
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-[#FF6200]/10 px-3 py-1 rounded-full border border-[#FF6200]/25 shimmer-badge inline-flex items-center gap-1.5 shadow-xs">
              <Sparkles className="h-3 w-3 text-[#FF6200] animate-pulse" />
              Exclusive Upgrade
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Want to become a VIP Member?
            </h2>
            <Badge variant="orange" size="default" className="w-fit animate-pulse-glow-orange">
              Limited Spots Available
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Fast-track your access, unlock priority early access when we go
            live, and get our top-tier campaign acceleration package before
            public launch.
          </p>
        </div>

        {/* 4 Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
          {/* Perk 1 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-300">
            <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 font-bold group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Zap className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                Priority Early Access
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">When we go live</p>
            </div>
          </div>

          {/* Perk 2 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFF9F5] border border-[#FFE4D6]/80 hover-glow-orange hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-350">
            <div className="h-9 w-9 rounded-xl bg-[#FFE8DC] text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Award className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors">
                VIP Founder Badge
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Permanent badge on your profile
              </p>
            </div>
          </div>

          {/* Perk 3 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F0FDFB] border border-[#CCFBF1]/80 hover-glow-teal hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-400">
            <div className="h-9 w-9 rounded-xl bg-[#CCFBF1] text-[#00A3A6] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Users className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00A3A6] transition-colors">
                Special Invitation
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Special invitation to our first annual Funraisingit meet and
                greet networking event.
              </p>
            </div>
          </div>

          {/* Perk 4 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover-glow-orange hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up delay-450">
            <div className="h-9 w-9 rounded-xl bg-slate-200/70 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 group-hover:rotate-6 transition-transform">
              <Smartphone className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#FF6200] transition-colors">
                Priority Beta Access
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Day 1 build on iOS & Android
              </p>
            </div>
          </div>
        </div>

        {/* Phone Input Form */}
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
                  <InputGroup
                    variant="pill"
                    data-invalid={fieldState.invalid}
                    className="h-14 pl-3 sm:pl-4 pr-1.5 bg-white border border-slate-200/90 shadow-brand-pill hover:border-slate-300 focus-within:border-[#FF6200] focus-within:ring-4 focus-within:ring-[#FF6200]/15 transition-all duration-300"
                  >
                    <InputGroupAddon
                      align="inline-start"
                      className="pl-1 sm:pl-2 pr-2 gap-2 text-slate-600 w-50"
                    >
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      <InputGroupText className="font-semibold text-slate-700 text-xs sm:text-sm">
                        +1 (US)
                      </InputGroupText>
                      <span className="text-slate-300 select-none">|</span>
                    </InputGroupAddon>

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
                      className="h-full text-base sm:text-sm placeholder:text-slate-400 text-slate-900 px-1 font-mono tracking-tight"
                    />

                    <Button
                      type="submit"
                      variant="orange"
                      size="pill"
                      isLoading={isSubmitting}
                      disabled={isSubmitting || skipping}
                      className="h-11 px-5 sm:px-6 shrink-0 text-sm font-bold shadow-md hover:shadow-orange-glow hover:scale-[1.02] active:scale-[0.98] btn-shine transition-all"
                    >
                      Claim VIP Access
                      <ArrowRight className="ml-1.5 h-4 w-4 stroke-[2.5]" />
                    </Button>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="mt-2 text-center"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        {/* Form Footnote: SMS terms and Skip Link */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 animate-fade-in-up delay-550">
          <p className="text-center sm:text-left">
            We&apos;ll text you VIP perks & priority invite. Msg & data rates
            may apply.
          </p>
          <button
            type="button"
            onClick={handleSkip}
            disabled={isSubmitting || skipping}
            className="text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1 hover:underline transition-colors shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {skipping ? "Confirming standard access..." : "No thanks, keep standard access"}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </Card>
    </div>
  );
}

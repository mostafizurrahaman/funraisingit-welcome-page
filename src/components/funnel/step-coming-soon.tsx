"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Typography } from "@/components/ui/typography";

const emailFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address."),
});

export type EmailFormData = z.infer<typeof emailFormSchema>;

export interface StepComingSoonProps {
  initialEmail?: string;
  onSubmitEmail: (email: string) => Promise<void> | void;
  onSuggestNextStep?: () => void;
  isLoading?: boolean;
}

export function StepComingSoon({
  initialEmail = "",
  onSubmitEmail,
  onSuggestNextStep,
  isLoading = false,
}: StepComingSoonProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: initialEmail,
    },
  });

  const submitting = isSubmitting || isLoading;

  const handleSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmitEmail(data.email);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to join waitlist. Please check your connection and try again.";
      form.setError("email", { type: "manual", message });
      toast.error("Waitlist Registration", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestClick = () => {
    const currentEmail = form.getValues("email");
    if (currentEmail && currentEmail.trim().length > 0) {
      form.handleSubmit(handleSubmit)();
    } else {
      const inputEl = document.getElementById("email-input");
      inputEl?.focus();
      toast.info("Check Registration", {
        description:
          "Please enter your email above to check your waitlist status or claim VIP perks.",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-center max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-10 relative z-10">
      {/* Spark Eyebrow */}
      <Typography.SparkEyebrow className="mb-3 sm:mb-5 animate-fade-in-down delay-50">
        SOMETHING BIG IS IN THE WORKS
      </Typography.SparkEyebrow>

      {/* Hero Headline with refined vertical brand gradients */}
      <Typography.Hero className="mb-3 sm:mb-5 animate-scale-in delay-100">
        <span className="text-gradient-teal block tracking-[-0.03em] drop-shadow-xs text-[54px] xs:text-[68px] sm:text-[90px] md:text-[110px] lg:text-[120px] leading-[0.88] sm:leading-[0.92]">
          COMING
        </span>
        <span className="text-gradient-orange block tracking-[-0.03em] drop-shadow-xs text-[54px] xs:text-[68px] sm:text-[90px] md:text-[110px] lg:text-[120px] leading-[0.88] sm:leading-[0.92]">
          SOON
        </span>
      </Typography.Hero>

      {/* Subtitle / Lead */}
      <Typography.Lead className="mb-6 sm:mb-8 text-slate-600 max-w-lg font-normal leading-relaxed animate-fade-in-up delay-150 px-2 sm:px-0 text-sm sm:text-base md:text-lg">
        FunRaising<span className="text-[#00A3A6] font-semibold">It</span> is
        getting ready. Be the first to know when we launch and secure exclusive
        early access perks.
      </Typography.Lead>

      {/* Email Submission Form */}
      <div className="w-full max-w-lg mx-auto animate-fade-in-up delay-200">
        <form
          id="email-step-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
          className="w-full"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="items-center"
                >
                  <InputGroup
                    variant="pill"
                    data-invalid={fieldState.invalid}
                    className="h-12 sm:h-14 pl-1 sm:pl-2 pr-1 sm:pr-1.5 bg-white border border-slate-200/90 shadow-brand-pill hover:border-slate-300 focus-within:border-[#FF6200] focus-within:ring-3 sm:focus-within:ring-4 focus-within:ring-[#FF6200]/15 transition-all duration-300"
                  >
                    <InputGroupAddon
                      align="inline-start"
                      className="pl-2 sm:pl-3 text-slate-400 shrink-0"
                    >
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    </InputGroupAddon>

                    <Input
                      {...field}
                      id="email-input"
                      type="email"
                      variant="ghost"
                      placeholder="Enter your email..."
                      aria-label="Email address"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      className="h-full text-sm sm:text-base placeholder:text-slate-400 text-slate-900 px-1.5 sm:px-2 font-medium min-w-0"
                    />

                    <Button
                      type="submit"
                      variant="orange"
                      size="pill"
                      isLoading={submitting}
                      className="h-10 sm:h-11 px-3.5 sm:px-6 shrink-0 text-xs sm:text-sm font-bold shadow-md hover:shadow-orange-glow hover:scale-[1.02] active:scale-[0.98] btn-shine transition-all"
                    >
                      <span>Notify Me</span>
                      <ArrowRight className="ml-1 sm:ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                    </Button>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-center w-full mt-2 text-xs sm:text-sm"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        {/* Security & Spam guarantee */}
        <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 select-none animate-fade-in-up delay-250 px-2 text-center">
          <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#00A3A6] shrink-0" />
          <span>We&apos;ll email you the moment we launch. No spam, ever.</span>
        </div>

        {/* Suggestion to go to next step (Step 2) */}
        {onSuggestNextStep && (
          <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-200/50 flex flex-col items-center justify-center gap-1.5 animate-fade-in-up delay-300">
            <button
              type="button"
              onClick={handleSuggestClick}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#FF6200] border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all group cursor-pointer max-w-full text-center"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#FF6200] shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">
                Already registered? Suggestion: Claim VIP Perks & Phone Verification
              </span>
              <span className="sm:hidden">
                Already registered? Claim VIP Perks
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0 group-hover:text-[#FF6200] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

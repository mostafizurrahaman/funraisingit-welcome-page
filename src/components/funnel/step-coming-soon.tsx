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
    <div className="w-full flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      {/* Spark Eyebrow */}
      <Typography.SparkEyebrow className="mb-4 sm:mb-6 animate-fade-in-down delay-50">
        SOMETHING BIG IS IN THE WORKS
      </Typography.SparkEyebrow>

      {/* Hero Headline with refined vertical brand gradients */}
      <Typography.Hero className="mb-4 sm:mb-6 animate-scale-in delay-100">
        <span className="text-gradient-teal block tracking-[-0.03em] drop-shadow-xs md:text-[120px] text-[80px]">
          COMING
        </span>
        <span className="text-gradient-orange block tracking-[-0.03em] drop-shadow-xs md:text-[120px] text-[80px]">
          SOON
        </span>
      </Typography.Hero>

      {/* Subtitle / Lead */}
      <Typography.Lead className="mb-8 sm:mb-10 text-slate-600 max-w-lg font-normal leading-relaxed animate-fade-in-up delay-150">
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
                    className="h-14 pl-2 pr-1.5 bg-white border border-slate-200/90 shadow-brand-pill hover:border-slate-300 focus-within:border-[#FF6200] focus-within:ring-4 focus-within:ring-[#FF6200]/15 transition-all duration-300"
                  >
                    <InputGroupAddon
                      align="inline-start"
                      className="pl-3 text-slate-400"
                    >
                      <Mail className="h-5 w-5 text-slate-400" />
                    </InputGroupAddon>

                    <Input
                      {...field}
                      id="email-input"
                      type="email"
                      variant="ghost"
                      placeholder="Enter your email address..."
                      aria-label="Email address"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      className="h-full text-base sm:text-sm placeholder:text-slate-400 text-slate-900 px-2 font-medium"
                    />

                    <Button
                      type="submit"
                      variant="orange"
                      size="pill"
                      isLoading={submitting}
                      className="h-11 px-5 sm:px-6 shrink-0 text-sm font-bold shadow-md hover:shadow-orange-glow hover:scale-[1.02] active:scale-[0.98] btn-shine transition-all"
                    >
                      Notify Me
                      <ArrowRight className="ml-1.5 h-4 w-4 stroke-[2.5]" />
                    </Button>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-center w-full mt-2"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        {/* Security & Spam guarantee */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 select-none animate-fade-in-up delay-250">
          <Lock className="h-3.5 w-3.5 text-[#00A3A6]" />
          <span>We&apos;ll email you the moment we launch. No spam, ever.</span>
        </div>

        {/* Suggestion to go to next step (Step 2) */}
        {onSuggestNextStep && (
          <div className="mt-8 pt-4 border-t border-slate-200/50 flex flex-col items-center justify-center gap-1.5 animate-fade-in-up delay-300">
            <button
              type="button"
              onClick={handleSuggestClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#FF6200] border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all group cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#FF6200] group-hover:rotate-12 transition-transform" />
              <span>
                Already registered? Suggestion: Claim VIP Perks & Phone
                Verification
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#FF6200] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

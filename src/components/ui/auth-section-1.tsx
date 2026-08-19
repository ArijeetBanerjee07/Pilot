"use client";

import React, { useState } from "react";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";

// Dynamically import GrainGradient with SSR disabled for Next.js App Router compatibility
const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.GrainGradient),
  { ssr: false }
);

interface AuthSectionOneProps {
  mode?: "signin" | "signup";
  onModeChange?: (mode: "signin" | "signup") => void;
  onSuccess?: () => void;
}

export default function AuthSectionOne({
  mode = "signup",
  onModeChange,
  onSuccess,
}: AuthSectionOneProps) {
  const [currentMode, setCurrentMode] = useState<"signin" | "signup">(mode);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noNewsletter, setNoNewsletter] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const activeMode = onModeChange ? mode : currentMode;
  const setMode = (newMode: "signin" | "signup") => {
    if (onModeChange) {
      onModeChange(newMode);
    } else {
      setCurrentMode(newMode);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        activeMode === "signin" ? "Logged in successfully!" : "Account created successfully!"
      );
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 700);
    }, 900);
  };

  const termsText = (
    <>
      By creating an account, you agree to our{" "}
      <a
        href="#"
        className="font-medium text-[#6D28D9] underline underline-offset-2 hover:text-[#5B21B6]"
      >
        Terms and Services
      </a>{" "}
      and{" "}
      <a
        href="#"
        className="font-medium text-[#6D28D9] underline underline-offset-2 hover:text-[#5B21B6]"
      >
        Privacy Policy
      </a>
    </>
  );

  return (
    <section className="w-full flex items-center justify-center p-3 sm:p-5 lg:p-6 antialiased [font-synthesis:none] select-none">
      {/* Spacious White/Light Rectangular Card Container */}
      <div className="w-full max-w-5xl h-[86vh] min-h-[580px] max-h-[700px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-slate-200/90 overflow-hidden grid lg:grid-cols-[0.98fr_1.02fr]">
        
        {/* Left: Clean White Form Side */}
        <div className="flex flex-col justify-center bg-white px-6 py-6 sm:px-10 lg:px-12 xl:px-14 overflow-y-auto lg:overflow-hidden">
          <div className="mx-auto w-full max-w-[420px]">
            
            {/* Category Tag */}
            <div className="mb-2">
              <span className="text-xs font-bold tracking-widest text-[#6D28D9] uppercase">
                {activeMode === "signin" ? "WELCOME BACK" : "JOIN US"}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-slate-900 leading-tight">
                    {activeMode === "signin" ? (
                      <>
                        Sign in to <span className="text-[#6D28D9]">Pilot</span>
                      </>
                    ) : (
                      <>
                        Create an <span className="text-[#6D28D9]">account</span>
                      </>
                    )}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-snug">
                    {activeMode === "signin"
                      ? "Continue your AI journey with Solace & Pilot"
                      : "Brainstorm in chat, build in cowork"}
                  </p>
                </div>

                {/* Google Social Login Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full flex h-10 items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/90 hover:bg-slate-100/90 px-4 text-xs sm:text-sm font-semibold text-slate-700 transition-all cursor-pointer shadow-xs hover:border-slate-300"
                  >
                    <GoogleIcon />
                    <span>Continue with Google</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-3.5">
                  <div className="w-full border-t border-slate-200" />
                  <span className="absolute bg-white px-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    or
                  </span>
                </div>

                {/* Interactive Form */}
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  {activeMode === "signup" && (
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      <FieldBox
                        label="First Name"
                        placeholder="First Name"
                        value={firstName}
                        onChange={setFirstName}
                      />
                      <FieldBox
                        label="Last Name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={setLastName}
                      />
                    </div>
                  )}

                  <FieldBox
                    label="Email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={setEmail}
                  />
                  <FieldBox
                    label="Password"
                    placeholder="••••••••••••"
                    type="password"
                    value={password}
                    onChange={setPassword}
                  />

                  {activeMode === "signup" && (
                    <div className="space-y-1.5 pt-1 text-[11px] leading-tight text-slate-500">
                      <CheckboxLine
                        checked={noNewsletter}
                        onChange={(e) => setNoNewsletter(e.target.checked)}
                      >
                        I don't want to receive feature updates emails
                      </CheckboxLine>
                      <CheckboxLine
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      >
                        {termsText}
                      </CheckboxLine>
                    </div>
                  )}

                  {activeMode === "signin" && (
                    <div className="flex justify-end">
                      <a href="#" className="text-[11px] font-semibold text-[#6D28D9] hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex h-10 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#581C87] text-xs sm:text-sm font-semibold text-white shadow-md shadow-purple-600/25 transition-all hover:from-[#5B21B6] hover:to-[#4C1D95] active:scale-[0.99] cursor-pointer disabled:opacity-75"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : successMessage ? (
                      successMessage
                    ) : activeMode === "signin" ? (
                      "Sign In"
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>

                {/* Bottom Toggle Link */}
                <div className="text-center pt-3 text-xs text-slate-600">
                  {activeMode === "signin" ? (
                    <span>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="text-[#6D28D9] font-bold hover:underline cursor-pointer ml-1"
                      >
                        Sign up
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signin")}
                        className="text-[#6D28D9] font-bold hover:underline cursor-pointer ml-1"
                      >
                        Sign in
                      </button>
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Purple Grain Shader Banner Side (Badge & Windows app download removed as requested) */}
        <div className="relative hidden lg:flex overflow-hidden rounded-r-3xl bg-[#090414] p-8 text-white sm:p-10 lg:p-14">
          {/* Grain Gradient Shader - Purple Palette */}
          <div className="absolute inset-0">
            <GrainGradient
              speed={0.8}
              scale={1}
              rotation={0}
              offsetX={0}
              offsetY={0}
              softness={0.55}
              intensity={0.65}
              noise={0.25}
              shape="corners"
              frame={2854.5}
              colors={["#FFFFFF", "#8B5CF6", "#6D28D9", "#4C1D95"]}
              colorBack="#090414"
              className="w-full h-full"
            />
          </div>

          <div className="relative z-10 flex h-full w-full flex-col justify-center">
            <div>
              <h2 className="max-w-[480px] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                Think fast,
                <br />
                <span className="text-[#DDD6FE]">Build faster</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-purple-100/85 max-w-sm leading-relaxed">
                Connect your cloud, streamline your agents, and ship software at lightspeed.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function FieldBox({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange?: (val: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-0.5">
      <label className="block text-[11px] font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder || label}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6D28D9] focus:bg-white transition shadow-2xs"
        />
      </div>
    </div>
  );
}

function CheckboxLine({
  children,
  checked,
  onChange,
}: {
  children: ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-[#6D28D9] focus:ring-purple-500 cursor-pointer"
      />
      <span className="leading-tight">{children}</span>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
        fill="#EB4335"
      />
    </svg>
  );
}

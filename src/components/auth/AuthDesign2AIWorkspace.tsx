'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Check, Bot, Brain } from 'lucide-react';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
  onSuccess?: () => void;
}

export default function AuthDesign2AIWorkspace({ mode, onModeChange, onSuccess }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(mode === 'signin' ? 'Signed in successfully!' : 'Account registered!');
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 800);
    }, 1000);
  };

  return (
    <div className="w-full flex items-center justify-center p-3 sm:p-4 font-sans select-none">
      {/* Sleek Glassmorphic Form Card */}
      <div className="w-full max-w-[430px] bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_25px_80px_-15px_rgba(20,5,50,0.35)] border border-white/70 p-7 sm:p-9 relative overflow-hidden transition-all duration-300">
        
        {/* Top Header Badge Icon */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/15 via-indigo-500/10 to-purple-600/20 border border-purple-300/40 text-purple-700 flex items-center justify-center shadow-md shadow-purple-500/10">
            {mode === 'signin' ? (
              <Brain className="w-6 h-6 text-[#6D28D9]" />
            ) : (
              <Bot className="w-6 h-6 text-[#6D28D9]" />
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3.5"
          >
            {/* Header Text */}
            <div className="space-y-1 text-center">
              <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
                {mode === 'signin' ? (
                  <>
                    Welcome <span className="text-[#6D28D9]">Back!</span>
                  </>
                ) : (
                  <>
                    Create <span className="text-[#6D28D9]">Account</span>
                  </>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {mode === 'signin'
                  ? 'Please enter your details to log in to your account'
                  : 'Join us and start your AI journey today!'}
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              {mode === 'signup' && (
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-semibold text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50/90 border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6D28D9] focus:bg-white transition shadow-2xs"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="block text-xs font-semibold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/90 border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6D28D9] focus:bg-white transition shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/90 border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6D28D9] focus:bg-white transition shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signin' && (
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#6D28D9] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50/90 border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6D28D9] focus:bg-white transition shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div className="flex items-start gap-2 pt-0.5 text-left">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-[#6D28D9] focus:ring-purple-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight">
                    I agree to the{' '}
                    <a href="#" className="text-[#6D28D9] font-medium hover:underline">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-[#6D28D9] font-medium hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}

              {/* Gradient Purple Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 mt-1 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#581C87] hover:from-[#5B21B6] hover:to-[#4C1D95] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : successMessage ? (
                  <span className="flex items-center gap-1.5 text-white">
                    <Check className="w-4 h-4" /> {successMessage}
                  </span>
                ) : (
                  <span>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</span>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center !my-2">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white/95 px-2.5 text-[10px] text-slate-400 font-normal">
                  or continue with
                </span>
              </div>

              {/* Google SSO Button */}
              <button
                type="button"
                onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                className="w-full py-2.5 px-3 bg-white/95 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Bottom Switch Link */}
            <div className="text-center pt-2.5 text-xs text-slate-600 border-t border-slate-100/80 mt-2">
              {mode === 'signin' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onModeChange('signup')}
                    className="text-[#6D28D9] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Sign Up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onModeChange('signin')}
                    className="text-[#6D28D9] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

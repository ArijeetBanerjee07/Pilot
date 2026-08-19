'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface AuthDesign1Props {
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
  onSuccess?: () => void;
}

export default function AuthDesign1DevZero({ mode, onModeChange, onSuccess }: AuthDesign1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('alex.smith@company.com');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(mode === 'signin' ? 'Welcome back!' : 'Account created successfully!');
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 800);
    }, 1000);
  };

  return (
    <div className="w-full h-screen max-h-screen flex bg-white text-slate-900 overflow-hidden font-sans select-none">
      {/* Left Column - Auth Form (Strictly fits without scroll) */}
      <div className="w-full lg:w-[48%] xl:w-[45%] h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 z-10 overflow-hidden">
        {/* Brand / Logo + Mode Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 relative flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                <path
                  d="M8 6L18 2L26 9L16 16L8 6Z"
                  fill="url(#brandGrad1)"
                />
                <path
                  d="M8 14L16 16L24 23L14 30L8 14Z"
                  fill="url(#brandGrad2)"
                />
                <defs>
                  <linearGradient id="brandGrad1" x1="8" y1="2" x2="26" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="brandGrad2" x1="8" y1="14" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Pilot <span className="text-violet-600 font-extrabold text-[10px] px-1.5 py-0.5 rounded-md bg-violet-50 ml-1 border border-violet-200">DevZero</span>
            </span>
          </div>

          {/* Quick In-Form Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => onModeChange('signin')}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white text-[#635BFF] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onModeChange('signup')}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#635BFF] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Center Form Section */}
        <div className="w-full max-w-[380px] mx-auto my-auto py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              {/* Header */}
              <div className="space-y-1 text-left">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {mode === 'signin' ? 'Login' : 'Create an account'}
                </h1>
                <p className="text-xs text-slate-500 font-normal">
                  {mode === 'signin'
                    ? 'We suggest using the email address you use at work.'
                    : 'Join high-velocity teams developing autonomous AI agents.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {mode === 'signup' && (
                  <div className="space-y-0.5">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition shadow-2xs"
                    />
                  </div>
                )}

                <div className="space-y-0.5">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex.smith@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition shadow-2xs"
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        className="text-[11px] text-slate-500 hover:text-violet-600 transition font-medium cursor-pointer"
                      >
                        Forgot password
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition pr-9 shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-0.5">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition pr-9 shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-[#635BFF] hover:bg-[#5349e4] active:bg-[#483fd8] text-white text-xs font-semibold rounded-lg shadow-sm shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : successMessage ? (
                    <span className="flex items-center gap-1 text-white">
                      <Check className="w-3.5 h-3.5" /> {successMessage}
                    </span>
                  ) : (
                    <span>{mode === 'signin' ? 'Login' : 'Create Account'}</span>
                  )}
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center py-0.5">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  OR
                </span>
              </div>

              {/* Social Logins */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>)}
                  className="w-full py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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

                <button
                  type="button"
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>)}
                  className="w-full py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <FaGithub className="w-3.5 h-3.5 text-slate-900" />
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* Mode Toggle Link */}
              <div className="text-center pt-0.5 text-xs text-slate-600">
                {mode === 'signin' ? (
                  <span>
                    You don&apos;t have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => onModeChange('signup')}
                      className="text-[#635BFF] font-semibold hover:underline cursor-pointer ml-1"
                    >
                      Sign up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onModeChange('signin')}
                      className="text-[#635BFF] font-semibold hover:underline cursor-pointer ml-1"
                    >
                      Sign in
                    </button>
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-slate-400">
          By creating account you agree to our{' '}
          <a href="#" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-slate-600 hover:text-slate-900 underline underline-offset-2">
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Right Column - DevZero 3D Perspective Tech Diagram */}
      <div className="hidden lg:flex flex-1 h-full relative bg-gradient-to-tr from-slate-100 via-slate-50 to-indigo-50/50 items-center justify-center overflow-hidden border-l border-slate-200/80">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #cbd5e1 1px, transparent 1px),
              linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            perspective: '1000px',
            transform: 'rotateX(25deg) scale(1.15) translateY(-20px)'
          }}
        />

        {/* Soft Ambient Glows */}
        <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Isometric / Perspective 3D Interactive Graph Diagram */}
        <div className="relative w-full max-w-lg h-full flex flex-col items-center justify-center p-4 select-none">
          
          {/* Top Floating Glass Status Card */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute top-8 right-8 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-2.5 shadow-lg shadow-slate-200/70 w-52 text-left"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-4.5 h-4.5 rounded-md bg-violet-100 flex items-center justify-center text-violet-600">
                  <Terminal className="w-2.5 h-2.5" />
                </div>
                <div className="space-y-0.5">
                  <div className="w-14 h-1.5 bg-slate-300 rounded-sm" />
                  <div className="w-9 h-1 bg-slate-200 rounded-sm" />
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden my-1">
              <div className="bg-violet-600 h-full w-[72%] rounded-full" />
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-400">
              <span>Cluster sync</span>
              <span className="font-mono text-violet-600 font-semibold">Ready</span>
            </div>
          </motion.div>

          {/* Central DevZero Node Structure */}
          <div className="relative w-full flex flex-col items-center justify-center space-y-7 mt-6">
            
            {/* Main Command Pill */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              className="z-10 bg-white border border-slate-300/90 shadow-[0_6px_20px_rgba(0,0,0,0.06)] rounded-full px-5 py-2 flex items-center gap-2 cursor-pointer group"
            >
              <span className="text-xs font-mono font-bold text-slate-800 tracking-wide flex items-center gap-1.5">
                <span className="text-violet-600 font-black">$</span> dz machines new
              </span>
            </motion.div>

            {/* Vertical Connector Line with Branching */}
            <div className="relative w-full flex flex-col items-center">
              {/* Vertical line top */}
              <div className="w-[1.5px] h-8 bg-indigo-300" />

              {/* Branch Container */}
              <div className="relative w-72 flex flex-col space-y-3.5">
                {/* Horizontal branch line */}
                <div className="absolute top-4 left-0 right-0 h-[1.5px] bg-indigo-200 -z-0" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-indigo-300" />

                {/* Sub Node 1: frontend */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="ml-auto flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-xs shadow-slate-100 z-10 hover:border-violet-300 transition-colors"
                >
                  <span className="text-[11px] font-mono text-slate-600">
                    <span className="text-violet-600 font-bold">*</span>frontend <span className="text-slate-400">(usersc-web)</span>
                  </span>
                </motion.div>

                {/* Sub Node 2: backend */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="ml-auto flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-xs shadow-slate-100 z-10 hover:border-violet-300 transition-colors"
                >
                  <span className="text-[11px] font-mono text-slate-600">
                    <span className="text-violet-600 font-bold">*</span>backend <span className="text-slate-400">(provisioner)</span>
                  </span>
                </motion.div>

                {/* Sub Node 3: fullstack-k8s */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="ml-auto flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-xs shadow-slate-100 z-10 hover:border-violet-300 transition-colors"
                >
                  <span className="text-[11px] font-mono text-slate-600">
                    <span className="text-violet-600 font-bold">*</span>fullstack-k8s <span className="text-slate-400">(users-app)</span>
                  </span>
                </motion.div>
              </div>

              {/* Vertical line bottom */}
              <div className="w-[1.5px] h-8 bg-indigo-300" />
            </div>

            {/* Bottom Command Pill */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="z-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-1.5 text-[10px] font-mono text-slate-500 shadow-2xs"
            >
              $ dzmachines start -t fullstack-k8s
            </motion.div>

            {/* Bottom Pulsing Hourglass Node */}
            <div className="relative flex items-center justify-center pt-1">
              <div className="absolute w-16 h-16 rounded-full border border-violet-400/30 animate-ping opacity-30" />
              <div className="absolute w-12 h-12 rounded-full border border-violet-400/40 animate-pulse" />
              <div className="absolute w-9 h-9 rounded-full bg-violet-100/60" />

              {/* Centered Glowing Pill */}
              <div className="relative w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-500/40 z-10">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Lateral Radar arcs */}
              <div className="absolute -left-6 text-violet-400/80 font-mono text-xs select-none">((</div>
              <div className="absolute -right-6 text-violet-400/80 font-mono text-xs select-none">))</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthSectionOne from '@/components/ui/auth-section-1';

function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);

  useEffect(() => {
    const m = searchParams.get('mode');
    if (m === 'signin' || m === 'signup') {
      setAuthMode(m);
    }
  }, [searchParams]);

  const handleAuthSuccess = () => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-slate-100/90 text-slate-900 overflow-hidden select-none">
      {/* Background: Subtle light ambient mesh */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-100 via-purple-50/50 to-indigo-50/60 pointer-events-none z-0" />

      {/* Main Form Content */}
      <main className="w-full flex items-center justify-center z-10 px-3 sm:px-4 py-6 pointer-events-auto">
        <AuthSectionOne
          mode={authMode}
          onModeChange={setAuthMode}
          onSuccess={handleAuthSuccess}
        />
      </main>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-slate-100 flex items-center justify-center text-slate-700">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}

import React from 'react';
import { Check } from 'lucide-react';

export const OnboardingIllustration: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center py-4">
      {/* Background Soft Blob */}
      <div className="absolute w-56 h-56 bg-purple-200/50 rounded-full blur-2xl -z-10"></div>
      <div className="absolute w-40 h-40 bg-blue-200/40 rounded-full blur-xl -z-10 translate-x-8 -translate-y-4"></div>

      {/* Sparkles */}
      <div className="absolute top-0 right-10 text-amber-400 font-bold text-lg animate-pulse">
        ⚡
      </div>

      <div className="relative flex flex-col items-center">
        {/* Profile Clipboard / Card */}
        <div className="relative bg-white rounded-3xl p-5 shadow-xl shadow-indigo-900/10 border border-slate-100 w-56 space-y-3 pt-6">
          {/* Clip handle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-blue-500 rounded-lg shadow-sm"></div>

          {/* Avatar Icon */}
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Form lines */}
          <div className="space-y-2 pt-1">
            <div className="h-2.5 bg-slate-100 rounded-full w-full"></div>
            <div className="h-2.5 bg-slate-100 rounded-full w-2/3"></div>
          </div>

          {/* Green Check Badge */}
          <div className="absolute -bottom-2 right-4 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>

        {/* Stacked Books underneath */}
        <div className="mt-3 flex flex-col items-center space-y-1">
          <div className="w-40 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl shadow-md border border-white/80 flex items-center justify-center">
            <div className="w-6 h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="w-44 h-9 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-md border border-white/80 flex items-center justify-center">
            <div className="w-8 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

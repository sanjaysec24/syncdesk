import React from 'react';
import { Sparkles } from 'lucide-react';

export const RegistrationIllustration: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center p-8">
      {/* Background soft lavender cloud blob */}
      <div className="absolute w-72 h-72 bg-purple-200/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute w-56 h-56 bg-blue-200/40 rounded-full blur-2xl -z-10 translate-x-10 -translate-y-6"></div>

      {/* Sparkles / Yellow dashes */}
      <div className="absolute top-6 right-12 text-amber-400 font-black text-xl animate-pulse">
        ⚡
      </div>

      <div className="relative flex flex-col items-center">
        {/* Graduation cap floating on top of profile card */}
        <div className="absolute -top-12 z-20 flex flex-col items-center">
          <div className="w-20 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl shadow-lg border-2 border-indigo-400 flex items-center justify-center relative">
            <div className="absolute -right-3 bottom-2 w-1 h-6 bg-amber-400 rounded-full rotate-12"></div>
            <div className="absolute -right-3.5 bottom-1.5 w-2 h-2 bg-amber-500 rounded-full"></div>
          </div>
          <div className="w-28 h-4 bg-indigo-700/80 rounded-full shadow-md"></div>
        </div>

        {/* Profile Registration Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-indigo-900/15 border border-slate-100 w-64 space-y-4 pt-8 relative">
          {/* Header dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          </div>

          {/* Profile Avatar Icon */}
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Form lines placeholder */}
          <div className="space-y-2 pt-1">
            <div className="h-3 bg-slate-100 rounded-full w-full"></div>
            <div className="h-3 bg-slate-100 rounded-full w-3/4"></div>
          </div>

          {/* Green Plus Action Badge */}
          <div className="absolute -bottom-3 right-6 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 font-bold text-lg border-2 border-white">
            +
          </div>
        </div>

        {/* Stacked Books underneath */}
        <div className="mt-4 flex flex-col items-center space-y-1">
          {/* Top Book (Purple) */}
          <div className="w-48 h-9 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl shadow-lg border-2 border-white/90 flex items-center justify-center">
            <div className="w-8 h-1 bg-white/40 rounded-full"></div>
          </div>
          {/* Bottom Book (Blue) */}
          <div className="w-52 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg border-2 border-white/90 flex items-center justify-center">
            <div className="w-10 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

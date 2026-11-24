import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export const CalendarIllustration: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${compact ? 'scale-75 origin-center my-2' : 'my-4'}`}>
      {/* Background Soft Glow / Blob */}
      <div className="absolute w-64 h-64 bg-purple-200/50 rounded-full blur-2xl -z-10"></div>
      <div className="absolute w-48 h-48 bg-blue-200/40 rounded-full blur-xl -z-10 translate-x-12 -translate-y-8"></div>

      {/* Floating Sparkle / Star */}
      <div className="absolute -top-4 right-12 w-8 h-8 text-amber-400 animate-pulse">
        <Sparkles className="w-full h-full" />
      </div>

      {/* Calendar 3D Card */}
      <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-4 shadow-2xl shadow-blue-500/30 text-white w-64 sm:w-72 border border-blue-400/30 rotate-1">
        {/* Calendar Ring Handles */}
        <div className="absolute -top-3 left-16 w-4 h-6 bg-blue-400 rounded-full border border-blue-300"></div>
        <div className="absolute -top-3 right-16 w-4 h-6 bg-blue-400 rounded-full border border-blue-300"></div>

        {/* Calendar Header / White Card Surface */}
        <div className="bg-white rounded-2xl p-4 text-slate-800 shadow-inner mt-2 space-y-3">
          {/* Top calendar header bar */}
          <div className="flex justify-between items-center">
            <div className="w-12 h-3 bg-blue-200 rounded-full"></div>
            <div className="w-6 h-3 bg-slate-200 rounded-full"></div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="h-10 bg-slate-100 rounded-xl"></div>
            <div className="h-10 bg-slate-100 rounded-xl"></div>
            <div className="h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div className="h-10 bg-slate-100 rounded-xl"></div>
            <div className="h-10 bg-slate-100 rounded-xl"></div>
            <div className="h-10 bg-slate-100 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Human Figures (Blue & Purple Avatars) */}
      <div className="absolute -bottom-4 right-2 sm:right-6 flex items-end gap-1.5 z-20">
        {/* Purple Figure */}
        <div className="w-12 h-14 bg-purple-600 rounded-t-full shadow-lg shadow-purple-600/30 flex items-center justify-center relative translate-y-2">
          <div className="absolute -top-4 w-7 h-7 bg-purple-400 rounded-full border-2 border-white shadow-xs"></div>
        </div>
        {/* Blue Figure */}
        <div className="w-14 h-18 bg-blue-600 rounded-t-full shadow-lg shadow-blue-600/30 flex items-center justify-center relative">
          <div className="absolute -top-5 w-8 h-8 bg-blue-400 rounded-full border-2 border-white shadow-xs"></div>
        </div>
      </div>
    </div>
  );
};

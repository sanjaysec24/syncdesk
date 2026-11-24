import React from 'react';

export const JoinDeskIllustration: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center py-4">
      {/* Background Soft Blob */}
      <div className="absolute w-56 h-56 bg-purple-200/50 rounded-full blur-2xl -z-10"></div>
      <div className="absolute w-40 h-40 bg-blue-200/40 rounded-full blur-xl -z-10 translate-x-8 -translate-y-4"></div>

      {/* Sparkles / Yellow dashes */}
      <div className="absolute top-2 right-12 text-amber-400 font-bold text-lg animate-pulse">
        ⚡
      </div>

      <div className="relative flex flex-col items-center">
        {/* Workspace Card / Board behind */}
        <div className="relative bg-white rounded-3xl p-5 shadow-xl shadow-indigo-900/10 border border-slate-100 w-52 h-36 flex flex-col items-center justify-center space-y-3 pt-6">
          {/* Users icon badge */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="h-2 bg-slate-100 rounded-full w-24"></div>
          <div className="h-2 bg-slate-100 rounded-full w-16"></div>

          {/* Green Plus Action Badge */}
          <div className="absolute -top-3 right-4 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 font-bold text-lg border-2 border-white">
            +
          </div>
        </div>

        {/* 3D Team Member Avatars (Purple, Blue, Yellow) */}
        <div className="mt-[-25px] z-20 flex items-end justify-center gap-2">
          {/* Purple Avatar */}
          <div className="w-12 h-14 bg-purple-500 rounded-t-full shadow-md flex items-center justify-center relative translate-y-1">
            <div className="absolute -top-3.5 w-6 h-6 bg-purple-300 rounded-full border-2 border-white"></div>
          </div>
          {/* Blue Avatar */}
          <div className="w-14 h-18 bg-blue-600 rounded-t-full shadow-lg flex items-center justify-center relative">
            <div className="absolute -top-4 w-7 h-7 bg-blue-400 rounded-full border-2 border-white"></div>
          </div>
          {/* Yellow Avatar */}
          <div className="w-12 h-14 bg-amber-400 rounded-t-full shadow-md flex items-center justify-center relative translate-y-1">
            <div className="absolute -top-3.5 w-6 h-6 bg-amber-200 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

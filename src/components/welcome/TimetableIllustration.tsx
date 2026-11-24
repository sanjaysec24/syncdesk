import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export const TimetableIllustration: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center py-2">
      {/* Background Soft Blob */}
      <div className="absolute w-56 h-56 bg-purple-200/50 rounded-full blur-2xl -z-10"></div>
      <div className="absolute w-40 h-40 bg-blue-200/40 rounded-full blur-xl -z-10 translate-x-8 -translate-y-4"></div>

      {/* Sparkles / Yellow dashes */}
      <div className="absolute top-0 right-12 text-amber-400 font-bold text-lg animate-pulse">
        ⚡
      </div>

      <div className="relative flex flex-col items-center">
        {/* Calendar 3D Card */}
        <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-3.5 shadow-xl shadow-blue-500/25 text-white w-52 border border-blue-400/35 rotate-1">
          <div className="absolute -top-3 left-10 w-3 h-5 bg-blue-400 rounded-full border border-blue-300"></div>
          <div className="absolute -top-3 right-10 w-3 h-5 bg-blue-400 rounded-full border border-blue-300"></div>

          <div className="bg-white rounded-2xl p-3 text-slate-800 shadow-inner mt-1 space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-8 h-2 bg-blue-200 rounded-full"></div>
              <div className="w-4 h-2 bg-slate-200 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div className="h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div className="col-span-2 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Books and Clock */}
        <div className="mt-[-15px] z-20 flex items-end gap-3">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-36 h-7 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl shadow-md border border-white/90"></div>
            <div className="w-40 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-md border border-white/90"></div>
          </div>
          {/* Clock icon */}
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg border-2 border-white flex items-center justify-center translate-y-1">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

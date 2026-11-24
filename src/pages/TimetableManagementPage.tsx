import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { TimetableGrid } from '../components/common/TimetableGrid';
import { Calendar, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TimetableManagementPage: React.FC = () => {
  const { timetable, updateTimetable } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold uppercase tracking-wider text-[10px]">
                Master Timetable Control
              </span>
              <span className="text-xs text-slate-400">Saveetha Engineering College</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Timetable Management</h2>
            <p className="text-xs sm:text-sm text-slate-500">Comprehensive schedule grid for Monday through Saturday across all 6 academic periods.</p>
          </div>

          <button
            onClick={() => navigate('/timetable/submit')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Edit & Submit Schedule
          </button>
        </div>

        {/* Timetable Grid Component */}
        <TimetableGrid timetable={timetable} />
      </main>

      <BottomNav />
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Activity, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const ActivityLogsPage: React.FC = () => {
  const { activityLogs } = useApp();

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                Audit Trail
              </span>
              <span className="text-xs text-slate-400">Saveetha Engineering College</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Activity Logs</h2>
            <p className="text-xs sm:text-sm text-slate-500">Real-time chronicle of profile edits, timetable submissions, and group updates.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="space-y-6">
            {activityLogs.map((log, index) => (
              <div key={log.id} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                <img
                  src={log.userAvatar}
                  alt={log.userName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-xs"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-slate-900">{log.userName}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {log.timestamp}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {log.action} <span className="font-bold text-indigo-600">{log.target}</span>
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    {log.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

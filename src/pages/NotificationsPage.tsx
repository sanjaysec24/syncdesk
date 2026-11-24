import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Bell, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 font-bold uppercase tracking-wider text-[10px]">
                System Alerts
              </span>
              <span className="text-xs text-slate-400">Saveetha Engineering College</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Notifications Center</h2>
            <p className="text-xs sm:text-sm text-slate-500">Stay updated with timetable edits, new group members, and Idea Lab bookings.</p>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationAsRead(n.id);
                if (n.linkTo) navigate(n.linkTo);
              }}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                n.read
                  ? 'bg-white border-slate-100 text-slate-600'
                  : 'bg-indigo-50/40 border-indigo-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${n.read ? 'bg-slate-300' : 'bg-pink-500 animate-pulse'}`}></span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{n.message}</p>
              </div>

              {n.linkTo && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 shrink-0">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

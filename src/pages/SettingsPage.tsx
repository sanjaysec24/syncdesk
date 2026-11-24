import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Settings as SettingsIcon, Bell, ShieldCheck, Sparkles, CheckCircle2, UserCheck, LogOut } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser, switchRole } = useApp();
  const navigate = useNavigate();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [ideaLabSync, setIdeaLabSync] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold uppercase tracking-wider text-[10px]">
                Desk Preferences
              </span>
              <span className="text-xs text-slate-400">Saveetha Engineering College</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Desk Settings</h2>
            <p className="text-xs sm:text-sm text-slate-500">Configure notifications, availability sync, and demo role preferences.</p>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-bold">Desk settings successfully saved!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Role & Account</h3>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">{currentUser.name}</div>
                <div className="text-xs text-slate-500">{currentUser.email}</div>
                <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold uppercase">
                  {currentUser.role}
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/profile/complete')}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-indigo-600 font-bold text-xs border border-slate-200 shadow-xs"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Notifications & Alerts</h3>
            
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="font-bold text-slate-900 text-sm">Email Timetable Reminders</div>
                <div className="text-xs text-slate-500">Receive weekly schedule digest via Saveetha email</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="w-5 h-5 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="font-bold text-slate-900 text-sm">Live Peer Availability Push Alerts</div>
                <div className="text-xs text-slate-500">Notify when classmates or teammates become free</div>
              </div>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={e => setPushAlerts(e.target.checked)}
                className="w-5 h-5 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="font-bold text-slate-900 text-sm">AICTE Idea Lab Auto-GPS Sync</div>
                <div className="text-xs text-slate-500">Automatically update status when entering Idea Lab zones</div>
              </div>
              <input
                type="checkbox"
                checked={ideaLabSync}
                onChange={e => setIdeaLabSync(e.target.checked)}
                className="w-5 h-5 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/welcome')}
              className="px-5 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Log Out / Switch Mode
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25"
            >
              Save Settings
            </button>
          </div>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import {
  ShieldAlert,
  Users,
  Calendar,
  Layers,
  Activity,
  CheckCircle2,
  TrendingUp,
  Building2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { users: allUsers, groups: allGroups, activityLogs: logs, currentUser } = useApp();
  const navigate = useNavigate();

  if (currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Admin Access Required</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You are currently logged in as <span className="font-bold uppercase text-indigo-600">{currentUser.role}</span>. Switch to Admin role in the demo bar above to access this dashboard.
          </p>
          <button
            onClick={() => navigate('/workspace')}
            className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-lg"
          >
            Return to Workspace
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" /> Administrator Control Center
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Saveetha Engineering College Admin</h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Managing master timetables, AICTE Idea Lab resource allocations, faculty approvals, and campus-wide availability sync.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/timetable/manage')}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Manage Timetables
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Campus Users</span>
              <h4 className="text-3xl font-black text-slate-900">{allUsers.length} Active</h4>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 100% Onboarded
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Idea Lab Teams</span>
              <h4 className="text-3xl font-black text-slate-900">{allGroups.length} Squads</h4>
              <p className="text-xs text-purple-600 font-semibold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Fully Equipped
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Timetable Status</span>
              <h4 className="text-3xl font-black text-slate-900">Synchronized</h4>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Mon - Sat Active
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security & Audit</span>
              <h4 className="text-3xl font-black text-slate-900">Secure</h4>
              <p className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Role RBAC Enforced
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/timetable/manage')}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-indigo-300 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Master Timetable Control</h4>
            <p className="text-xs text-slate-500 mt-2">
              Review and override department schedules, lecture halls, and AICTE Idea Lab slot bookings.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600">
              <span>Open Timetables</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => navigate('/members')}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-purple-300 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">User Directory & Roles</h4>
            <p className="text-xs text-slate-500 mt-2">
              Manage student enrollments, faculty designations, and administrative permissions.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-purple-600">
              <span>View Members</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => navigate('/activity')}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">System Activity Logs</h4>
            <p className="text-xs text-slate-500 mt-2">
              Real-time audit trail of all profile updates, timetable changes, and group formations.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
              <span>View Audit Logs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

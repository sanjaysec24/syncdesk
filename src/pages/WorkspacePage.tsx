import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { TimetableGrid } from '../components/common/TimetableGrid';
import {
  Sparkles,
  Calendar,
  Users,
  Layers,
  MessageSquare,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Coffee,
  ShieldAlert,
  Building2,
  Bell
} from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const { currentUser, timetable, users, groups, notifications } = useApp();
  const navigate = useNavigate();

  const freeMembersCount = users.filter(u => u.status === 'free').length;
  const activeGroupsCount = groups.length;

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-pink-400" />
                Saveetha Engineering College • AICTE Idea Lab
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Welcome back, {currentUser.name}! 👋
              </h2>
              <p className="text-sm sm:text-base text-indigo-100 max-w-2xl font-medium">
                You are logged in as <span className="font-bold uppercase text-pink-300">{currentUser.role}</span>. Your current status is set to <span className="font-bold text-emerald-300 uppercase">{currentUser.status}</span> at <span className="underline">{currentUser.currentLocation || 'AICTE Idea Lab'}</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/timetable/submit')}
                className="px-5 py-3 rounded-2xl bg-white text-indigo-950 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-indigo-600" /> Update Timetable
              </button>
              <button
                onClick={() => navigate('/members')}
                className="px-5 py-3 rounded-2xl bg-indigo-800/80 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm border border-indigo-600/50 shadow-lg transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-emerald-400" /> View Free Peers ({freeMembersCount})
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Peers Now</span>
              <h4 className="text-3xl font-black text-slate-900">{freeMembersCount}</h4>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Available in Idea Lab
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Teams</span>
              <h4 className="text-3xl font-black text-slate-900">{activeGroupsCount}</h4>
              <p className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Idea Lab & Projects
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unread Alerts</span>
              <h4 className="text-3xl font-black text-slate-900">{notifications.filter(n => !n.read).length}</h4>
              <p className="text-xs text-pink-600 font-semibold flex items-center gap-1">
                <Bell className="w-3.5 h-3.5" /> Check notifications
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Location</span>
              <h4 className="text-lg font-black text-slate-900 truncate max-w-[180px]">{currentUser.currentLocation || 'Idea Lab'}</h4>
              <p className="text-xs text-purple-600 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> GPS / Room Sync
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Master Timetable Section */}
        <TimetableGrid timetable={timetable} />

        {/* Bottom Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/members')}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-indigo-300 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Explore Campus Members</h4>
            <p className="text-xs text-slate-500 mt-2">
              Find classmates and professors currently free in the AICTE Idea Lab, CC-Labs, or Lecture Halls.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600">
              <span>View Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => navigate('/groups')}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-purple-300 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Groups & Idea Lab Teams</h4>
            <p className="text-xs text-slate-500 mt-2">
              Collaborate with project squads, hardware research cells, and hackathon clubs.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-purple-600">
              <span>View Groups</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => navigate('/chat')}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Common Campus Chat</h4>
            <p className="text-xs text-slate-500 mt-2">
              Instant messaging across general channels, Idea Lab innovators, and departmental study circles.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
              <span>Open Chat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

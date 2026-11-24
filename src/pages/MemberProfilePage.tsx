import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { TimetableGrid } from '../components/common/TimetableGrid';
import { ArrowLeft, Mail, Phone, MapPin, Sparkles, Calendar, CheckCircle2, MessageSquare } from 'lucide-react';

export const MemberProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users, timetable } = useApp();
  const navigate = useNavigate();

  const member = users.find(u => u.id === id) || users[0];

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/members')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs shadow-xs border border-slate-200/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Members Directory
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold uppercase tracking-wider text-[10px]">
                    {member.role}
                  </span>
                  <span className="text-xs text-slate-400">{member.department}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{member.name}</h1>
                <p className="text-xs sm:text-sm text-indigo-600 font-semibold">{member.designation || member.year}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/chat')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Direct Message
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Email Address</span>
                <p className="text-xs font-bold text-slate-900 truncate">{member.email}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</span>
                <p className="text-xs font-bold text-slate-900">{member.phone || '+91 98401 XXXXX'}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Current Location</span>
                <p className="text-xs font-bold text-slate-900 truncate">{member.currentLocation || 'AICTE Idea Lab'}</p>
              </div>
            </div>
          </div>

          {member.bio && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Biography & Focus</h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                {member.bio}
              </p>
            </div>
          )}

          {member.skills && member.skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills & Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Member Timetable */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">{member.name}'s Schedule</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Live Timetable Synced
            </span>
          </div>
          <TimetableGrid timetable={timetable} />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

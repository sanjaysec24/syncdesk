import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Search, Users, MapPin, Phone, Mail, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const MembersPage: React.FC = () => {
  const { users } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'faculty' | 'admin'>('all');

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (u.skills || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header Title */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold uppercase tracking-wider text-[10px]">
                Campus Directory
              </span>
              <span className="text-xs text-slate-400">Saveetha Engineering College</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Members & Live Availability</h2>
            <p className="text-xs sm:text-sm text-slate-500">Connect with students, professors, and Idea Lab innovators across departments.</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, department, skill..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
              {(['all', 'student', 'faculty', 'admin'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    roleFilter === role ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => {
            const isFree = user.status === 'free';
            return (
              <div
                key={user.id}
                onClick={() => navigate(`/members/${user.id}`)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        isFree ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} title={user.status}></span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'admin'
                        ? 'bg-pink-50 text-pink-700'
                        : user.role === 'faculty'
                        ? 'bg-purple-50 text-purple-700'
                        : 'bg-indigo-50 text-indigo-700'
                    }`}>
                      {user.role}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{user.department}</p>
                    {user.year && <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">{user.year}</p>}
                    {user.designation && <p className="text-[11px] text-purple-600 font-semibold mt-0.5">{user.designation}</p>}
                  </div>

                  {user.bio && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{user.bio}</p>
                  )}

                  {user.skills && user.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {user.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate max-w-[180px]">{user.currentLocation || 'Idea Lab'}</span>
                  </div>
                  <span className="font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

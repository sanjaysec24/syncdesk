import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Search, Users, MapPin, ArrowRight, CheckCircle2, ArrowLeft, UserCheck, GraduationCap, Shield } from 'lucide-react';

export const MembersPage: React.FC = () => {
  const { deskId } = useParams<{ deskId: string }>();
  const { users, groups } = useApp();
  const navigate = useNavigate();

  const currentDesk = groups.find(g => g.id === deskId) || groups[0];

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'faculty' | 'admin' | 'active'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'role'>('name');

  const totalMembersCount = users.length;
  const studentsCount = users.filter(u => u.role === 'student').length;
  const facultyCount = users.filter(u => u.role === 'faculty').length;
  const activeCount = users.filter(u => u.status === 'free').length;

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (roleFilter === 'active') return matchesSearch && u.status === 'free';
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.role.localeCompare(b.role);
  });

  return (
    <div className="min-h-screen bg-[#F6F5FB] font-['Plus_Jakarta_Sans',sans-serif] pb-24 md:pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Breadcrumb & Back */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span>My Desks</span>
              <span>/</span>
              <span className="text-blue-600">{currentDesk?.name || 'IDEA Lab Desk'}</span>
              <span>/</span>
              <span className="text-slate-800">Members</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101B43] tracking-tight">Members Directory</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Discover and connect with people in this workspace.</p>
          </div>

          <button
            onClick={() => navigate(deskId ? `/desk/${deskId}` : '/workspace')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs border border-slate-200 transition-colors cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Desk Workspace
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Total Members</span>
              <h3 className="text-3xl font-black text-slate-900">{totalMembersCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Students</span>
              <h3 className="text-3xl font-black text-slate-900">{studentsCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Faculty</span>
              <h3 className="text-3xl font-black text-slate-900">{facultyCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Currently Active</span>
              <h3 className="text-3xl font-black text-emerald-600">{activeCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Search, Filter & Sort Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xs border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, department, email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex bg-slate-100 p-1 rounded-2xl overflow-x-auto">
              {(['all', 'student', 'faculty', 'active'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold capitalize transition-all cursor-pointer ${
                    roleFilter === role ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs font-extrabold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="name">Sort by Name (A–Z)</option>
              <option value="role">Sort by Role</option>
            </select>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => {
            const isFree = user.status === 'free';
            return (
              <div
                key={user.id}
                onClick={() => navigate(deskId ? `/desks/${deskId}/members/${user.id}` : `/members/${user.id}`)}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between gap-6"
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

                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      user.role === 'admin'
                        ? 'bg-pink-50 text-pink-700 border border-pink-100'
                        : user.role === 'faculty'
                        ? 'bg-purple-50 text-purple-700 border border-purple-100'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {user.role}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{user.department}</p>
                    {user.year && user.role === 'student' && (
                      <p className="text-[11px] text-blue-600 font-extrabold mt-0.5">{user.year}</p>
                    )}
                    {user.designation && user.role === 'faculty' && (
                      <p className="text-[11px] text-purple-600 font-extrabold mt-0.5">{user.designation}</p>
                    )}
                  </div>

                  {user.bio && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{user.bio}</p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate max-w-[180px]">{user.currentLocation || 'Idea Lab'}</span>
                  </div>
                  <span className="font-extrabold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Profile</span>
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

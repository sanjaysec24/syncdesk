import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import {
  Users,
  GraduationCap,
  UserCheck,
  Plus,
  Copy,
  Settings,
  Search,
  ChevronRight,
  ArrowLeft,
  Bell,
  Activity,
  MoreHorizontal,
  Award,
  Star,
  Code,
  Calendar,
  Building2,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  Filter
} from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const { deskId } = useParams<{ deskId: string }>();
  const { users, groups, currentUser, chatMessages, sendChatMessage, notifications } = useApp();
  const navigate = useNavigate();

  const currentDesk = groups.find(g => g.id === deskId) || groups[0];

  const [activeView, setActiveView] = useState<'all' | 'faculty' | 'students'>('all');
  const [rightTab, setRightTab] = useState<'members' | 'chat' | 'settings'>('members');
  const [memberSearch, setMemberSearch] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [copied, setCopied] = useState(false);

  // Interactive Availability Drawer State
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; period: string; time: string } | null>(null);
  const [drawerSearch, setDrawerSearch] = useState('');
  const [drawerRoleFilter, setDrawerRoleFilter] = useState<'all' | 'faculty' | 'students'>('all');
  const [drawerStatusFilter, setDrawerStatusFilter] = useState<'all' | 'free' | 'busy'>('all');

  const isAdmin = currentUser.role === 'admin';

  // Base filtered users based on left sidebar view
  const categoryUsers = users.filter(u => {
    if (activeView === 'faculty') return u.role === 'faculty';
    if (activeView === 'students') return u.role === 'student';
    return true;
  });

  const filteredUsers = categoryUsers.filter(u =>
    u.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    u.department.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const facultyCount = users.filter(u => u.role === 'faculty').length;
  const studentCount = users.filter(u => u.role === 'student').length;
  const totalMembers = activeView === 'faculty' ? facultyCount : activeView === 'students' ? studentCount : (currentDesk?.membersCount || users.length);

  const periodsConfig = [
    { period: 'P1', time: '08:00 AM – 09:30 AM', baseFree: Math.floor(totalMembers * 0.85), baseBusy: Math.ceil(totalMembers * 0.15) },
    { period: 'P2', time: '09:45 AM – 11:15 AM', baseFree: Math.floor(totalMembers * 0.8), baseBusy: Math.ceil(totalMembers * 0.2) },
    { period: 'P3', time: '11:30 AM – 12:15 PM', baseFree: Math.floor(totalMembers * 0.75), baseBusy: Math.ceil(totalMembers * 0.25), isCurrent: true },
    { period: 'P4', time: '12:15 PM – 01:00 PM', baseFree: Math.floor(totalMembers * 0.78), baseBusy: Math.ceil(totalMembers * 0.22) },
    { period: 'P5', time: '01:30 PM – 03:00 PM', baseFree: Math.floor(totalMembers * 0.88), baseBusy: Math.ceil(totalMembers * 0.12) },
    { period: 'P6', time: '03:15 PM – 04:45 PM', baseFree: Math.floor(totalMembers * 0.92), baseBusy: Math.ceil(totalMembers * 0.08) }
  ];

  const daysConfig = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput, currentDesk ? currentDesk.id : 'general');
    setChatInput('');
  };

  const handleBackNavigation = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  // Helper to determine if a user is free or busy for a given slot (deterministic based on user id and period)
  const getUserSlotStatus = (userId: string, day: string, period: string) => {
    // Generate pseudo-random consistent status for demo robustness
    const charCodeSum = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dayIndex = daysConfig.indexOf(day);
    const periodIndex = periodsConfig.findIndex(p => p.period === period);
    const val = (charCodeSum + dayIndex * 7 + periodIndex * 13) % 10;
    // ~20-25% busy
    return val < 3 ? 'busy' : 'free';
  };

  // Compute members for selected slot in drawer
  const slotMembers = selectedSlot ? categoryUsers.map(u => {
    const status = getUserSlotStatus(u.id, selectedSlot.day, selectedSlot.period);
    return { ...u, slotStatus: status };
  }) : [];

  const slotFreeCount = slotMembers.filter(m => m.slotStatus === 'free').length;
  const slotBusyCount = slotMembers.filter(m => m.slotStatus === 'busy').length;

  const filteredDrawerMembers = slotMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(drawerSearch.toLowerCase()) ||
                          m.department.toLowerCase().includes(drawerSearch.toLowerCase());
    const matchesRole = drawerRoleFilter === 'all' || m.role === drawerRoleFilter;
    const matchesStatus = drawerStatusFilter === 'all' || m.slotStatus === drawerStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F6F5FB] font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 pb-12 relative">
      
      {/* =========================================
          1. MAIN HEADER (74px height, image-only logos)
         ========================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 h-[74px] flex items-center justify-between shadow-2xs">
        <div className="flex items-center">
          <InstitutionalLogos compact />
        </div>

        <div className="flex items-center gap-3">
          {/* Role Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>{currentUser.role}</span>
          </div>

          {/* Notification bell */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200/70 text-slate-600 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
            )}
          </button>

          {/* User Avatar Initials */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <span className="text-xs font-bold text-slate-800 hidden md:inline">
              {currentUser.name.split(' ')[0]} {currentUser.name.split(' ')[1]?.[0]}.
            </span>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN CONTAINER (max-w-[1600px], padding)
         ========================================= */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* =========================================
            2. DESK TITLE SECTION
           ========================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              onClick={handleBackNavigation}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to {isAdmin ? 'Admin Dashboard' : 'My Desks'}
            </button>
            <div className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> DESK WORKSPACE • INTERACTIVE AVAILABILITY
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#101B43] tracking-tight">
              {currentDesk?.name || 'IDEA Lab Desk'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {currentDesk?.description || 'AICTE IDEA Lab Workspace'} • {totalMembers} Members
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-blue-600" />
              <span>{copied ? 'Copied Link!' : 'Copy invite link'}</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => navigate('/groups')}
                className="px-5 py-2.5 rounded-2xl bg-[#2166E8] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create group</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================
            3. EXACT THREE-COLUMN GRID LAYOUT
           ========================================= */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
          style={{ gridTemplateColumns: 'minmax(240px, 0.58fr) minmax(500px, 1.5fr) minmax(340px, 1fr)' }}
        >
          
          {/* -----------------------------------------
              LEFT COLUMN — VIEWS & ORGANIZATION (Sidebar Card)
             ----------------------------------------- */}
          <div className="bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-2xs space-y-6">
            
            {/* VIEWS SECTION */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3">
                VIEWS (Interactive Filter)
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveView('all')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeView === 'all' ? 'bg-[#EBF2FF] text-[#2166E8]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>All Members</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeView === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
                    {currentDesk?.membersCount || users.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('faculty')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeView === 'faculty' ? 'bg-[#EBF2FF] text-[#2166E8]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4" />
                    <span>Faculty</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeView === 'faculty' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
                    {facultyCount}
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('students')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeView === 'students' ? 'bg-[#EBF2FF] text-[#2166E8]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Students</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeView === 'students' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
                    {studentCount}
                  </span>
                </button>
              </div>
            </div>

            {/* GROUPS SECTION */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3">
                GROUPS
              </span>
              <div className="space-y-1">
                {isAdmin && (
                  <button
                    onClick={() => navigate('/groups')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New group</span>
                  </button>
                )}

                <div className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Coordinators</span>
                  </div>
                  <span className="text-slate-400 text-xs">5</span>
                </div>

                <div className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span>Ambassadors</span>
                  </div>
                  <span className="text-slate-400 text-xs">8</span>
                </div>
              </div>
            </div>

            {/* TEAMS SECTION */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3">
                TEAMS
              </span>
              <div className="space-y-1">
                {isAdmin && (
                  <button
                    onClick={() => navigate('/groups')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New team</span>
                  </button>
                )}

                <div className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Code className="w-4 h-4 text-emerald-500" />
                    <span>UI/UX Team</span>
                  </div>
                  <span className="text-slate-400 text-xs">12</span>
                </div>

                <div className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    <span>Event Team</span>
                  </div>
                  <span className="text-slate-400 text-xs">15</span>
                </div>

                <div className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Code className="w-4 h-4 text-blue-500" />
                    <span>Dev Team</span>
                  </div>
                  <span className="text-slate-400 text-xs">18</span>
                </div>
              </div>
            </div>

          </div>

          {/* -----------------------------------------
              CENTER COLUMN — LIVE AVAILABILITY & INTERACTIVE TIMETABLE MATRIX
             ----------------------------------------- */}
          <div className="bg-white rounded-[22px] p-6 border border-slate-200/80 shadow-2xs space-y-6">
            
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">LIVE AVAILABILITY (Click any cell to inspect)</h3>
                  <p className="text-xs text-slate-500 font-semibold">{activeView.toUpperCase()} View • {totalMembers} Members</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold">
                <span>📅 Monday, 23 Nov 2026 • 03:27 PM</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Free Card */}
              <div className="bg-[#EBF7EE] rounded-2xl p-4 border border-emerald-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Free Now</span>
                  <h2 className="text-3xl font-black text-[#16803D] mt-0.5">{Math.floor(totalMembers * 0.78)}</h2>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/80 text-[#16803D] flex items-center justify-center shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Busy Card */}
              <div className="bg-[#FDF2F2] rounded-2xl p-4 border border-rose-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-rose-800 uppercase tracking-wider">Busy Now</span>
                  <h2 className="text-3xl font-black text-[#D92D35] mt-0.5">{Math.ceil(totalMembers * 0.22)}</h2>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/80 text-[#D92D35] flex items-center justify-center shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Current Period Card */}
              <div className="bg-[#FEF9EC] rounded-2xl p-4 border border-amber-200/80 flex items-center justify-between sm:col-span-1">
                <div>
                  <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">Current Period</span>
                  <h4 className="text-sm font-black text-amber-900 mt-1">P3 • 11:30 AM – 12:15 PM</h4>
                </div>
              </div>
            </div>

            {/* Interactive Availability Timetable Matrix */}
            <div className="overflow-x-auto pt-2">
              <p className="text-[11px] text-blue-600 font-bold mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Click any period cell below to open the member availability drawer.
              </p>
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 font-extrabold text-slate-500 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-2 text-left">Period</th>
                    {daysConfig.map(day => (
                      <th key={day} className="py-3 px-2">{day.slice(0, 3)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {periodsConfig.map(row => (
                    <tr key={row.period} className={`hover:bg-slate-50/50 transition-colors ${row.isCurrent ? 'bg-amber-50/40 border-l-4 border-amber-500' : ''}`}>
                      <td className="py-3 px-2 text-left font-bold text-slate-900 bg-slate-50/30">
                        <div>{row.period}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{row.time}</div>
                      </td>
                      {daysConfig.map((day, idx) => {
                        const offset = (idx * 2) - 3;
                        const freeCount = Math.max(5, row.baseFree + (offset % 3));
                        const busyCount = totalMembers - freeCount;

                        return (
                          <td key={day} className="py-2 px-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setSelectedSlot({ day, period: row.period, time: row.time })}
                              className="w-full flex flex-col items-center justify-center gap-0.5 bg-slate-50/80 hover:bg-blue-50/80 hover:border-blue-400 p-2 rounded-xl border border-slate-200/80 transition-all cursor-pointer group shadow-2xs"
                              title={`Inspect ${day} ${row.period}`}
                            >
                              <div className="flex items-center gap-1 text-[#16803D] font-bold group-hover:scale-105 transition-transform">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16803D]"></span>
                                <span>Free {freeCount}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[#D92D35] font-bold group-hover:scale-105 transition-transform">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D92D35]"></span>
                                <span>Busy {busyCount}</span>
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* -----------------------------------------
              RIGHT COLUMN — TWO SEPARATE VERTICALLY STACKED CARDS
             ----------------------------------------- */}
          <div className="space-y-4">
            
            {/* FIRST CARD: MEMBERS */}
            <div className="bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-2xs space-y-4">
              
              {/* Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
                <button
                  onClick={() => setRightTab('members')}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${rightTab === 'members' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Members
                </button>
                <button
                  onClick={() => setRightTab('chat')}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${rightTab === 'chat' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Common chat
                </button>
                <button
                  onClick={() => setRightTab('settings')}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${rightTab === 'settings' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Desk info
                </button>
              </div>

              {/* Members Tab Content */}
              {rightTab === 'members' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>{activeView.toUpperCase()} • {filteredUsers.length} Members</span>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={memberSearch}
                      onChange={e => setMemberSearch(e.target.value)}
                      placeholder="Search members..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {filteredUsers.slice(0, 4).map((u) => (
                      <div key={u.id} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-xs">{u.name}</h4>
                            <p className="text-[10px] text-slate-500 font-medium">{u.department.split(' ')[0]} – {u.year || u.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/members')}
                    className="w-full py-2 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View all members</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Chat Tab Content */}
              {rightTab === 'chat' && (
                <div className="space-y-3">
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {chatMessages.slice(0, 3).map(m => (
                      <div key={m.id} className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-1">
                        <div className="font-bold text-slate-900">{m.senderName}</div>
                        <p className="text-slate-600">{m.content}</p>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendChat} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      placeholder="Type message..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs"
                    />
                    <button type="submit" className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer">Send</button>
                  </form>
                </div>
              )}

              {/* Desk Info Tab Content */}
              {rightTab === 'settings' && (
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                    <h5 className="font-extrabold text-blue-900">{currentDesk?.name}</h5>
                    <p className="text-slate-600 leading-relaxed">{currentDesk?.description}</p>
                    <div className="pt-2 border-t border-blue-100/60 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-500">Category: {currentDesk?.category}</span>
                      <span className="text-blue-600">{totalMembers} Members</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* SECOND CARD: GROUPS & TEAMS */}
            <div className="bg-white rounded-[22px] p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">Groups & Teams</h4>
                <button
                  onClick={() => navigate('/groups')}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>View all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Coordinators', count: '5 Members', icon: Award, color: 'text-amber-500 bg-amber-50' },
                  { name: 'Ambassadors', count: '8 Members', icon: Star, color: 'text-purple-500 bg-purple-50' },
                  { name: 'UI/UX Team', count: '12 Members', icon: Code, color: 'text-emerald-500 bg-emerald-50' },
                  { name: 'Event Team', count: '15 Members', icon: Calendar, color: 'text-pink-500 bg-pink-50' },
                  { name: 'Dev Team', count: '18 Members', icon: Code, color: 'text-blue-500 bg-blue-50' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => navigate('/groups')}
                      className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-slate-800 text-xs">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span>{item.count}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          4. INTERACTIVE AVAILABILITY DETAIL DRAWER
         ========================================= */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider">
                  {selectedSlot.day} • {selectedSlot.period}
                </span>
                <h3 className="text-xl font-black text-[#101B43] tracking-tight">
                  Availability Inspector
                </h3>
                <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> {selectedSlot.time}
                </p>
              </div>

              <button
                onClick={() => setSelectedSlot(null)}
                className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 shadow-xs transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Summary Cards */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#EBF7EE] p-4 rounded-2xl border border-emerald-200">
                  <span className="text-[11px] font-extrabold text-emerald-800 uppercase">Free Members</span>
                  <h3 className="text-2xl font-black text-[#16803D] mt-1">{slotFreeCount}</h3>
                </div>
                <div className="bg-[#FDF2F2] p-4 rounded-2xl border border-rose-200">
                  <span className="text-[11px] font-extrabold text-rose-800 uppercase">Busy Members</span>
                  <h3 className="text-2xl font-black text-[#D92D35] mt-1">{slotBusyCount}</h3>
                </div>
              </div>

              {/* Filters inside drawer */}
              <div className="space-y-2 pt-2">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={drawerSearch}
                    onChange={e => setDrawerSearch(e.target.value)}
                    placeholder="Search member by name or dept..."
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex bg-white p-1 rounded-xl border border-slate-200 font-bold flex-1">
                    <button
                      onClick={() => setDrawerRoleFilter('all')}
                      className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${drawerRoleFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                    >
                      All Roles
                    </button>
                    <button
                      onClick={() => setDrawerRoleFilter('students')}
                      className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${drawerRoleFilter === 'students' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                    >
                      Students
                    </button>
                    <button
                      onClick={() => setDrawerRoleFilter('faculty')}
                      className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${drawerRoleFilter === 'faculty' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                    >
                      Faculty
                    </button>
                  </div>

                  <select
                    value={drawerStatusFilter}
                    onChange={e => setDrawerStatusFilter(e.target.value as any)}
                    className="bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="free">Free Only</option>
                    <option value="busy">Busy Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Drawer Member List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Matching Members ({filteredDrawerMembers.length})</span>
                <span>Status</span>
              </div>

              {filteredDrawerMembers.length > 0 ? (
                filteredDrawerMembers.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-11 h-11 rounded-xl object-cover shadow-xs"
                      />
                      <div>
                        <h4 className="font-black text-slate-900 text-xs">{m.name}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">{m.department} • {m.year || m.designation || m.role}</p>
                      </div>
                    </div>

                    <div>
                      {m.slotStatus === 'free' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Free
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-extrabold border border-rose-200">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span> Busy
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs font-semibold">
                  No members found matching your search criteria.
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Saveetha Engineering College • Sync Desk</span>
              <button
                onClick={() => setSelectedSlot(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

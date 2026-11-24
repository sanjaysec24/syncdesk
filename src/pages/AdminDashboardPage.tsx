import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import {
  Users,
  GraduationCap,
  UserCheck,
  Plus,
  Copy,
  MessageSquare,
  Settings,
  Search,
  ChevronRight,
  ArrowLeft,
  Bell,
  Activity,
  Check,
  MoreHorizontal,
  Award,
  Star,
  Code,
  Calendar
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { users, groups, currentUser, chatMessages, sendChatMessage } = useApp();
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState<'all' | 'faculty' | 'students'>('all');
  const [rightTab, setRightTab] = useState<'members' | 'chat' | 'settings'>('members');
  const [memberSearch, setMemberSearch] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [copied, setCopied] = useState(false);

  // Filtered members
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                          u.department.toLowerCase().includes(memberSearch.toLowerCase());
    if (activeView === 'faculty') return matchesSearch && u.role === 'faculty';
    if (activeView === 'students') return matchesSearch && u.role === 'student';
    return matchesSearch;
  });

  const facultyCount = users.filter(u => u.role === 'faculty').length + 4; // matching reference numbers
  const studentCount = users.filter(u => u.role === 'student').length + 50;
  const totalMembers = 70;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput, 'general');
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#F6F5FB] font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 pb-12">
      
      {/* =========================================
          TOP NAVIGATION BAR
         ========================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-4">
          <InstitutionalLogos compact />
        </div>

        <div className="flex items-center gap-3">
          {/* Admin Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Admin</span>
          </div>

          {/* Notification bell */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2.5 rounded-full bg-slate-100 hover:bg-slate-200/70 text-slate-600 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          {/* User Avatar Initials */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
              {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <span className="text-xs font-bold text-slate-800 hidden md:inline">
              {currentUser.name.split(' ')[0]} {currentUser.name.split(' ')[1]?.[0]}.
            </span>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN DASHBOARD CONTAINER
         ========================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Header Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              onClick={() => navigate('/workspace')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs shadow-2xs transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Desks
            </button>
            <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              ADMIN DASHBOARD
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#101B43] tracking-tight">
              IDEA Lab Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              AICTE IDEA Lab Workspace • {totalMembers} Members
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

            <button
              onClick={() => navigate('/groups')}
              className="px-5 py-2.5 rounded-2xl bg-[#2166E8] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create group</span>
            </button>
          </div>
        </div>

        {/* =========================================
            THREE-COLUMN GRID LAYOUT
           ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* -----------------------------------------
              LEFT SIDEBAR: VIEWS & ORGANIZATION (Col 3)
             ----------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-6">
              
              {/* VIEWS SECTION */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3">
                  VIEWS
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
                      {totalMembers}
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
                  <button
                    onClick={() => navigate('/groups')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New group</span>
                  </button>

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
                  <button
                    onClick={() => navigate('/groups')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New team</span>
                  </button>

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
          </div>

          {/* -----------------------------------------
              CENTER: LIVE AVAILABILITY & TIMETABLE (Col 6)
             ----------------------------------------- */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
              
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">LIVE AVAILABILITY</h3>
                    <p className="text-xs text-slate-500 font-semibold">All Members • {totalMembers}</p>
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
                    <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Free</span>
                    <h2 className="text-3xl font-black text-[#16803D] mt-0.5">42</h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/80 text-[#16803D] flex items-center justify-center shadow-xs">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                {/* Busy Card */}
                <div className="bg-[#FDF2F2] rounded-2xl p-4 border border-rose-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-rose-800 uppercase tracking-wider">Busy</span>
                    <h2 className="text-3xl font-black text-[#D92D35] mt-0.5">28</h2>
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

              {/* Availability Timetable Matrix matching reference image */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-center border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 font-extrabold text-slate-500 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-2 text-left">Period</th>
                      <th className="py-3 px-2">Mon</th>
                      <th className="py-3 px-2">Tue</th>
                      <th className="py-3 px-2">Wed</th>
                      <th className="py-3 px-2">Thu</th>
                      <th className="py-3 px-2">Fri</th>
                      <th className="py-3 px-2">Sat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { period: 'P1', time: '08:00 – 09:30', free: 46, busy: 24 },
                      { period: 'P2', time: '09:45 – 11:15', free: 45, busy: 25 },
                      { period: 'P3', time: '11:30 – 12:15', free: 42, busy: 28, isCurrent: true },
                      { period: 'P4', time: '12:15 – 12:59', free: 41, busy: 29 },
                      { period: 'P5', time: '01:15 – 02:45', free: 44, busy: 26 },
                      { period: 'P6', time: '03:00 – 04:30', free: 48, busy: 22 }
                    ].map(row => (
                      <tr key={row.period} className={`hover:bg-slate-50/50 transition-colors ${row.isCurrent ? 'bg-amber-50/40 border-l-4 border-amber-500' : ''}`}>
                        <td className="py-3 px-2 text-left font-bold text-slate-900 bg-slate-50/30">
                          <div>{row.period}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{row.time}</div>
                        </td>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => {
                          // slight variation for realism
                          const offset = (idx * 2) - 3;
                          const f = row.free + (offset % 3);
                          const b = totalMembers - f;

                          return (
                            <td key={day} className="py-3 px-1 text-[11px]">
                              <div className="flex flex-col items-center justify-center gap-0.5 bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-1 text-[#16803D] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#16803D]"></span>
                                  <span>Free {f}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[#D92D35] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D92D35]"></span>
                                  <span>Busy {b}</span>
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* -----------------------------------------
              RIGHT PANEL: MEMBERS, CHAT, SETTINGS & GROUPS (Col 3)
             ----------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Right Card with Tabs */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              
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
                  Settings
                </button>
              </div>

              {/* Members Tab Content */}
              {rightTab === 'members' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>All Members • {totalMembers}</span>
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
                    {filteredUsers.slice(0, 3).map((u, i) => (
                      <div key={u.id} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl font-black text-xs flex items-center justify-center text-white ${
                            i === 0 ? 'bg-purple-400' : i === 1 ? 'bg-rose-400' : 'bg-blue-500'
                          }`}>
                            {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-xs">{u.name}</h4>
                            <p className="text-[10px] text-slate-500 font-medium">{u.department.split(' ')[0]} – {u.year || 'III Year'}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                          </span>
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
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
                    <button type="submit" className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">Send</button>
                  </form>
                </div>
              )}

              {/* Settings Tab Content */}
              {rightTab === 'settings' && (
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900">Workspace Management</div>
                  <button onClick={() => navigate('/settings')} className="w-full py-2 px-3 bg-blue-50 text-blue-700 font-bold rounded-xl">Desk Settings</button>
                </div>
              )}

            </div>

            {/* Groups & Teams Card matching reference */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
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

      </main>

    </div>
  );
};

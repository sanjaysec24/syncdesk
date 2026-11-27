import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { BottomNav } from '../components/common/BottomNav';
import {
  Users,
  ArrowRight,
  Sparkles,
  Bell,
  Calendar,
  Layers,
  MapPin,
  Building2,
  ChevronDown,
  LogOut,
  UserCheck,
  Settings as SettingsIcon,
  Search,
  CheckCircle2
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const { currentUser, groups, notifications, switchRole } = useApp();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter desks joined by the current student (or all groups if student is member)
  const studentDesks = groups.filter(g => g.members.includes(currentUser.id) || g.leaderId === currentUser.id);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleEnterDesk = (deskId: string) => {
    navigate(`/desk/${deskId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between pb-24 md:pb-12 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Institutional Logos */}
          <div className="overflow-x-auto py-2">
            <InstitutionalLogos compact />
          </div>

          {/* Right Actions: Notifications & Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/70 text-slate-600 transition-colors border border-slate-200/60 cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="font-extrabold text-slate-900 text-sm">Notifications</h4>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.linkTo) navigate(n.linkTo);
                          setShowNotifications(false);
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                          n.read ? 'bg-white border-slate-100 text-slate-600' : 'bg-blue-50/40 border-blue-200 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-blue-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      navigate('/notifications');
                      setShowNotifications(false);
                    }}
                    className="w-full mt-3 py-2.5 text-center text-xs font-extrabold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors cursor-pointer"
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>

            {/* Profile Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 transition-colors cursor-pointer"
              >
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-extrabold text-slate-900 line-clamp-1">{currentUser.name}</div>
                  <div className="text-[10px] font-bold text-blue-600 capitalize">{currentUser.role}</div>
                </div>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-xs"
                />
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-slate-200 p-3 z-50">
                  <div className="p-3.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-2 border border-blue-100">
                    <div className="font-extrabold text-slate-900 text-sm">{currentUser.name}</div>
                    <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> {currentUser.year || currentUser.role}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        navigate('/profile/complete');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-blue-500" /> Complete / Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/student/timetable');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-purple-500" /> View / Update Timetable
                    </button>
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <SettingsIcon className="w-4 h-4 text-slate-500" /> Workspace Settings
                    </button>
                  </div>

                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <button
                      onClick={() => {
                        navigate('/welcome');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" /> Log Out / Switch Mode
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-lg shadow-blue-950/5 border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-100">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Saveetha Engineering College • AICTE Idea Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101B45] tracking-tight">
              {getGreeting()}, {currentUser.name} 👋
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              Welcome back. Which desk are you heading to today?
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/join-desk')}
              className="px-5 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" /> Explore Available Desks
            </button>
            <button
              onClick={() => navigate('/student/timetable')}
              className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-600" /> My Timetable
            </button>
          </div>
        </div>

        {/* Section Header: Your Desks */}
        <div className="space-y-1 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-[#101B45] tracking-tight">Your Desks</h3>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-extrabold text-xs">
              {studentDesks.length} {studentDesks.length === 1 ? 'Workspace' : 'Workspaces'} Joined
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Your campus workspaces, all in one place. Select a desk to enter.
          </p>
        </div>

        {/* Desks Grid or Empty State */}
        {studentDesks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentDesks.map(desk => (
              <div
                key={desk.id}
                onClick={() => handleEnterDesk(desk.id)}
                className="bg-white rounded-[24px] p-6 shadow-md hover:shadow-xl hover:shadow-blue-950/10 border border-slate-100 hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                      <img
                        src={desk.avatar}
                        alt={desk.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[11px] border border-emerald-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active Member
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">{desk.category}</span>
                    <h4 className="text-lg font-black text-[#101B45] tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                      {desk.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {desk.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-bold text-slate-700">
                    <Users className="w-4 h-4 text-blue-600" /> {desk.membersCount || desk.members.length} Members
                  </span>
                  <div className="flex items-center gap-1.5 font-extrabold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Enter Desk</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-[24px] p-12 text-center shadow-lg border border-slate-100 max-w-xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Layers className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-[#101B45]">No desks yet</h4>
              <p className="text-sm text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                You haven't joined a workspace yet. Explore available desks and find your campus community.
              </p>
            </div>
            <button
              onClick={() => navigate('/join-desk')}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" /> Explore Available Desks
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center text-xs text-slate-500 py-6 mt-auto">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

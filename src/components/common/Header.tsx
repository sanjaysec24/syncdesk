import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Users,
  Layers,
  MessageSquare,
  ShieldAlert,
  Bell,
  Settings as SettingsIcon,
  Activity,
  UserCheck,
  ChevronDown,
  Sparkles,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, switchRole, notifications } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: 'Workspace', path: '/workspace', icon: Layers },
    { label: 'Members', path: '/members', icon: Users },
    { label: 'Groups & Teams', path: '/groups', icon: Layers },
    { label: 'Timetable', path: '/timetable/manage', icon: Calendar },
    { label: 'Common Chat', path: '/chat', icon: MessageSquare },
    ...(currentUser.role === 'admin' ? [{ label: 'Admin Dashboard', path: '/admin/dashboard', icon: ShieldAlert }] : []),
    { label: 'Activity Logs', path: '/activity', icon: Activity },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Demo Role Switcher Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/40 text-indigo-200 font-bold uppercase tracking-wider text-[10px] border border-indigo-400/30">
              Demo Mode
            </span>
            <span className="text-indigo-100 font-medium">Saveetha Engineering College & AICTE Idea Lab Sync Desk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-indigo-200">Switch Role:</span>
            <div className="inline-flex rounded-lg bg-indigo-950/60 p-0.5 border border-indigo-700/50">
              <button
                onClick={() => switchRole('admin')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  currentUser.role === 'admin' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-300 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => switchRole('faculty')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  currentUser.role === 'faculty' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-300 hover:text-white'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => switchRole('student')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  currentUser.role === 'student' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-300 hover:text-white'
                }`}
              >
                Student
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Horizontal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
            S
          </div>
          <div className="cursor-pointer" onClick={() => navigate('/workspace')}>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
              Sync Desk
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </h1>
            <p className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide">AICTE Idea Lab & SEC</p>
          </div>
        </div>

        {/* Desktop Horizontal Contextual Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/70 text-slate-600 transition-colors border border-slate-200/60"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
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
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        n.read ? 'bg-white border-slate-100 text-slate-600' : 'bg-indigo-50/40 border-indigo-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    navigate('/notifications');
                    setShowNotifications(false);
                  }}
                  className="w-full mt-3 py-2 text-center text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
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
              className="flex items-center gap-2 p-1.5 pl-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 transition-colors"
            >
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{currentUser.name}</div>
                <div className="text-[10px] font-semibold text-indigo-600 capitalize">{currentUser.role}</div>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-xs"
              />
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50">
                <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-2">
                  <div className="font-bold text-slate-900 text-sm">{currentUser.name}</div>
                  <div className="text-xs text-slate-500">{currentUser.email}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> {currentUser.role}
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      navigate('/profile/complete');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-indigo-500" /> Complete / Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/timetable/submit');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-purple-500" /> Submit / Update Timetable
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <SettingsIcon className="w-4 h-4 text-slate-500" /> Desk Settings
                  </button>
                </div>

                <div className="border-t border-slate-100 mt-2 pt-2">
                  <button
                    onClick={() => {
                      navigate('/welcome');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" /> Log Out / Switch Mode
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

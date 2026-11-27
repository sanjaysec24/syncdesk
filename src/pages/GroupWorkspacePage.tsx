import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { BottomNav } from '../components/common/BottomNav';
import {
  Layers,
  Users,
  MapPin,
  Clock,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Send,
  Shield,
  Settings,
  Plus,
  CheckCircle2,
  Bell
} from 'lucide-react';

export const GroupWorkspacePage: React.FC = () => {
  const { deskId, groupId } = useParams<{ deskId: string; groupId: string }>();
  const { groups, currentUser, users, chatMessages, sendChatMessage } = useApp();
  const navigate = useNavigate();

  const group = groups.find(g => g.id === groupId) || groups[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'discussion' | 'projects' | 'settings'>('overview');
  const [msgInput, setMsgInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    sendChatMessage(msgInput, groupId || 'general');
    setMsgInput('');
  };

  const groupMembers = users.filter(u => group.members.includes(u.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between pb-24 md:pb-12 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <BackgroundWaves />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <InstitutionalLogos compact />
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs border border-blue-100 uppercase">
              {currentUser.role}
            </span>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-xs"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
        
        {/* Breadcrumb & Back Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(deskId ? `/desk/${deskId}` : '/groups')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {deskId ? 'Desk Workspace' : 'Groups Directory'}
          </button>
        </div>

        {/* Group Hero Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-xl shadow-blue-950/5 border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={group.avatar}
              alt={group.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white shadow-lg shrink-0"
            />
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs uppercase tracking-wider border border-blue-100">
                {group.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#101B45] tracking-tight">
                {group.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {group.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{groupMembers.length} Members</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>{group.room}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 max-w-lg shadow-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Members
          </button>
          <button
            onClick={() => setActiveTab('discussion')}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'discussion' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Team Discussion
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'projects' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Shared Projects
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 cols: Details & Announcements */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-lg border border-slate-100 space-y-4">
                <h3 className="text-lg font-black text-[#101B45]">Group Mission & Objectives</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {group.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Regular Meet Time</span>
                      <p className="text-xs font-extrabold text-slate-900">{group.meetingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Workspace Room</span>
                      <p className="text-xs font-extrabold text-slate-900">{group.room}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-lg border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-[#101B45]">Announcements</h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Active Squad
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>Weekly Milestone Check-in</span>
                    <span className="text-[10px] text-slate-400">Today, 10:00 AM</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Please upload your weekly prototype code and sensor logs before Wednesday evening review.
                  </p>
                </div>
              </div>
            </div>

            {/* Right col: Members List */}
            <div className="bg-white rounded-[24px] p-6 shadow-lg border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#101B45]">Team Members ({groupMembers.length})</h3>
                <span className="text-xs font-bold text-blue-600">Active</span>
              </div>

              <div className="space-y-3">
                {groupMembers.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover shadow-xs" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs">{m.name}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">{m.department.split(' ')[0]} • {m.role}</p>
                      </div>
                    </div>
                    {m.id === group.leaderId && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold border border-amber-200">
                        Leader
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussion' && (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-lg border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-[#101B45]">Team Discussion & Chat</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-100">
              {chatMessages.filter(m => m.channelId === groupId || m.channelId === 'general').map(m => (
                <div key={m.id} className="p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-blue-900">{m.senderName}</span>
                    <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700">{m.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                placeholder="Type team message..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-lg border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#101B45]">Shared Projects & Files</h3>
              <button className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">
                + Upload Project File
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-extrabold text-xs text-slate-900">
                  <span>Smart Campus IoT Gateway Spec.pdf</span>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">PDF</span>
                </div>
                <p className="text-xs text-slate-500">Uploaded by Dr. R. Rajesh Kumar • 2.4 MB</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-extrabold text-xs text-slate-900">
                  <span>Prototype Wiring Diagram v2.png</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Image</span>
                </div>
                <p className="text-xs text-slate-500">Uploaded by Sanjay Kumar S • 1.8 MB</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-lg border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-[#101B45]">Group Settings & Permissions</h3>
            <div className="space-y-4 text-xs text-slate-600 max-w-lg">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="font-extrabold text-slate-900">Allow Member Invites</div>
                  <div className="text-slate-500">Let any member invite peers to this group</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="font-extrabold text-slate-900">Public Group Visibility</div>
                  <div className="text-slate-500">Visible to all desk members</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">Public</span>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="max-w-6xl w-full mx-auto text-center text-xs text-slate-500 py-6 mt-auto">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>

      <BottomNav />
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Layers, Users, MapPin, Clock, Plus, Sparkles, ArrowRight, X, ArrowLeft, Search, Award, Star, Code, Calendar, CheckCircle2 } from 'lucide-react';
import { GroupTeam } from '../types';

export const GroupsPage: React.FC = () => {
  const { deskId } = useParams<{ deskId: string }>();
  const { groups, addGroup, currentUser, users } = useApp();
  const navigate = useNavigate();

  const currentDesk = groups[0]; // Or matching desk

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GroupTeam['category']>('AICTE Idea Lab');
  const [room, setRoom] = useState('Idea Lab Pod 1');
  const [meetingTime, setMeetingTime] = useState('Wednesdays 03:00 PM');

  const totalGroupsCount = groups.length;
  const totalGroupMembers = groups.reduce((acc, g) => acc + (g.membersCount || g.members.length), 0);
  const activeGroupsCount = groups.length;
  const projectTeamsCount = groups.filter(g => g.category === 'Capstone Project' || g.category === 'AICTE Idea Lab').length;

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || g.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newGroup: GroupTeam = {
      id: `g-${Date.now()}`,
      name,
      description,
      category,
      leaderId: currentUser.id,
      membersCount: 1,
      meetingTime,
      room,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
      members: [currentUser.id]
    };

    addGroup(newGroup);
    setName('');
    setDescription('');
    setShowCreateModal(false);
  };

  const handleOpenGroup = (groupId: string) => {
    if (deskId) {
      navigate(`/desks/${deskId}/groups/${groupId}`);
    } else {
      navigate(`/groups/${groupId}`);
    }
  };

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
              <span className="text-blue-600">IDEA Lab Desk</span>
              <span>/</span>
              <span className="text-slate-800">Groups & Teams</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101B43] tracking-tight">Groups & Teams Directory</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Explore communities, project teams and collaborative groups.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(deskId ? `/desk/${deskId}` : '/workspace')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs border border-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Desk Workspace
            </button>

            {(currentUser.role === 'student' || currentUser.role === 'faculty' || currentUser.role === 'admin') && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create Group
              </button>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Total Groups</span>
              <h3 className="text-3xl font-black text-slate-900">{totalGroupsCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Group Members</span>
              <h3 className="text-3xl font-black text-slate-900">{totalGroupMembers}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Active Groups</span>
              <h3 className="text-3xl font-black text-emerald-600">{activeGroupsCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Project Teams</span>
              <h3 className="text-3xl font-black text-slate-900">{projectTeamsCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Code className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xs border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search groups by name or description..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-xs font-extrabold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="AICTE Idea Lab">AICTE Idea Lab</option>
              <option value="Capstone Project">Capstone Project</option>
              <option value="Department Club">Department Club</option>
              <option value="Research Cell">Research Cell</option>
              <option value="Hackathon">Hackathon</option>
            </select>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredGroups.map(group => {
            const leader = users.find(u => u.id === group.leaderId) || users[0];
            return (
              <div
                key={group.id}
                onClick={() => handleOpenGroup(group.id)}
                className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between gap-6 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold uppercase tracking-wider text-[10px] border border-blue-100">
                          {group.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors">{group.name}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">{group.description}</p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{group.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                      <span className="truncate">{group.room}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{group.membersCount || group.members.length} Members Active</span>
                  </div>

                  <span className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs transition-colors flex items-center gap-1.5">
                    <span>Open Group</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-[28px] shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900">Create New Team / Squad</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Team Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. AI Autonomous Drone Squad"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as GroupTeam['category'])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="AICTE Idea Lab">AICTE Idea Lab</option>
                    <option value="Capstone Project">Capstone Project</option>
                    <option value="Department Club">Department Club</option>
                    <option value="Research Cell">Research Cell</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Meeting Time</label>
                    <input
                      type="text"
                      value={meetingTime}
                      onChange={e => setMeetingTime(e.target.value)}
                      placeholder="e.g. Thursdays 02:00 PM"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-semibold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Room / Lab</label>
                    <input
                      type="text"
                      value={room}
                      onChange={e => setRoom(e.target.value)}
                      placeholder="e.g. Idea Lab Pod 2"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the objective and activities of this team..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-semibold text-slate-900"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-extrabold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

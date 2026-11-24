import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Layers, Users, MapPin, Clock, Plus, Sparkles, ArrowRight, X } from 'lucide-react';
import { GroupTeam } from '../types';

export const GroupsPage: React.FC = () => {
  const { groups, addGroup, currentUser } = useApp();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GroupTeam['category']>('AICTE Idea Lab');
  const [room, setRoom] = useState('Idea Lab Pod 1');
  const [meetingTime, setMeetingTime] = useState('Wednesdays 03:00 PM');

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

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 font-bold uppercase tracking-wider text-[10px]">
                AICTE Idea Lab & Campus Squads
              </span>
              <span className="text-xs text-slate-400">Saveetha Engineering College</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Groups & Project Teams</h2>
            <p className="text-xs sm:text-sm text-slate-500">Collaborate with maker teams, research cells, and hackathon clubs.</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Team
          </button>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {groups.map(group => (
            <div
              key={group.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 hover:border-purple-300 transition-all flex flex-col justify-between gap-6 group"
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
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold uppercase tracking-wider text-[10px]">
                        {group.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{group.name}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{group.description}</p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="truncate">{group.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
                    <span className="truncate">{group.room}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>{group.membersCount} Members Active</span>
                </div>

                <button
                  onClick={() => navigate('/chat')}
                  className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Team Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900">Create New Team / Squad</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Team Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. AI Autonomous Drone Squad"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as GroupTeam['category'])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Meeting Time</label>
                    <input
                      type="text"
                      value={meetingTime}
                      onChange={e => setMeetingTime(e.target.value)}
                      placeholder="e.g. Thursdays 02:00 PM"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Room / Lab</label>
                    <input
                      type="text"
                      value={room}
                      onChange={e => setRoom(e.target.value)}
                      placeholder="e.g. Idea Lab Pod 2"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the objective and activities of this team..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-900"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25"
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

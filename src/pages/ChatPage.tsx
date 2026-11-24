import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { MessageSquare, Send, Sparkles, Hash, Users, ShieldAlert } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { chatMessages, sendChatMessage, currentUser, activeChannel, setActiveChannel } = useApp();
  const [inputText, setInputText] = useState('');

  const channels = [
    { id: 'general', name: 'general-campus', description: 'General announcements and discussions' },
    { id: 'idea-lab', name: 'aicte-idea-lab', description: 'Hardware makers, 3D printing & IoT projects' },
    { id: 'cse-3rd', name: 'cse-3rd-year', description: 'CSE Section A & B timetable sync' }
  ];

  const filteredMessages = chatMessages.filter(m => m.channelId === activeChannel || (!m.channelId && activeChannel === 'general'));

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText, activeChannel);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12 flex flex-col">
      <Header />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex-1 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
          {/* Sidebar Channels */}
          <div className="w-full md:w-80 bg-slate-50/80 border-r border-slate-200/80 p-4 sm:p-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                  Real-Time Sync
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">Campus Channels</h2>
              <p className="text-xs text-slate-500">Collaborate with peers instantly.</p>
            </div>

            <div className="space-y-2 flex-1">
              {channels.map(ch => {
                const isActive = activeChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex flex-col gap-1 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Hash className={`w-4 h-4 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                      <span>{ch.name}</span>
                    </div>
                    <p className={`text-xs line-clamp-1 ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {ch.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Active User
              </div>
              <p className="text-slate-600 truncate">Logged in as <span className="font-bold text-indigo-700">{currentUser.name}</span></p>
            </div>
          </div>

          {/* Chat Main Window */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">#{activeChannel}-campus</h3>
                  <p className="text-xs text-slate-500">Saveetha Engineering College & AICTE Idea Lab</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Connected</span>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[480px]">
              {filteredMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className={`space-y-1 max-w-md ${isMe ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-2 text-xs ${isMe ? 'justify-end' : ''}`}>
                        <span className="font-bold text-slate-900">{msg.senderName}</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[10px] font-bold text-indigo-600 uppercase">
                          {msg.senderRole}
                        </span>
                        <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                      </div>
                      <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-indigo-600 text-white rounded-tr-xs shadow-md shadow-indigo-500/20'
                          : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 sm:p-6 border-t border-slate-100 flex items-center gap-3 bg-white">
              <input
                type="text"
                placeholder={`Message #${activeChannel}...`}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

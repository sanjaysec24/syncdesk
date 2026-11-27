import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { Check, Hash, Link as LinkIcon, Search, Users, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

export const JoinDeskPage: React.FC = () => {
  const { groups, currentUser, updateUserProfile } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'code' | 'link'>('code');
  const [inviteInput, setInviteInput] = useState('');
  const [searchedDesk, setSearchedDesk] = useState<any>(groups[0] || null);
  const [hasSearched, setHasSearched] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteInput.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasSearched(true);
      const found = groups.find(g => g.name.toLowerCase().includes(inviteInput.toLowerCase()) || g.id.toLowerCase().includes(inviteInput.toLowerCase()));
      setSearchedDesk(found || groups[0]);
    }, 500);
  };

  const handleJoinDesk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      updateUserProfile({
        deskJoined: true
      });

      setTimeout(() => {
        if (currentUser.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }, 800);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header with Institutional Logos */}
      <header className="max-w-[1120px] w-full mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-3.5 flex items-center justify-between">
        <InstitutionalLogos compact />
      </header>

      {/* Main Centered Join Desk Card */}
      <main className="max-w-[900px] w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-[24px] shadow-xl shadow-indigo-950/10 border border-slate-100 p-8 sm:p-10 space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[11px] uppercase tracking-wider border border-blue-100">
              STEP 4 OF 4 — JOIN A DESK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#101B45] tracking-tight">
              Join a Desk
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Be part of a workspace, collaborate on ideas, projects and more.
            </p>
          </div>

          {/* Invitation Selection Tabs */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-blue-50/60 border-blue-500 shadow-xs text-blue-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === 'code' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Hash className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm">Enter Invite Code</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                activeTab === 'link'
                  ? 'bg-blue-50/60 border-blue-500 shadow-xs text-blue-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === 'link' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <LinkIcon className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm">Join with Invite Link</span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Hash className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={inviteInput}
                onChange={e => setInviteInput(e.target.value)}
                placeholder="Enter desk invite code (e.g., IDEALAB26)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-[#1769FF] hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Find Desk</span>
            </button>
          </form>

          {/* Desk Preview Card */}
          {searchedDesk && hasSearched && (
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 max-w-lg mx-auto w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold shadow-xs">
                    <Lightbulb className="w-7 h-7 text-orange-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-base">AICTE IDEA Lab – SEC</h3>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> Admin: IDEA Lab Core Team
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 w-fit">
                  Public Desk
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Official workspace for the AICTE IDEA Lab at Saveetha Engineering College. Collaborate, build and turn ideas into real solutions.
              </p>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <span className="flex items-center gap-1.5 font-bold text-slate-700">
                  <Users className="w-4 h-4 text-blue-600" /> 70 Members
                </span>
                <span className="font-semibold text-slate-600">
                  Projects • Events • Workshops
                </span>
              </div>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-2 max-w-lg mx-auto">
              <Check className="w-4 h-4 text-emerald-600" /> Successfully joined workspace! Redirecting to Dashboard...
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 max-w-lg mx-auto w-full">
            <button
              type="button"
              onClick={() => navigate('/timetable/submit')}
              className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleJoinDesk}
              disabled={loading || !searchedDesk}
              className="flex-1 max-w-xs py-4 rounded-2xl bg-gradient-to-r from-[#1769FF] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Join Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1120px] w-full mx-auto text-center text-xs text-slate-500 py-4 mt-auto">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>
    </div>
  );
};

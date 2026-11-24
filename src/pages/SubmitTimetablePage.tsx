import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { TimetableIllustration } from '../components/welcome/TimetableIllustration';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { Check, Info, Plus, ArrowLeft, Send, Calendar } from 'lucide-react';
import { DayOfWeek } from '../types';

export const SubmitTimetablePage: React.FC = () => {
  const { timetable, updateTimetable } = useApp();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedSlot, setSelectedSlot] = useState<string>('Slot 1 (8:00 - 9:30)');
  const [subCode, setSubCode] = useState('');
  const [subName, setSubName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Local state for interactive preview preview grid matching reference
  const [customEntries, setCustomEntries] = useState<Record<string, { code: string; name: string }>>({
    'Monday-Slot 1': { code: '19AI301', name: 'Machine Learning' },
    'Monday-Slot 2': { code: '19AI303', name: 'Data Structures' },
    'Monday-Slot 4': { code: '19AI305', name: 'DBMS' },
    'Tuesday-Slot 2': { code: '19AI403', name: 'Data Analytics' },
    'Tuesday-Slot 3': { code: '19AI410', name: 'AI Lab' }
  });

  const slots = [
    'Slot 1 (8:00 - 9:30)',
    'Slot 2 (9:45 - 11:15)',
    'Slot 3 (1:15 - 2:45)',
    'Slot 4 (3:00 - 4:30)'
  ];

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subCode.trim() || !subName.trim()) {
      setError('Please provide Subject Code and Subject Name.');
      return;
    }
    setError('');
    const key = `${selectedDay}-${selectedSlot.split(' ')[0]} ${selectedSlot.split(' ')[1]}`;
    setCustomEntries({
      ...customEntries,
      [key]: { code: subCode, name: subName }
    });
    setSubCode('');
    setSubName('');
    setFaculty('');
  };

  const handleSubmitTimetable = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/workspace');
      }, 1000);
    }, 800);
  };

  const filledCount = Object.keys(customEntries).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header with Institutional Logos */}
      <header className="max-w-7xl w-full mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-4 flex items-center justify-between">
        <InstitutionalLogos />
      </header>

      {/* Main Submit Timetable Card matching reference image_3b35a697.png */}
      <main className="max-w-6xl w-full mx-auto my-auto py-8">
        <div className="bg-white/95 backdrop-blur-md rounded-[40px] shadow-2xl shadow-indigo-900/10 border border-white/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Onboarding Progress & Illustration (32% width approx) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white p-6 sm:p-8 border-r border-slate-100 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Step 1: Completed */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Create Account</span>
                </div>

                {/* Step 2: Completed */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Profile Setup</span>
                </div>

                {/* Step 3: Completed */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Join a Desk</span>
                </div>

                {/* Step 4: Active */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/80 border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    4
                  </div>
                  <span className="text-sm font-extrabold text-blue-900">Submit Timetable</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <TimetableIllustration />
            </div>
          </div>

          {/* Right Column: Timetable Form & Preview (68% width approx) */}
          <div className="lg:col-span-8 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[11px] uppercase tracking-wider border border-blue-100">
                  STEP 4 OF 4
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#101B45] tracking-tight">
                  Submit Your Timetable
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Add your current class timetable so we can show your free time to others.
                </p>
              </div>

              {/* Info Banner */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-blue-900 flex items-center gap-3 text-xs sm:text-sm font-medium">
                <Info className="w-5 h-5 text-[#1769FF] shrink-0" />
                <span>Once submitted, your timetable will be saved and can be changed only with admin approval.</span>
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                  {error}
                </div>
              )}

              {/* Timetable Entry Form Bar matching reference */}
              <form onSubmit={handleAddEntry} className="bg-slate-50/80 p-4 rounded-3xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Day</label>
                  <select
                    value={selectedDay}
                    onChange={e => setSelectedDay(e.target.value as DayOfWeek)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 mt-1 cursor-pointer"
                  >
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Slot</label>
                  <select
                    value={selectedSlot}
                    onChange={e => setSelectedSlot(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 mt-1 cursor-pointer"
                  >
                    {slots.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Sub Code</label>
                  <input
                    type="text"
                    value={subCode}
                    onChange={e => setSubCode(e.target.value)}
                    placeholder="19AI301"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 mt-1"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Sub Name</label>
                  <input
                    type="text"
                    value={subName}
                    onChange={e => setSubName(e.target.value)}
                    placeholder="Machine Learning"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 mt-1"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#1769FF] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Timetable Preview Table matching reference */}
              <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
                <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#1769FF]" /> Your Timetable (Preview)
                  </span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    {filledCount} / 24 Slots Added
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100 font-bold text-slate-500">
                        <th className="p-3 border-r border-slate-100">Day</th>
                        <th className="p-3 border-r border-slate-100">Slot 1<br/><span className="text-[10px] font-normal text-slate-400">8:00 - 9:30</span></th>
                        <th className="p-3 border-r border-slate-100">Slot 2<br/><span className="text-[10px] font-normal text-slate-400">9:45 - 11:15</span></th>
                        <th className="p-3 border-r border-slate-100">Slot 3<br/><span className="text-[10px] font-normal text-slate-400">1:15 - 2:45</span></th>
                        <th className="p-3">Slot 4<br/><span className="text-[10px] font-normal text-slate-400">3:00 - 4:30</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, index) => {
                        const fullDayName = days[index];
                        return (
                          <tr key={d} className="hover:bg-slate-50/40">
                            <td className="p-3 font-bold text-slate-900 bg-slate-50/40 border-r border-slate-100">{d}</td>
                            {[1, 2, 3, 4].map(slotNum => {
                              const cellKey = `${fullDayName}-Slot ${slotNum}`;
                              const entry = customEntries[cellKey];
                              const isMl = entry?.code === '19AI301';
                              const isDs = entry?.code === '19AI303';
                              const isDbms = entry?.code === '19AI305';
                              const isDa = entry?.code === '19AI403';
                              const isAiLab = entry?.code === '19AI410';

                              return (
                                <td key={slotNum} className="p-2 border-r border-slate-100 last:border-r-0">
                                  {entry ? (
                                    <div className={`p-2 rounded-xl text-xs font-bold shadow-2xs ${
                                      isMl ? 'bg-blue-50 text-blue-900 border border-blue-100' :
                                      isDs ? 'bg-purple-50 text-purple-900 border border-purple-100' :
                                      isDbms ? 'bg-amber-50 text-amber-900 border border-amber-100' :
                                      isDa ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' :
                                      isAiLab ? 'bg-rose-50 text-rose-900 border border-rose-100' :
                                      'bg-indigo-50 text-indigo-900 border border-indigo-100'
                                    }`}>
                                      <div>{entry.code}</div>
                                      <div className="text-[10px] font-medium opacity-80 truncate">{entry.name}</div>
                                    </div>
                                  ) : (
                                    <span className="text-slate-300">—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {success && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Timetable successfully submitted and locked for student edits! Redirecting to Workspace...
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate('/join-desk')}
                className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitTimetable}
                disabled={loading}
                className="flex-1 max-w-sm py-4 rounded-2xl bg-gradient-to-r from-[#1769FF] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Submit Timetable</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-slate-500 py-4">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>
    </div>
  );
};
